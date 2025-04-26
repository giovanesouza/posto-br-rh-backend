import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { FieldValidations } from '../middleware/fieldsValidationsMiddleware.js';
import authorization from '../auth/authorization.js';

const userRoutes = Router();
const userController = new UserController();
const validation = new FieldValidations();

userRoutes.post('/users', authorization, validation.valitadeUserData, userController.createUser);
userRoutes.get('/users', authorization, userController.findAllUsers);
userRoutes.get('/users/:id', authorization, validation.validateIdParameter, userController.findUserById);
userRoutes.patch('/users/:id', authorization, validation.validateIdParameter, userController.updateUser);
userRoutes.delete('/users/:id', authorization, validation.validateIdParameter, userController.deleteUser);

export { userRoutes };