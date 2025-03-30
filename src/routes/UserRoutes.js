import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { FieldValidations } from '../middleware/fieldsValidationsMiddleware.js';

const userRoutes = Router();
const userController = new UserController();
const validation = new FieldValidations();

userRoutes.post('/api/users', validation.valitadeUserData, userController.createUser);
userRoutes.get('/api/users', userController.findAllUsers);
userRoutes.get('/api/users/:id', validation.validateIdParameter, userController.findUserById);
userRoutes.patch('/api/users/:id', validation.validateIdParameter, userController.updateUser);
userRoutes.delete('/api/users/:id', validation.validateIdParameter, userController.deleteUser);

export { userRoutes };