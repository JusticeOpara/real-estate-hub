const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  addFavorite,
  removeFavorite,
  getFavorites
} = require('../controllers/favorite.controller');

router.route('/')
  .get(protect, getFavorites)
  .post(protect, addFavorite);

router.delete('/:propertyId', protect, removeFavorite);

module.exports = router;