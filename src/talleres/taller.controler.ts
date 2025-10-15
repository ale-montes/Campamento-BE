import { Request, Response, NextFunction } from 'express';
import { TallerService } from './taller.service.js';
import { getEm } from '../shared/db/orm.js';
import { validateId } from '../shared/validateParam.js';

export class TallerController {
  constructor(private readonly service: TallerService = new TallerService()) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const talleres = await this.service.findAll(req.user!, getEm());
      res.status(200).json({ message: 'found all talleres', data: talleres });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const taller = await this.service.findOne(id, getEm());
      res.status(200).json({ success: true, data: taller });
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.add(req.body.sanitizedInput, getEm());
      res.status(201).json({ message: 'taller created' });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.update(id, req.body.sanitizedInput, getEm());
      res.status(200).json({ message: 'taller updated' });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.remove(id, getEm());
      res.status(200).json({ message: 'taller deleted' });
    } catch (error) {
      next(error);
    }
  }
}
