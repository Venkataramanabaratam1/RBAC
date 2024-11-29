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
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
  ],
  rateLimiter,
  register
);

router.post('/login', rateLimiter, login);

router.post('/logout', logout);

router.post('/addRole', jwtMiddleware, roleMiddleware(['Admin']), addRole);

export default router;
