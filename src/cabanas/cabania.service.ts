import { EntityManager, LockMode } from '@mikro-orm/core';
import { Cabania } from './cabania.entity.js';
import { CabaniaInputAdmin } from './cabania.schema.js';
import { NotFoundError } from '../shared/errors/http-error.js';
import { validateId } from '../shared/validateParam.js';

export class CabaniaService {
  async findAll(em: EntityManager): Promise<Cabania[]> {
    const cabanias = await em.find(Cabania, {}, { populate: ['deidad'] });
    return cabanias;
  }

  async findOne(id: number, em: EntityManager): Promise<Cabania> {
    const cabania = await em.findOne(Cabania, { id }, { populate: ['deidad'] });
    if (!cabania) throw new NotFoundError(`Cabaña con id ${id} no encontrada`);
    return cabania;
  }

  async add(data: CabaniaInputAdmin, em: EntityManager): Promise<Cabania> {
    const cabania = em.create(Cabania, data);
    await em.persistAndFlush(cabania);
    return cabania;
  }

  async update(id: number, data: Partial<Cabania>, em: EntityManager): Promise<Cabania> {
    validateId(id);
    const updatedCabania = await em.transactional(async (tEm) => {
      const cabania = await tEm.findOne(Cabania, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
      if (!cabania) throw new NotFoundError(`Cabaña con id ${id} no encontrada`);
      tEm.assign(cabania, data);
      await tEm.flush();
      return cabania;
    });
    return updatedCabania;
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    validateId(id);
    const cabania = await em.findOne(Cabania, { id });
    if (!cabania) throw new NotFoundError(`Cabaña con id ${id} no encontrada`);
    cabania.cabinStatus = 'Inactivo';
    await em.flush();
  }
}
