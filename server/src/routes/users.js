import express from 'express';
import { body } from 'express-validator';
import { protect, restrictTo } from '../middleware/auth.js';
import {
  getCurrentUser,
  updateCurrentUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

// Current user routes
router.get('/me', protect, getCurrentUser);
router.put(
  '/me',
  protect,
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('phone').optional(),
    body('address').optional(),
    body('drivingLicense').optional(),
  ],
  updateCurrentUser
);

// Admin routes
router.get('/', protect, restrictTo('admin'), getUsers);
router.get('/:id', protect, restrictTo('admin'), getUserById);
router.put(
  '/:id',
  protect,
  restrictTo('admin'),
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email')
      .optional()
      .isEmail()
      .withMessage('Please provide a valid email address'),
    body('password')
      .optional()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('role').optional().isIn(['user', 'admin']),
  ],
  updateUser
);
router.delete('/:id', protect, restrictTo('admin'), deleteUser);

export default router;