import { Request, Response, NextFunction } from 'express';
import { HospedaService } from './hospeda.service.js';
import { getEm } from '../shared/db/orm.js';
import { validateId } from '../shared/validateParam.js';

export class HospedaController {
  constructor(private readonly service: HospedaService = new HospedaService()) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const hospedajes = await this.service.findAll(req.user!, getEm());
      res.status(200).json({ message: 'found hospedajes', data: hospedajes });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const hospeda = await this.service.findOne(id, getEm());
      res.status(200).json({ message: 'found hospeda', data: hospeda });
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.add(req.user!, req.body.sanitizedInput, getEm());
      res.status(201).json({ message: 'hospeda created' });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.update(id, req.body.sanitizedInput, getEm());
      res.status(200).json({ message: 'hospeda updated' });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.remove(id, getEm());
      res.status(200).json({ message: 'hospeda deleted' });
    } catch (error) {
      next(error);
    }
  }
}
