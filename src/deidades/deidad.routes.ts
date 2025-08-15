import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './deidad.controler.js';

export const deidadRoutes = Router();

deidadRoutes.get('/', findAll);
deidadRoutes.get('/:id', findOne);
deidadRoutes.post('/', add);
deidadRoutes.put('/:id', update);
deidadRoutes.patch('/:id', update);
deidadRoutes.delete('/:id', remove);
