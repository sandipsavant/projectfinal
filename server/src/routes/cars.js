import express from 'express';
import { body } from 'express-validator';
import { protect, restrictTo } from '../middleware/auth.js';
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from '../controllers/carController.js';

const router = express.Router();

// Public routes
router.get('/', getCars);
router.get('/:id', getCarById);

// Admin routes
router.post(
  '/',
  protect,
  restrictTo('admin'),
  [
    body('make').notEmpty().withMessage('Make is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('year').isNumeric().withMessage('Year must be a number'),
    body('pricePerDay')
      .isNumeric()
      .withMessage('Price per day must be a number'),
    body('category')
      .isIn(['luxury', 'sports', 'suv', 'convertible', 'exotic'])
      .withMessage('Invalid category'),
    body('transmission')
      .optional()
      .isIn(['automatic', 'manual'])
      .withMessage('Invalid transmission type'),
    body('fuelType')
      .optional()
      .isIn(['petrol', 'diesel', 'electric', 'hybrid'])
      .withMessage('Invalid fuel type'),
    body('seats').isNumeric().withMessage('Seats must be a number'),
    body('description').notEmpty().withMessage('Description is required'),
    body('location').notEmpty().withMessage('Location is required'),
  ],
  createCar
);

router.put('/:id', protect, restrictTo('admin'), updateCar);
router.delete('/:id', protect, restrictTo('admin'), deleteCar);

export default router;