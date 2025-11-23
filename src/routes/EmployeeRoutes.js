import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController.js';
import { FieldValidations } from '../middleware/fieldsValidationsMiddleware.js';
import authorize from '../auth/authorization.js';

const employeeRoutes = Router();
const employeeController = new EmployeeController();
const validation = new FieldValidations();

employeeRoutes.post('/employees', authorize(), validation.validateEmployeeData, employeeController.createEmployee);
employeeRoutes.get('/employees', authorize(), employeeController.findAllEmployees);
employeeRoutes.get('/employees/:id', authorize(["employee"]), validation.validateIdParameter, employeeController.findEmployeeById);
employeeRoutes.patch('/employees/:id', authorize(), validation.validateIdParameter, employeeController.updateEmployee);
employeeRoutes.delete('/employees/:id', authorize(), validation.validateIdParameter, employeeController.deleteEmployee);

export { employeeRoutes };