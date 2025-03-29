import { Router } from 'express';
import { VacationController } from '../controllers/VacationController.js';

const vacationRoutes = Router();
const vacationController = new VacationController();

vacationRoutes.post('/api/vacation', vacationController.createVacation);
vacationRoutes.get('/api/vacation', vacationController.findAllVacation);
vacationRoutes.get('/api/vacation/:id', vacationController.findVacationById);
vacationRoutes.patch('/api/vacation/:id', vacationController.updateVacation);
vacationRoutes.delete('/api/vacation/:id', vacationController.deleteVacation);

export { vacationRoutes };