import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/api/users', userController.createUser);
userRoutes.get('/api/users', userController.findAllUsers);
userRoutes.get('/api/users/:id', userController.findUserById);
userRoutes.patch('/api/users/:id', userController.updateUser);
userRoutes.delete('/api/users/:id', userController.deleteUser);

export { userRoutes };