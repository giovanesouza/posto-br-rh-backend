import { Router } from 'express';
import { VacationController } from '../controllers/VacationController.js';
import { FieldValidations } from '../middleware/fieldsValidationsMiddleware.js';
import authorization from '../auth/authorization.js';

const vacationRoutes = Router();
const vacationController = new VacationController();
const validation = new FieldValidations();

vacationRoutes.post('/vacation', authorization, validation.validateVacationData, vacationController.createVacation);
vacationRoutes.get('/vacation', authorization, vacationController.findAllVacation);
vacationRoutes.get('/vacation/:id', authorization, validation.validateIdParameter, vacationController.findVacationById);
vacationRoutes.patch('/vacation/:id', authorization, validation.validateIdParameter, vacationController.updateVacation);
vacationRoutes.delete('/vacation/:id', authorization, validation.validateIdParameter, vacationController.deleteVacation);

export { vacationRoutes };