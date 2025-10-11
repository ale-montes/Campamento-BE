import { Request, Response, NextFunction } from 'express';
import { InstructorService } from './instructor.service.js';
import { getEm } from '../shared/db/orm.js';
import { validateId } from '../shared/validateParam.js';

export class InstructorController {
  constructor(private readonly service = new InstructorService()) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const instructors = await this.service.findAll(getEm());
      res.status(200).json({ message: 'found all instructors', data: instructors });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const instructor = await this.service.findOne(id, getEm());
      res.status(200).json({ success: true, data: instructor });
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const instructor = await this.service.add(req.body.sanitizedInput, getEm());
      res.status(201).json({ message: 'instructor creado', data: instructor });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const instructor = await this.service.update(id, req.body.sanitizedInput, getEm());
      res.status(200).json({ message: 'instructor actualizado', data: instructor });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.remove(id, getEm());
      res.status(200).json({ message: 'instructor eliminado' });
    } catch (error) {
      next(error);
    }
  }
}
