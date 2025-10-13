import { Request, Response, NextFunction } from 'express';
import { CampistaService } from './campista.service.js';
import { getEm } from '../shared/db/orm.js';
import { validateId } from '../shared/validateParam.js';

export class CampistaController {
  constructor(private readonly service = new CampistaService()) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const campistas = await this.service.findAll(getEm());
      res.status(200).json({ message: 'found all campistas', data: campistas });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const campista = await this.service.findOne(id, getEm());
      res.status(200).json({ success: true, data: campista });
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const campista = await this.service.add(req.user!.role, req.body.sanitizedInput, getEm());
      res.status(201).json({ message: 'campista creado', data: campista });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const campista = await this.service.update(id, req.body.sanitizedInput, getEm());
      res.status(200).json({ message: 'campista actualizado', data: campista });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.remove(id, getEm());
      res.status(200).json({ message: 'campista eliminado' });
    } catch (error) {
      next(error);
    }
  }
}
