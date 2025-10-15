import { EntityManager, LockMode } from '@mikro-orm/core';
import { Deidad } from './deidad.entity.js';
import { NotFoundError } from '../shared/errors/http-error.js';
import { validateId } from '../shared/validateParam.js';

export class DeidadService {
  async findAll(em: EntityManager): Promise<Deidad[]> {
    return await em.find(Deidad, {});
  }

  async findOne(id: number, em: EntityManager): Promise<Deidad> {
    const deidad = await em.findOne(Deidad, { id });
    if (!deidad) throw new NotFoundError(`Deidad con id ${id} no encontrada`);
    return deidad;
  }

  async add(data: Deidad, em: EntityManager): Promise<Deidad> {
    const deidad = em.create(Deidad, data);
    await em.persistAndFlush(deidad);
    return deidad;
  }

  async update(id: number, data: Partial<Deidad>, em: EntityManager): Promise<Deidad> {
    validateId(id);
    const updatedDeidad = await em.transactional(async (tEm) => {
      const deidad = await tEm.findOne(Deidad, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
      if (!deidad) throw new NotFoundError(`Deidad con id ${id} no encontrada`);
      tEm.assign(deidad, data);
      await tEm.flush();
      return deidad;
    });
    return updatedDeidad;
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    validateId(id);
    const deidad = await em.findOne(Deidad, { id });
    if (!deidad) throw new NotFoundError(`Deidad con id ${id} no encontrada`);
    await em.removeAndFlush(deidad);
  }
}
