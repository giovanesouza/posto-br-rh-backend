import { Router } from 'express';
import { VacationController } from '../controllers/VacationController.js';
import { FieldValidations } from '../middleware/fieldsValidationsMiddleware.js';
import authorize from '../auth/authorization.js';

const vacationRoutes = Router();
const vacationController = new VacationController();
const validation = new FieldValidations();

vacationRoutes.post('/vacation', authorize(), validation.validateVacationData, vacationController.createVacation);
vacationRoutes.get('/vacation', authorize(), vacationController.findAllVacation);
vacationRoutes.get('/vacation/:id', authorize(), validation.validateIdParameter, vacationController.findVacationById);
vacationRoutes.patch('/vacation/:id', authorize(), validation.validateIdParameter, vacationController.updateVacation);
vacationRoutes.delete('/vacation/:id', authorize(), validation.validateIdParameter, vacationController.deleteVacation);

export { vacationRoutes };