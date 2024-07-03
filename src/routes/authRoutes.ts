import { Router } from 'express';
import { checkAuth, login, logout } from '../controllers/authController';

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.get('/logout', logout);
authRoutes.get('/check', checkAuth);

export default authRoutes;
