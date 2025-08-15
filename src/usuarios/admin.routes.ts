import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './admin.controler.js';

export const adminRoutes = Router();

adminRoutes.get('/', findAll);
adminRoutes.get('/:id', findOne);
adminRoutes.post('/', add);
adminRoutes.put('/:id', update);
adminRoutes.patch('/:id', update);
adminRoutes.delete('/:id', remove);
