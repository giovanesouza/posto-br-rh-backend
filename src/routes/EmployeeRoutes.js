import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController.js';
import { FieldValidations } from '../middleware/fieldsValidationsMiddleware.js';
import authorization from '../auth/authorization.js';

const employeeRoutes = Router();
const employeeController = new EmployeeController();
const validation = new FieldValidations();

employeeRoutes.post('/employees', authorization, validation.validateEmployeeData, employeeController.createEmployee);
employeeRoutes.get('/employees', employeeController.findAllEmployees);
employeeRoutes.get('/employees/:id', authorization, validation.validateIdParameter, employeeController.findEmployeeById);
employeeRoutes.patch('/employees/:id', authorization, validation.validateIdParameter, employeeController.updateEmployee);
employeeRoutes.delete('/employees/:id', authorization, validation.validateIdParameter, employeeController.deleteEmployee);

export { employeeRoutes };