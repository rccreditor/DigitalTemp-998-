const User = require('../models/User');

router.post('/purchase', async (req, res) => {
  const { userId, service } = req.body; // service contains name, description, price, etc.

  try {
    const user = await User.findById(userId);
    user.purchasedServices.push(service);
    await user.save();

    res.status(200).json({ message: 'Service purchased and saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving purchase', error });
  }
});
