import { Request, Response, NextFunction } from 'express';
import { CabaniaService } from './cabania.service.js';
import { getEm } from '../shared/db/orm.js';
import { validateId } from '../shared/validateParam.js';

export class CabaniaController {
  constructor(private readonly service: CabaniaService = new CabaniaService()) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cabanias = await this.service.findAll(getEm());
      res.status(200).json({ message: 'found all cabanias', data: cabanias });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const cabania = await this.service.findOne(id, getEm());
      res.status(200).json({ message: 'found cabania', data: cabania });
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.add(req.body.sanitizedInput, getEm());
      res.status(201).json({ message: 'cabania created' });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.update(id, req.body.sanitizedInput, getEm());
      res.status(200).json({ message: 'cabania updated' });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.remove(id, getEm());
      res.status(200).json({ message: 'cabania marked as inactive' });
    } catch (error) {
      next(error);
    }
  }
}
