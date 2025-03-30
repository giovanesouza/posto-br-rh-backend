import { Router } from 'express';
import { VacationController } from '../controllers/VacationController.js';
import { FieldValidations } from '../middleware/fieldsValidationsMiddleware.js';

const vacationRoutes = Router();
const vacationController = new VacationController();
const validation = new FieldValidations();

vacationRoutes.post('/api/vacation', validation.validateVacationData, vacationController.createVacation);
vacationRoutes.get('/api/vacation', vacationController.findAllVacation);
vacationRoutes.get('/api/vacation/:id', validation.validateIdParameter, vacationController.findVacationById);
vacationRoutes.patch('/api/vacation/:id', validation.validateIdParameter, vacationController.updateVacation);
vacationRoutes.delete('/api/vacation/:id', validation.validateIdParameter, vacationController.deleteVacation);

export { vacationRoutes };