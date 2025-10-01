const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { validate, registerValidation, loginValidation } = require('../middleware/vaildation.middleware');
const {
  register,
  login,
  getMe,
  updateProfile
} = require('../controllers/auth.controller');

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;