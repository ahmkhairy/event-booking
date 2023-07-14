const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const ifEmail = await User.findOne({ email: req.body.email });
    if (ifEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }
    if (req.body.password != user.password) {
      return res.status(400).json({ message: 'Password is wrong' });
    }
    res.json({ message: 'User signed in successfully', user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
