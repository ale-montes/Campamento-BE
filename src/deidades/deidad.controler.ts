import { Request, Response, NextFunction } from 'express';
import { DeidadService } from './deidad.service.js';
import { getEm } from '../shared/db/orm.js';
import { validateId } from '../shared/validateParam.js';

export class DeidadController {
  constructor(private readonly service: DeidadService = new DeidadService()) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const deidades = await this.service.findAll(getEm());
      res.status(200).json({ message: 'found all deidades', data: deidades });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const deidad = await this.service.findOne(id, getEm());
      res.status(200).json({ message: 'found deidad', data: deidad });
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.add(req.body.sanitizedInput, getEm());
      res.status(201).json({ message: 'deidad created' });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.update(id, req.body.sanitizedInput, getEm());
      res.status(200).json({ message: 'deidad updated' });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.remove(id, getEm());
      res.status(200).json({ message: 'deidad deleted' });
    } catch (error) {
      next(error);
    }
  }
}
