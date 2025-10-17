import { Request, Response, NextFunction } from 'express';
import { InscripcionPeriodoService } from './inscripcion-periodo.service.js';
import { getEm } from '../shared/db/orm.js';
import { validateId } from '../shared/validateParam.js';
import { BadRequestError } from '../shared/errors/http-error.js';

export class InscripcionPeriodoController {
  constructor(private readonly service: InscripcionPeriodoService = new InscripcionPeriodoService()) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const inscripciones = await this.service.findAll(req.user!, getEm());
      res.status(200).json({ message: 'found inscripciones', data: inscripciones });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const inscripcion = await this.service.findOne(req.user!, id, getEm());
      res.status(200).json({ message: 'found inscripcion', data: inscripcion });
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.add(req.user!, req.body.sanitizedInput, getEm());
      res.status(201).json({ message: 'inscripcion created' });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.update(id, req.body.sanitizedInput, getEm());
      res.status(200).json({ message: 'inscripcion updated' });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.remove(id, getEm());
      res.status(200).json({ message: 'inscripcion deleted' });
    } catch (error) {
      next(error);
    }
  }
  async getInscripcionVigente(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user!.role !== 'campista') throw new BadRequestError('Inscripción');
      const periodo = await this.service.getInscripcionVigente(req.user!, getEm());
      res.status(200).json({ message: 'periodo vigente', data: periodo });
    } catch (error) {
      next(error);
    }
  }
}
