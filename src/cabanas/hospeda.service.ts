import { EntityManager, LockMode } from '@mikro-orm/core';
import { Hospeda } from './hospeda.entity.js';
import { Cabania } from '../cabanas/cabania.entity.js';
import { NotFoundError, BadRequestError } from '../shared/errors/http-error.js';
import { validateId } from '../shared/validateParam.js';
import { PeriodoService } from '../periodo/periodo.service.js';
import { UserPayload } from '../types/user.js';
import { HospedaInputAdmin } from './hospeda.schema.js';

export class HospedaService {
  private periodoService = new PeriodoService();

  async findAll(user: UserPayload, em: EntityManager): Promise<Hospeda[]> {
    if (user.role === 'campista') {
      const { id } = await this.periodoService.getVigente(em);
      const inscripciones = await em.find(
        Hospeda,
        {
          campista: user.id,
          periodo: id,
        },
        { populate: ['cabania', 'campista', 'periodo'] },
      );
      return inscripciones;
    }
    return await em.find(Hospeda, {}, { populate: ['campista', 'cabania', 'periodo'] });
  }

  async findOne(id: number, em: EntityManager): Promise<Hospeda> {
    const hospeda = await em.findOne(Hospeda, { id }, { populate: ['campista', 'cabania', 'periodo'] });
    if (!hospeda) throw new NotFoundError('Hospedaje');
    return hospeda;
  }

  async add(user: UserPayload, data: HospedaInputAdmin, em: EntityManager): Promise<Hospeda> {
    const periodoVigente = await this.periodoService.getVigente(em);

    if (user.role === 'campista') {
      if (!data.cabania) throw new BadRequestError('Debe enviar la cabaña');
      const idPeriodo = validateId(periodoVigente.id);

      data.campista = Number(user.id);
      data.periodo = idPeriodo;
      data.estado = 'reservada';
      data.fechaInicio = data.fechaInicio ?? new Date();

      const hospeda = em.create(Hospeda, data);
      await em.persistAndFlush(hospeda);
      return hospeda;
    }

    if (!data.cabania || !data.campista || !data.periodo) {
      throw new BadRequestError('Campos obligatorios faltantes');
    }

    const hospeda = em.create(Hospeda, {
      ...data,
      estado: data.estado ?? 'reservada',
    });
    await em.persistAndFlush(hospeda);
    return hospeda;
  }

  async update(id: number, data: Partial<Hospeda>, em: EntityManager): Promise<Hospeda> {
    validateId(id);

    return await em.transactional(async (tEm) => {
      const hospeda = await tEm.findOne(Hospeda, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
      if (!hospeda) throw new NotFoundError('Hospedaje');

      if (data.cabania) {
        hospeda.cabania = tEm.getReference(Cabania, Number(data.cabania));
      }

      tEm.assign(hospeda, {
        ...data,
        cabania: data.cabania ? undefined : hospeda.cabania,
      });

      await tEm.flush();
      return hospeda;
    });
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    validateId(id);
    const hospeda = await em.findOne(Hospeda, { id });
    if (!hospeda) throw new NotFoundError('Hospedaje');
    await em.removeAndFlush(hospeda);
  }
}
