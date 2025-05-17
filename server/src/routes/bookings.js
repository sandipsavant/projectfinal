import express from 'express';
import { body } from 'express-validator';
import { protect, restrictTo } from '../middleware/auth.js';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  getAllBookings,
} from '../controllers/bookingController.js';

const router = express.Router();

// User routes
router.post(
  '/',
  protect,
  [
    body('carId').notEmpty().withMessage('Car ID is required'),
    body('startDate').notEmpty().withMessage('Start date is required'),
    body('endDate').notEmpty().withMessage('End date is required'),
    body('pickupLocation').optional(),
    body('dropoffLocation').optional(),
    body('additionalDrivers').optional().isNumeric(),
    body('insurance').optional().isBoolean(),
  ],
  createBooking
);

router.get('/', protect, getUserBookings);
router.get('/:id', protect, getBookingById);
router.put(
  '/:id',
  protect,
  [
    body('status')
      .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
      .withMessage('Invalid status'),
  ],
  updateBookingStatus
);

// Admin routes
router.get('/admin/all', protect, restrictTo('admin'), getAllBookings);

export default router;