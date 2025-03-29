import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController.js';

const employeeRoutes = Router();
const employeeController = new EmployeeController();

employeeRoutes.post('/api/employees', employeeController.createEmployee);
employeeRoutes.get('/api/employees', employeeController.findAllEmployees);
employeeRoutes.get('/api/employees/:id', employeeController.findEmployeeById);
employeeRoutes.patch('/api/employees/:id', employeeController.updateEmployee);
employeeRoutes.delete('/api/employees/:id', employeeController.deleteEmployee);

export { employeeRoutes };