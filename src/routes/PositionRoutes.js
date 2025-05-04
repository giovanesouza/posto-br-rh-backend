import { Router } from 'express';
import { PositionController } from '../controllers/PositionController.js';
import { FieldValidations } from '../middleware/fieldsValidationsMiddleware.js';
import authorization from '../auth/authorization.js';

const positionRoutes = Router();
const positionController = new PositionController();
const validation = new FieldValidations();

positionRoutes.post('/positions', authorization, validation.validatePositionData, positionController.createPosition);
positionRoutes.get('/positions', authorization, positionController.findAllPositions);
positionRoutes.get('/positions/:id', authorization, validation.validateIdParameter, positionController.findPositionById);
positionRoutes.put('/positions/:id', authorization, validation.validateIdParameter, positionController.updatePosition);
positionRoutes.delete('/positions/:id', authorization, validation.validateIdParameter, positionController.deleteposition);

export { positionRoutes };