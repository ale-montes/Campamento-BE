import { EntityManager, LockMode } from '@mikro-orm/core';
import { Mision } from './mision.entity.js';
import { MisionInputAdmin } from './mision.schema.js';
import { NotFoundError } from '../shared/errors/http-error.js';

export class MisionService {
  async findAll(em: EntityManager): Promise<Mision[]> {
    return await em.find(Mision, {});
  }

  async findOne(id: number, em: EntityManager): Promise<Mision> {
    const mision = await em.findOne(Mision, { id });
    if (!mision) throw new NotFoundError(`Misión con id ${id} no encontrada`);
    return mision;
  }

  async add(data: MisionInputAdmin, em: EntityManager): Promise<Mision> {
    const mision = em.create(Mision, data);
    await em.persistAndFlush(mision);
    return mision;
  }

  async update(id: number, data: Partial<Mision>, em: EntityManager): Promise<Mision> {
    const updatedMision = await em.transactional(async (tEm) => {
      const mision = await tEm.findOne(Mision, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
      if (!mision) throw new NotFoundError(`Misión con id ${id} no encontrada`);
      tEm.assign(mision, data);
      await tEm.flush();
      return mision;
    });
    return updatedMision;
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    const mision = await em.findOne(Mision, { id });
    if (!mision) throw new NotFoundError(`Misión con id ${id} no encontrada`);
    await em.removeAndFlush(mision);
  }
}
