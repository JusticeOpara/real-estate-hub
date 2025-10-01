const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  propertyType: {
    type: String,
    required: [true, 'Please specify property type'],
    enum: ['house', 'apartment', 'land', 'commercial', 'villa']
  },
  listingType: {
    type: String,
    required: [true, 'Please specify listing type'],
    enum: ['sale', 'rent']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please provide an address']
    },
    city: {
      type: String,
      required: [true, 'Please provide a city']
    },
    state: {
      type: String,
      required: [true, 'Please provide a state']
    },
    zipCode: {
      type: String,
      trim: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  specifications: {
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
      required: [true, 'Please provide area'],
      min: [0, 'Area cannot be negative']
    },
    areaUnit: {
      type: String,
      enum: ['sqft', 'sqm'],
      default: 'sqft'
    },
    yearBuilt: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear() + 1
    }
  },
  amenities: [{
    type: String,
    trim: true
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String
    }
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'sold', 'rented'],
    default: 'available'
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search optimization
propertySchema.index({ 'location.city': 1, propertyType: 1, price: 1 });
propertySchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Property', propertySchema);
