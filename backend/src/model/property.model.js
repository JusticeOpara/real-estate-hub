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
