import { Router } from 'express';
import { deidadesController } from './deidades.controller.js';
import { validateSchema } from '../shared/validate.js';
import { DeidadSchema } from './deidades.schema.js';
import { DeidadUpdateSchema } from './deidades.schema.js';

const router = Router();

router.get('/', deidadesController.getDeidades);
router.get('/:id', deidadesController.getDeidad);
router.post('/', validateSchema(DeidadSchema), deidadesController.addDeidad);
router.put('/:id', validateSchema(DeidadSchema), deidadesController.updateDeidad);
router.patch('/:id', validateSchema(DeidadUpdateSchema), deidadesController.updateDeidad);
router.delete('/:id', deidadesController.deleteDeidad);

export const deidadesRoutes = router;
