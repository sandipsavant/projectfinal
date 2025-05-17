import Booking from '../models/Booking.js';
import Car from '../models/Car.js';
import { validationResult } from 'express-validator';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { carId, startDate, endDate } = req.body;

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if car is available
    if (!car.available) {
      return res.status(400).json({ message: 'Car is not available for booking' });
    }

    // Check if dates are valid
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    if (start < new Date()) {
      return res.status(400).json({ message: 'Start date must be in the future' });
    }

    // Check if car is available for these dates
    const isAvailable = await Booking.checkAvailability(carId, start, end);
    if (!isAvailable) {
      return res.status(400).json({ message: 'Car is not available for selected dates' });
    }

    // Calculate total price
    const durationDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = car.pricePerDay * durationDays;

    // Create booking
    const booking = await Booking.create({
      car: carId,
      user: req.user._id,
      startDate: start,
      endDate: end,
      totalPrice,
      ...req.body
    });

    // Populate car and user information
    await booking.populate('car');

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: 'Error creating booking',
      error: error.message,
    });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('car')
      .sort('-createdAt');

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching bookings',
      error: error.message,
    });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('car');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if booking belongs to user or user is admin
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to access this booking' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching booking',
      error: error.message,
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only allow user to cancel their own booking
    if (req.user.role !== 'admin') {
      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this booking' });
      }
      
      // Regular users can only cancel, not change to other statuses
      if (status !== 'cancelled') {
        return res.status(403).json({ message: 'Users can only cancel bookings' });
      }
    }

    booking.status = status;
    
    if (status === 'cancelled') {
      // Additional logic for cancelled bookings if needed
    }

    const updatedBooking = await booking.save();
    await updatedBooking.populate('car');

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating booking',
      error: error.message,
    });
  }
};

// @desc    Get all bookings (admin)
// @route   GET /api/bookings/admin
// @access  Private/Admin
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('car')
      .populate('user', 'name email')
      .sort('-createdAt');

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching bookings',
      error: error.message,
    });
  }
};