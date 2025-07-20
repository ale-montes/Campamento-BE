import { Router } from 'express';
import { cabanasController } from './cabanas.controller.js';
import { cabanaSchema, cabanaUpdateSchema } from './cabanas.schema.js';
import { validateSchema } from '../shared/validate.js';

const router = Router();

router.get('/', cabanasController.getCabanas);
router.get('/:id', cabanasController.getCabana);
router.post('/', validateSchema(cabanaSchema), cabanasController.createCabana);
router.put('/:id', validateSchema(cabanaUpdateSchema), cabanasController.updateCabana);
router.patch('/:id', validateSchema(cabanaUpdateSchema), cabanasController.updateCabana);
router.delete('/:id', cabanasController.deleteCabana);

export const cabanasRoutes = router;
