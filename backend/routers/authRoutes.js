import express from 'express';
import { rateLimiter } from '../middleware/rateLimiter.js';
import { body } from 'express-validator';
import { register,login, logout, addRole } from '../controllers/authController.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import jwtMiddleware from '../middleware/jwtMiddleware.js';

const router = express.Router();

router.post(
  '/register',
  [
      body('name').notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Invalid email address'),
      body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
      body('role')
          .notEmpty()
          .isIn(['User', 'Moderator', 'Admin']) // Ensure role is one of the valid options
          .withMessage('Role is required and must be User, Moderator, or Admin'),
  ],
  rateLimiter,
  register
);


router.post('/login', rateLimiter, login);

router.post('/logout', logout);

router.post('/addRole', jwtMiddleware, roleMiddleware(['Admin']), addRole);

export default router;
