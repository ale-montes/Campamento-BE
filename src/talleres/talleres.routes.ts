import { Router } from 'express';
import { talleresController } from './talleres.controller.js';
import { tallerSchema, tallerUpdateSchema } from './talleres.schema.js';
import { validateSchema } from '../shared/validate.js';

const router = Router();

router.get('/', talleresController.getTalleres);
router.get('/:id', talleresController.getTaller);
router.post('/', validateSchema(tallerSchema), talleresController.createTaller);
router.put('/:id', validateSchema(tallerUpdateSchema), talleresController.updateTaller);
router.patch('/:id', validateSchema(tallerUpdateSchema), talleresController.updateTaller);
router.delete('/:id', talleresController.deleteTaller);

export const talleresRoutes = router;
