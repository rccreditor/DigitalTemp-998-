const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('./models/User');

// 🟢 Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://digitaltemp-998.onrender.com/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId: profile.id });

    if (!user) {
      user = await User.create({
        fullName: profile.displayName,
        email: profile.emails[0].value,
        providerId: profile.id,
        authProvider: 'google',
        avatar: profile.photos[0]?.value,
        isAdmin: profile.emails[0].value === 'admin@example.com'
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// 🔵 LinkedIn Strategy
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "https://digitaltemp-998.onrender.com/api/auth/linkedin/callback",
  scope: ['r_liteprofile', 'r_emailaddress']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId: profile.id });

    if (!user) {
      user = await User.create({
        fullName: profile.displayName,
        email: profile.emails[0].value,
        providerId: profile.id,
        authProvider: 'linkedin',
        avatar: profile.photos[0]?.value,
        isAdmin: profile.emails[0].value === 'admin@example.com'
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Required for persistent login (if using sessions)
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});
