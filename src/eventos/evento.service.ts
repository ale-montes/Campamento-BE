import { EntityManager, LockMode } from '@mikro-orm/core';
import { Evento } from './evento.entity.js';
import { validateId } from '../shared/validateParam.js';
import { NotFoundError } from '../shared/errors/http-error.js';
import { EventoInput, EventoUpdateInput } from './evento.schema.js';
import { PeriodoService } from '../periodo/periodo.service.js';

export class EventoService {
  private periodoService = new PeriodoService();

  async findAll(em: EntityManager): Promise<Evento[]> {
    return em.find(Evento, {}, { populate: ['periodo'] });
  }

  async findOne(id: number, em: EntityManager): Promise<Evento> {
    validateId(id);
    const evento = await em.findOne(Evento, { id }, { populate: ['periodo'] });
    if (!evento) throw new NotFoundError('Evento');
    return evento;
  }

  async add(data: EventoInput, em: EntityManager): Promise<Evento> {
    await this.periodoService.findOne(data.periodo, em);
    const evento = em.create(Evento, data);
    await em.persistAndFlush(evento);
    return evento;
  }

  async update(id: number, data: EventoUpdateInput, em: EntityManager): Promise<void> {
    validateId(id);
    await em.transactional(async (tEm) => {
      const evento = await tEm.findOne(Evento, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
      if (!evento) throw new NotFoundError('Evento');
      tEm.assign(evento, data);
      await tEm.flush();
    });
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    validateId(id);
    const evento = await em.findOne(Evento, { id });
    if (!evento) throw new NotFoundError('Evento');
    await em.removeAndFlush(evento);
  }
}
