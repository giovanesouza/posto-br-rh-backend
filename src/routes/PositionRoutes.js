import { Router } from 'express';
import { PositionController } from '../controllers/PositionController.js';

const positionRoutes = Router();
const positionController = new PositionController();

positionRoutes.post('/api/positions', positionController.createPosition);
positionRoutes.get('/api/positions', positionController.findAllPositions);
positionRoutes.get('/api/positions/:id', positionController.findPositionById);
positionRoutes.patch('/api/positions/:id', positionController.updatePosition);
positionRoutes.delete('/api/positions/:id', positionController.deleteposition);

export { positionRoutes };