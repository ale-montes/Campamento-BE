import { Router } from 'express';
import { usuariosController } from './usuarios.controller.js';
import { usuarioSchema, usuarioUpdateSchema } from './usuarios.schema.js';
import { validateSchema } from '../shared/validate.js';

const router = Router();

router.get('/', usuariosController.getUsuarios);
router.get('/:id', usuariosController.getUsuario);
router.post('/', validateSchema(usuarioSchema), usuariosController.createUsuario);
router.put('/:id', validateSchema(usuarioSchema), usuariosController.updateUsuario);
router.patch('/:id', validateSchema(usuarioUpdateSchema), usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

export const usuariosRoutes = router;
