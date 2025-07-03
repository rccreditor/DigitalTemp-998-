const express = require('express');
const router = express.Router();

// Temporary test route
router.get('/test', (req, res) => {
  res.send('Service route working!');
});

module.exports = router;
