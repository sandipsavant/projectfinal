import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, 'Please provide the car make'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Please provide the car model'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Please provide the car year'],
    },
    pricePerDay: {
      type: Number,
      required: [true, 'Please provide the price per day'],
      min: [0, 'Price per day must be positive'],
    },
    category: {
      type: String,
      required: [true, 'Please provide the car category'],
      enum: ['luxury', 'sports', 'suv', 'convertible', 'exotic'],
    },
    images: {
      type: [String],
      default: [],
    },
    transmission: {
      type: String,
      enum: ['automatic', 'manual'],
      default: 'automatic',
    },
    fuelType: {
      type: String,
      enum: ['petrol', 'diesel', 'electric', 'hybrid'],
      default: 'petrol',
    },
    seats: {
      type: Number,
      required: [true, 'Please provide the number of seats'],
      min: [1, 'Number of seats must be at least 1'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    features: {
      type: [String],
      default: [],
    },
    available: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
      required: [true, 'Please provide the car location'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot be more than 5'],
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for bookings
carSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'car',
});

// Virtual for reviews
carSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'car',
});

// Add index for common queries
carSchema.index({ make: 1, model: 1 });
carSchema.index({ category: 1 });
carSchema.index({ available: 1 });
carSchema.index({ featured: 1 });
carSchema.index({ pricePerDay: 1 });

const Car = mongoose.model('Car', carSchema);

export default Car;