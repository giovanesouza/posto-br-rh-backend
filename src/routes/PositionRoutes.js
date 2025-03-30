import { Router } from 'express';
import { PositionController } from '../controllers/PositionController.js';
import { FieldValidations } from '../middleware/fieldsValidationsMiddleware.js';

const positionRoutes = Router();
const positionController = new PositionController();
const validation = new FieldValidations();

positionRoutes.post('/api/positions', validation.validatePositionData, positionController.createPosition);
positionRoutes.get('/api/positions', positionController.findAllPositions);
positionRoutes.get('/api/positions/:id', validation.validateIdParameter, positionController.findPositionById);
positionRoutes.patch('/api/positions/:id', validation.validateIdParameter, positionController.updatePosition);
positionRoutes.delete('/api/positions/:id', validation.validateIdParameter, positionController.deleteposition);

export { positionRoutes };