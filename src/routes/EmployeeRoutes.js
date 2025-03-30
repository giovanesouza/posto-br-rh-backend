import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController.js';
import { FieldValidations } from '../middleware/fieldsValidationsMiddleware.js';

const employeeRoutes = Router();
const employeeController = new EmployeeController();
const validation = new FieldValidations();

employeeRoutes.post('/api/employees', validation.validateEmployeeData, employeeController.createEmployee);
employeeRoutes.get('/api/employees', employeeController.findAllEmployees);
employeeRoutes.get('/api/employees/:id', validation.validateIdParameter, employeeController.findEmployeeById);
employeeRoutes.patch('/api/employees/:id', validation.validateIdParameter, employeeController.updateEmployee);
employeeRoutes.delete('/api/employees/:id', validation.validateIdParameter, employeeController.deleteEmployee);

export { employeeRoutes };