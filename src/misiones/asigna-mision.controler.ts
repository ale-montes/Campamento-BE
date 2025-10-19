import { Request, Response, NextFunction } from 'express';
import { AsignaMisionService } from './asigna-mision.service.js';
import { getEm } from '../shared/db/orm.js';
import { validateId } from '../shared/validateParam.js';

export class AsignaMisionController {
  constructor(private readonly service: AsignaMisionService = new AsignaMisionService()) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const asignaciones = await this.service.findAll(req.user!, getEm());
      res.status(200).json({ message: 'found asignaMision', data: asignaciones });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const asignacion = await this.service.findOne(req.user!, id, getEm());
      res.status(200).json({ message: 'found asignaMision', data: asignacion });
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.add(req.user!, req.body.sanitizedInput, getEm());
      res.status(201).json({ message: 'asignaMision created' });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.update(id, req.body.sanitizedInput, req.user!, getEm());
      res.status(200).json({ message: 'asignaMision updated' });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.remove(id, req.user!, getEm());
      res.status(200).json({ message: 'asignaMision deleted' });
    } catch (error) {
      next(error);
    }
  }
}
