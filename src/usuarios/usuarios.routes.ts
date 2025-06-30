import { Router } from 'express';
import { usuariosController, sanitizeUsuarioInput } from './usuarios.controller.js';
import { usuarioSchema } from './usuarios.schema.js';
import { validateSchema } from '../shared/validate.js';

const router = Router();

router.get('/', usuariosController.getUsuarios);
router.get('/:id', usuariosController.getUsuario);
router.post(
  '/',
  validateSchema(usuarioSchema),
  sanitizeUsuarioInput,
  usuariosController.createUsuario,
);
router.put('/:id', sanitizeUsuarioInput, usuariosController.updateUsuario);
router.patch('/:id', sanitizeUsuarioInput, usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

export const usuariosRoutes = router;
