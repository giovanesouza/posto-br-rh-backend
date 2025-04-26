import { Router } from 'express';
import { LoginController } from '../controllers/LoginController.js';
import { FieldValidations } from '../middleware/fieldsValidationsMiddleware.js';

const loginRoutes = Router();
const loginController = new LoginController();
const validation = new FieldValidations();

loginRoutes.post('/sign-in', validation.valitadeUserData, loginController.sign);

export { loginRoutes };