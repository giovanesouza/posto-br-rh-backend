import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { FieldValidations } from '../middleware/fieldsValidationsMiddleware.js';
import authorize from '../auth/authorization.js';

const userRoutes = Router();
const userController = new UserController();
const validation = new FieldValidations();

userRoutes.post('/users', authorize(), validation.valitadeCreateUserData, userController.createUser);
userRoutes.get('/users', authorize(), userController.findAllUsers);
userRoutes.get('/users/:id', authorize(), validation.validateIdParameter, userController.findUserById);
userRoutes.patch('/users/:id', authorize(), validation.validateIdParameter, userController.updateUser);
userRoutes.delete('/users/:id', authorize(), validation.validateIdParameter, userController.deleteUser);

export { userRoutes };