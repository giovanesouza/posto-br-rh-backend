import { Router } from 'express';
import { PositionController } from '../controllers/PositionController.js';
import { FieldValidations } from '../middleware/fieldsValidationsMiddleware.js';
import authorize from '../auth/authorization.js';

const positionRoutes = Router();
const positionController = new PositionController();
const validation = new FieldValidations();

positionRoutes.post('/positions', authorize(), validation.validatePositionData, positionController.createPosition);
positionRoutes.get('/positions', authorize(), positionController.findAllPositions);
positionRoutes.get('/positions/:id', authorize(), validation.validateIdParameter, positionController.findPositionById);
positionRoutes.put('/positions/:id', authorize(), validation.validateIdParameter, positionController.updatePosition);
positionRoutes.delete('/positions/:id', authorize(), validation.validateIdParameter, positionController.deleteposition);

export { positionRoutes };