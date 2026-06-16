const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Add/Remove Favorite
router.post('/toggle', verifyToken, async (req, res) => {
  try {
    const { movieId, title, poster_path } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const favIndex = user.favorites.findIndex(f => f.movieId === movieId);

    if (favIndex !== -1) {
      user.favorites.splice(favIndex, 1);
    } else {
      user.favorites.push({ movieId, title, poster_path });
    }

    await user.save();
    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's favorites
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ favorites: user ? user.favorites : [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;