
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const { validate, propertyValidation } = require('../middleware/vaildation.middleware');
const {
  createProperty,
  getAllProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getMyProperties
} = require('../controllers/property.controller');

router.route('/')
  .get(getAllProperties)
  .post(protect, authorize('seller', 'admin'), propertyValidation, validate, createProperty);

router.get('/my-properties', protect, authorize('seller', 'admin'), getMyProperties);

router.route('/:id')
  .get(getProperty)
  .put(protect, authorize('seller', 'admin'), updateProperty)
  .delete(protect, authorize('seller', 'admin'), deleteProperty);

module.exports = router;