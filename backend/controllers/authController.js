// controllers/authController.js

exports.googleLoginSuccess = (req, res) => {
    if (req.user) {
      // Redirect to frontend with user info (can also issue JWT here if needed)
      res.redirect(`${process.env.CLIENT_URL}/dashboard.html`);
    } else {
      res.status(401).json({ message: "Google authentication failed" });
    }
  };
  
  exports.linkedinLoginSuccess = (req, res) => {
    if (req.user) {
      res.redirect(`${process.env.CLIENT_URL}/dashboard.html`);
    } else {
      res.status(401).json({ message: "LinkedIn authentication failed" });
    }
  };
  
  exports.logout = (req, res) => {
    req.logout(() => {
      res.redirect(`${process.env.CLIENT_URL}/`);
    });
  };
  