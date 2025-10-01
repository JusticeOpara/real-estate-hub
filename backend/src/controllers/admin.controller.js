const User = require('../models/user.model');
const Property = require('../models/property.model');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: { users }
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllPropertiesAdmin = async (req, res, next) => {
  try {
    const properties = await Property.find()
      .populate('owner', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: properties.length,
      data: { properties }
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePropertyStatus = async (req, res, next) => {
  try {
    const { status, featured } = req.body;

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { status, featured },
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Property status updated',
      data: { property }
    });
  } catch (error) {
    next(error);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProperties = await Property.countDocuments();
    const activeListings = await Property.countDocuments({ status: 'available' });
    const totalSellers = await User.countDocuments({ role: 'seller' });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalProperties,
        activeListings,
        totalSellers
      }
    });
  } catch (error) {
    next(error);
  }
};
