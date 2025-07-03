const User = require('../models/User');
const Order = require('../models/Order');

// Get logged-in user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Get leads (users with no orders)
exports.getLeads = async (req, res) => {
  try {
    const allUsers = await User.find();
    const usersWithOrders = await Order.distinct('userId');
    const leads = allUsers.filter(user => !usersWithOrders.includes(user._id.toString()));
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
