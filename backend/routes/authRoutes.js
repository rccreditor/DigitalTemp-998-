const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const router = express.Router();
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// --------------------
// Local Signup
// --------------------
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      authProvider: 'local',
      password: hashedPassword,
      providerId: `local-${Date.now()}`
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      user: { fullName: newUser.fullName, email: newUser.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --------------------
// Local Login
// --------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    
    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      user: { fullName: user.fullName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --------------------
// LinkedIn OAuth
// --------------------
router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback',
  passport.authenticate('linkedin', {
    failureRedirect: '/login',
    session: false
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard.html?token=${token}`);
  }
);

// --------------------
// Google OAuth
// --------------------
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard.html?token=${token}`);
  }
);

// --------------------
// Logout
// --------------------
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect(`${process.env.CLIENT_URL}/`);
  });
});

module.exports = router;
