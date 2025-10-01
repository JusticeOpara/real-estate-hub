
const Favorite = require('../models/favorite.model');
const Property = require('../models/property.model');

exports.addFavorite = async (req, res, next) => {
  try {
    const { propertyId } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    const existingFavorite = await Favorite.findOne({
      user: req.user.id,
      property: propertyId
    });

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: 'Property already in favorites'
      });
    }

    const favorite = await Favorite.create({
      user: req.user.id,
      property: propertyId
    });

    res.status(201).json({
      success: true,
      message: 'Property added to favorites',
      data: { favorite }
    });
  } catch (error) {
    next(error);
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      user: req.user.id,
      property: req.params.propertyId
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Property removed from favorites'
    });
  } catch (error) {
    next(error);
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id })
      .populate({
        path: 'property',
        populate: { path: 'owner', select: 'name email phone' }
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: favorites.length,
      data: { favorites }
    });
  } catch (error) {
    next(error);
  }
};
