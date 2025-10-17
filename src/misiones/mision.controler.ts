import { Request, Response, NextFunction } from 'express';
import { MisionService } from './mision.service.js';
import { getEm } from '../shared/db/orm.js';
import { validateId } from '../shared/validateParam.js';

export class MisionController {
  constructor(private readonly service: MisionService = new MisionService()) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const misiones = await this.service.findAll(getEm());
      res.status(200).json({ message: 'found all misiones', data: misiones });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const mision = await this.service.findOne(id, getEm());
      res.status(200).json({ message: 'found mision', data: mision });
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.add(req.body.sanitizedInput, getEm());
      res.status(201).json({ message: 'mision created' });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.update(id, req.body.sanitizedInput, getEm());
      res.status(200).json({ message: 'mision updated' });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.remove(id, getEm());
      res.status(200).json({ message: 'mision deleted' });
    } catch (error) {
      next(error);
    }
  }
}
