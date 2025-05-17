import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: [true, 'Booking must belong to a car'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a user'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide an end date'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Please provide the total price'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentIntent: {
      type: String,
      default: '',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    additionalDrivers: {
      type: Number,
      default: 0,
    },
    insurance: {
      type: Boolean,
      default: false,
    },
    pickupLocation: {
      type: String,
      default: '',
    },
    dropoffLocation: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add compound index for checking availability
bookingSchema.index({ car: 1, startDate: 1, endDate: 1 });
bookingSchema.index({ user: 1, status: 1 });

// Add virtual for duration
bookingSchema.virtual('durationDays').get(function () {
  return Math.ceil(
    (this.endDate - this.startDate) / (1000 * 60 * 60 * 24)
  );
});

// Statics
bookingSchema.statics.checkAvailability = async function (
  carId,
  startDate,
  endDate
) {
  const overlappingBookings = await this.find({
    car: carId,
    status: { $in: ['pending', 'confirmed'] },
    $or: [
      { startDate: { $lt: endDate }, endDate: { $gt: startDate } },
      { startDate: { $gte: startDate, $lt: endDate } },
      { endDate: { $gt: startDate, $lte: endDate } },
    ],
  });

  return overlappingBookings.length === 0;
};

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;