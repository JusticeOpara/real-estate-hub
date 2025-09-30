// ============================================
// PACKAGE.JSON DEPENDENCIES
// ============================================
/*
{
  "name": "realestatehub-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "express-validator": "^7.0.1",
    "multer": "^1.4.5-lts.1",
    "cloudinary": "^1.41.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
*/

// ============================================
// .ENV FILE CONFIGURATION
// ============================================
/*
PORT=5000
MONGODB_URI=mongodb://localhost:27017/realestatehub
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
*/

// ============================================
// SERVER.JS - MAIN APPLICATION FILE
// ============================================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth.routes');
const propertyRoutes = require('./routes/property.routes');
const userRoutes = require('./routes/user.routes');
const favoriteRoutes = require('./routes/favorite.routes');
const adminRoutes = require('./routes/admin.routes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'RealEstateHub API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ============================================
// MODELS/USER.MODEL.JS
// ============================================
const userSchema = `
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\\S+@\\S+\\.\\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'agent', 'admin'],
    default: 'buyer'
  },
  phone: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
`;

// ============================================
// MODELS/PROPERTY.MODEL.JS
// ============================================
const propertySchema = `
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  propertyType: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['house', 'apartment', 'land', 'commercial', 'condo', 'villa']
  },
  listingType: {
    type: String,
    required: [true, 'Listing type is required'],
    enum: ['sale', 'rent']
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String },
    country: { type: String, default: 'USA' }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  bedrooms: {
    type: Number,
    min: 0
  },
  bathrooms: {
    type: Number,
    min: 0
  },
  area: {
    type: Number,
    required: [true, 'Area is required'],
    min: [0, 'Area cannot be negative']
  },
  areaUnit: {
    type: String,
    enum: ['sqft', 'sqm'],
    default: 'sqft'
  },
  images: [{
    url: String,
    publicId: String
  }],
  amenities: [String],
  yearBuilt: Number,
  status: {
    type: String,
    enum: ['available', 'pending', 'sold', 'rented'],
    default: 'available'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for geospatial queries
propertySchema.index({ location: '2dsphere' });

// Index for search optimization
propertySchema.index({ title: 'text', description: 'text' });
propertySchema.index({ 'address.city': 1, 'address.state': 1 });
propertySchema.index({ price: 1, propertyType: 1, listingType: 1 });

module.exports = mongoose.model('Property', propertySchema);
`;

// ============================================
// MODELS/FAVORITE.MODEL.JS
// ============================================
const favoriteSchema = `
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  }
}, {
  timestamps: true
});

// Compound index to ensure a user can't favorite the same property twice
favoriteSchema.index({ user: 1, property: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
`;

// ============================================
// MIDDLEWARE/AUTH.MIDDLEWARE.JS
// ============================================
const authMiddleware = `
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Protect routes - require authentication
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user || !req.user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists or is inactive'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Authorize specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: \`User role \${req.user.role} is not authorized to access this route\`
      });
    }
    next();
  };
};
`;

// ============================================
// ROUTES/AUTH.ROUTES.JS
// ============================================
const authRoutesCode = `
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

// Validation rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['buyer', 'seller', 'agent']).withMessage('Invalid role')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/me', protect, authController.getMe);
router.put('/update-profile', protect, authController.updateProfile);
router.put('/change-password', protect, authController.changePassword);

module.exports = router;
`;

// ============================================
// CONTROLLERS/AUTH.CONTROLLER.JS
// ============================================
const authController = `
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, role, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'buyer',
      phone
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, avatar },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = exports;
`;

// ============================================
// ROUTES/PROPERTY.ROUTES.JS
// ============================================
const propertyRoutes = `
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);

// Protected routes - require authentication
router.use(protect);

// Seller/Agent routes
router.post('/', authorize('seller', 'agent', 'admin'), propertyController.createProperty);
router.put('/:id', authorize('seller', 'agent', 'admin'), propertyController.updateProperty);
router.delete('/:id', authorize('seller', 'agent', 'admin'), propertyController.deleteProperty);

// Get user's own properties
router.get('/user/my-properties', propertyController.getMyProperties);

module.exports = router;
`;

// ============================================
// CONTROLLERS/PROPERTY.CONTROLLER.JS
// ============================================
const propertyController = `
const Property = require('../models/property.model');

// @desc    Get all properties with filters
// @route   GET /api/properties
// @access  Public
exports.getAllProperties = async (req, res) => {
  try {
    const {
      search,
      propertyType,
      listingType,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      city,
      state,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    // Build query
    const query = { status: 'available' };

    // Search by title or description
    if (search) {
      query.$text = { $search: search };
    }

    // Filters
    if (propertyType) query.propertyType = propertyType;
    if (listingType) query.listingType = listingType;
    if (bedrooms) query.bedrooms = { $gte: parseInt(bedrooms) };
    if (bathrooms) query.bathrooms = { $gte: parseInt(bathrooms) };
    if (city) query['address.city'] = new RegExp(city, 'i');
    if (state) query['address.state'] = new RegExp(state, 'i');

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const properties = await Property.find(query)
      .populate('owner', 'name email phone avatar')
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Property.countDocuments(query);

    res.json({
      success: true,
      data: {
        properties,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get property by ID
// @route   GET /api/properties/:id
// @access  Public
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name email phone avatar role');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Increment view count
    property.views += 1;
    await property.save();

    res.json({
      success: true,
      data: { property }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (Seller/Agent/Admin)
exports.createProperty = async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      owner: req.user.id
    };

    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: { property }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Owner/Admin)
exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property'
      });
    }

    property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Property updated successfully',
      data: { property }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Owner/Admin)
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property'
      });
    }

    await property.deleteOne();

    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current user's properties
// @route   GET /api/properties/user/my-properties
// @access  Private
exports.getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        properties,
        count: properties.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = exports;
`;

// ============================================
// ROUTES/FAVORITE.ROUTES.JS
// ============================================
const favoriteRoutesCode = `
const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const { protect } = require('../middleware/auth.middleware');

// All favorite routes require authentication
router.use(protect);

router.get('/', favoriteController.getFavorites);
router.post('/:propertyId', favoriteController.addFavorite);
router.delete('/:propertyId', favoriteController.removeFavorite);
router.get('/check/:propertyId', favoriteController.checkFavorite);

module.exports = router;
`;

// ============================================
// CONTROLLERS/FAVORITE.CONTROLLER.JS
// ============================================
const favoriteController = `
const Favorite = require('../models/favorite.model');
const Property = require('../models/property.model');

// @desc    Get user's favorite properties
// @route   GET /api/favorites
// @access  Private
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id })
      .populate({
        path: 'property',
        populate: { path: 'owner', select: 'name email phone' }
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        favorites,
        count: favorites.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add property to favorites
// @route   POST /api/favorites/:propertyId
// @access  Private
exports.addFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if already favorited
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

    // Add to favorites
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
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove property from favorites
// @route   DELETE /api/favorites/:propertyId
// @access  Private
exports.removeFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const favorite = await Favorite.findOneAndDelete({
      user: req.user.id,
      property: propertyId
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }

    res.json({
      success: true,
      message: 'Property removed from favorites'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Check if property is favorited
// @route   GET /api/favorites/check/:propertyId
// @access  Private
exports.checkFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const favorite = await Favorite.findOne({
      user: req.user.id,
      property: propertyId
    });

    res.json({
      success: true,
      data: {
        isFavorited: !!favorite
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = exports;
`;

// ============================================
// ROUTES/ADMIN.ROUTES.JS
// ============================================
const adminRoutes = `
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/users', adminController.getAllUsers);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.get('/properties', adminController.getAllPropertiesAdmin);
router.put('/properties/:id/status', adminController.updatePropertyStatus);
router.get('/stats', adminController.getDashboardStats);

module.exports = router;
`;

// ============================================
// CONTROLLERS/ADMIN.CONTROLLER.JS
// ============================================
const adminController = `
const User = require('../models/user.model');
const Property = require('../models/property.model');
const Favorite = require('../models/favorite.model');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, role, isActive } = req.query;

    const query = {};
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  try {
    const { role, isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role, isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete user's properties
    await Property.deleteMany({ owner: req.params.id });

    // Delete user's favorites
    await Favorite.deleteMany({ user: req.params.id });

    await user.deleteOne();

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all properties (admin view)
// @route   GET /api/admin/properties
// @access  Private/Admin
exports.getAllPropertiesAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const query = {};
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const properties = await Property.find(query)
      .populate('owner', 'name email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Property.countDocuments(query);

    res.json({
      success: true,
      data: {
        properties,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update property status
// @route   PUT /api/admin/properties/:id/status
// @access  Private/Admin
exports.updatePropertyStatus = async (req, res) => {
  try {
    const { status, featured } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (featured !== undefined) updateData.featured = featured;

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.json({
      success: true,
      message: 'Property updated successfully',
      data: { property }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    // Count statistics
    const totalUsers = await User.countDocuments();
    const totalProperties = await Property.countDocuments();
    const availableProperties = await Property.countDocuments({ status: 'available' });
    const soldProperties = await Property.countDocuments({ status: 'sold' });
    const rentedProperties = await Property.countDocuments({ status: 'rented' });

    // User role breakdown
    const buyers = await User.countDocuments({ role: 'buyer' });
    const sellers = await User.countDocuments({ role: 'seller' });
    const agents = await User.countDocuments({ role: 'agent' });

    // Property type breakdown
    const propertyTypes = await Property.aggregate([
      {
        $group: {
          _id: '$propertyType',
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent properties
    const recentProperties = await Property.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('owner', 'name email');

    // Recent users
    const recentUsers = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    // Total revenue (sum of sold properties)
    const revenueData = await Property.aggregate([
      { $match: { status: { $in: ['sold', 'rented'] } } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$price' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalProperties,
          availableProperties,
          soldProperties,
          rentedProperties
        },
        userBreakdown: {
          buyers,
          sellers,
          agents
        },
        propertyTypes,
        recentProperties,
        recentUsers,
        totalRevenue: revenueData[0]?.totalRevenue || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = exports;
`;

// ============================================
// ROUTES/USER.ROUTES.JS
// ============================================
const userRoutes = `
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

// Public route
router.get('/:id', userController.getUserById);

// Protected routes
router.use(protect);
router.get('/:id/properties', userController.getUserProperties);

module.exports = router;
`;

// ============================================
// CONTROLLERS/USER.CONTROLLER.JS
// ============================================
const userController = `
const User = require('../models/user.model');
const Property = require('../models/property.model');

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's property count
    const propertyCount = await Property.countDocuments({ 
      owner: req.params.id,
      status: 'available'
    });

    res.json({
      success: true,
      data: {
        user: {
          ...user.toObject(),
          propertyCount
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's properties
// @route   GET /api/users/:id/properties
// @access  Private
exports.getUserProperties = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const properties = await Property.find({ 
      owner: req.params.id,
      status: 'available'
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Property.countDocuments({ 
      owner: req.params.id,
      status: 'available'
    });

    res.json({
      success: true,
      data: {
        properties,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = exports;
`;

console.log('✅ Backend code structure complete!');
console.log('');
console.log('FILE STRUCTURE:');
console.log('📁 realestatehub-backend/');
console.log('  ├── 📄 server.js');
console.log('  ├── 📄 .env');
console.log('  ├── 📄 package.json');
console.log('  ├── 📁 models/');
console.log('  │   ├── 📄 user.model.js');
console.log('  │   ├── 📄 property.model.js');
console.log('  │   └── 📄 favorite.model.js');
console.log('  ├── 📁 controllers/');
console.log('  │   ├── 📄 auth.controller.js');
console.log('  │   ├── 📄 property.controller.js');
console.log('  │   ├── 📄 favorite.controller.js');
console.log('  │   ├── 📄 user.controller.js');
console.log('  │   └── 📄 admin.controller.js');
console.log('  ├── 📁 routes/');
console.log('  │   ├── 📄 auth.routes.js');
console.log('  │   ├── 📄 property.routes.js');
console.log('  │   ├── 📄 favorite.routes.js');
console.log('  │   ├── 📄 user.routes.js');
console.log('  │   └── 📄 admin.routes.js');
console.log('  └── 📁 middleware/');
console.log('      └── 📄 auth.middleware.js');