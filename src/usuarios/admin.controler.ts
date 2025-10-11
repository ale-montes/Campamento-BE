import { Request, Response, NextFunction } from 'express';
import { AdminService } from './admin.service.js';
import { getEm } from '../shared/db/orm.js';
import { validateId } from '../shared/validateParam.js';

export class AdminController {
  constructor(private readonly service = new AdminService()) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const admins = await this.service.findAll(getEm());
      res.status(200).json({ message: 'found all admins', data: admins });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const admin = await this.service.findOne(id, getEm());
      res.status(200).json({ success: true, data: admin });
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await this.service.add(req.body.sanitizedInput, getEm());
      res.status(201).json({ message: 'admin creado', data: admin });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const admin = await this.service.update(id, req.body.sanitizedInput, getEm());
      res.status(200).json({ message: 'admin actualizado', data: admin });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.remove(id, getEm());
      res.status(200).json({ message: 'admin eliminado' });
    } catch (error) {
      next(error);
    }
  }
}
