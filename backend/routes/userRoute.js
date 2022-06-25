import express from 'express';
import { register, login, getMe, resetPassword } from './../controllers/userController.js';
import AUTH from './../middlewares/authMiddleware.js';

const router = express.Router();

// PUBLIC
router.post('/register', register);
router.post('/login', login);

// PROTECTED
router.route('/me').get(AUTH, getMe).post(AUTH, resetPassword);

export default router;
