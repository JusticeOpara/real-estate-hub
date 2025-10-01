const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const {
  getAllUsers,
  deleteUser,
  getAllPropertiesAdmin,
  updatePropertyStatus,
  getStats
} = require('../controllers/admin.controller');

router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/properties', getAllPropertiesAdmin);
router.put('/properties/:id/status', updatePropertyStatus);
router.get('/stats', getStats);

module.exports = router;