// src/periodo/periodo.controller.ts
import { Request, Response, NextFunction } from 'express';
import { PeriodoService } from './periodo.service.js';
import { getEm } from '../shared/db/orm.js';
import { PeriodoInput } from './periodo.schema.js';

export class PeriodoController {
  constructor(private readonly service = new PeriodoService()) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const periodos = await this.service.findAll(getEm());
      res.status(200).json({ message: 'found all periodos', data: periodos });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const periodo = await this.service.findOne(id, getEm());
      res.status(200).json({ message: 'found periodo', data: periodo });
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const data: PeriodoInput = req.body.sanitizedInput;
      const periodo = await this.service.add(data, getEm());
      res.status(201).json({ message: 'periodo created', data: periodo });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = req.body.sanitizedInput;
      const periodo = await this.service.update(id, data, getEm());
      res.status(200).json({ message: 'periodo updated', data: periodo });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await this.service.remove(id, getEm());
      res.status(200).json({ message: 'periodo deleted' });
    } catch (error) {
      next(error);
    }
  }

  async getVigente(req: Request, res: Response, next: NextFunction) {
    try {
      const periodo = await this.service.getVigente(getEm());
      res.status(200).json({ message: 'periodo vigente', date: periodo });
    } catch (error) {
      next(error);
    }
  }
}
