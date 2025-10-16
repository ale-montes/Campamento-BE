import { Request, Response, NextFunction } from 'express';
import { SolicitudEventoService } from './solicitud-evento.service.js';
import { getEm } from '../shared/db/orm.js';
import { validateId } from '../shared/validateParam.js';
import { UserPayload } from '../types/user.js';

export class SolicitudEventoController {
  constructor(private readonly service: SolicitudEventoService = new SolicitudEventoService()) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserPayload;
      const solicitudes = await this.service.findAll(user, getEm());
      res.status(200).json({ message: 'found solicitudes', data: solicitudes });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const user = req.user as UserPayload;
      const solicitud = await this.service.findOne(id, user, getEm());
      res.status(200).json({ message: 'found solicitud', data: solicitud });
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserPayload;
      const input = req.body!.sanitizedInput;
      await this.service.add(input, user, getEm());
      res.status(201).json({ message: 'solicitud created' });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      const user = req.user as UserPayload;
      const input = req.body!.sanitizedInput;
      await this.service.update(id, input, user, getEm());
      res.status(200).json({ message: 'solicitud updated' });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      await this.service.remove(id, getEm());
      res.status(200).json({ message: 'solicitud deleted' });
    } catch (error) {
      next(error);
    }
  }
}
