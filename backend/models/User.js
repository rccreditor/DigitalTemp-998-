const mongoose = require('mongoose');

// Embedded purchased service schema (MVP version)
const PurchasedServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  isSubscription: { type: Boolean, default: false },
  subscriptionEnd: Date,
  purchasedAt: { type: Date, default: Date.now }
});

// Main User Schema
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String, // Only for email/password signup
  googleId: String,
  linkedinId: String,
  avatar: String,
  authProvider: {
    type: String,
    enum: ['google', 'linkedin', 'email'],
    required: true
  },
  purchasedServices: [PurchasedServiceSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
