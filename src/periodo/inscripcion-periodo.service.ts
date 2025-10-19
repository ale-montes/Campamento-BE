import { EntityManager, LockMode } from '@mikro-orm/core';
import { InscripcionPeriodo } from './inscripcion-periodo.entity.js';
import { NotFoundError, BadRequestError } from '../shared/errors/http-error.js';
import { validateId } from '../shared/validateParam.js';
import { InscripcionPeriodoInputAdmin } from './inscripcion-periodo.schema.js';
import { UserPayload } from '../types/user.js';
import { PeriodoService } from './periodo.service.js';

export class InscripcionPeriodoService {
  private periodoService = new PeriodoService();
  private cachedInscripciones = new Map<number, InscripcionPeriodo>();
  async findAll(user: UserPayload, em: EntityManager): Promise<InscripcionPeriodo[]> {
    if (user.role === 'campista') {
      const inscripciones = await em.find(
        InscripcionPeriodo,
        {
          campista: user.id,
        },
        { populate: ['periodo', 'campista'] },
      );
      return inscripciones;
    }
    return await em.find(InscripcionPeriodo, {}, { populate: ['periodo', 'campista'] });
  }

  async findOne(user: UserPayload, id: number, em: EntityManager): Promise<InscripcionPeriodo> {
    const idInscripcion = validateId(id);
    if (user.role === 'campista') {
      const inscripcion = await em.findOne(
        InscripcionPeriodo,
        {
          id: idInscripcion,
          campista: user.id,
        },
        { populate: ['periodo'] },
      );
      if (!inscripcion) throw new NotFoundError('Inscripción');
      return inscripcion;
    }
    const inscripcion = await em.findOne(InscripcionPeriodo, { id }, { populate: ['periodo', 'campista'] });
    if (!inscripcion) throw new NotFoundError('Inscripción de periodo');
    return inscripcion;
  }

  async add(
    user: UserPayload,
    inscripcionData: InscripcionPeriodoInputAdmin,
    em: EntityManager,
  ): Promise<InscripcionPeriodo> {
    const idPeriodo = validateId(inscripcionData.periodo);
    const periodo = await this.periodoService.findOne(idPeriodo, em);
    if (!periodo) throw new NotFoundError('Periodo');
    const repetido = await em.findOne(InscripcionPeriodo, {
      campista: user.id,
      periodo: idPeriodo,
    });
    if (repetido) throw new BadRequestError('Ya estás inscripto a este periodo');
    if (user.role === 'campista') {
      //Se comenta esta parte para hacer pruebas de inscripcion a periodo vigente 'en curso' y evitar depender de las fechas
      // if (periodo.estado !== 'abierto') {
      //   throw new BadRequestError('El periodo no está abierto para inscripciones.');
      // }
      inscripcionData.campista = user.id;
      inscripcionData.periodo = idPeriodo;
      inscripcionData.estado = 'PAGADO';
    }
    const inscripcion = em.create(InscripcionPeriodo, inscripcionData);
    await em.persistAndFlush(inscripcion);
    return inscripcion;
  }

  async update(id: number, data: Partial<InscripcionPeriodo>, em: EntityManager): Promise<void> {
    validateId(id);
    await em.transactional(async (tEm) => {
      const inscripcion = await tEm.findOne(InscripcionPeriodo, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
      if (!inscripcion) throw new NotFoundError('Inscripción de periodo');
      tEm.assign(inscripcion, data);
      await tEm.flush();
    });
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    validateId(id);
    const inscripcion = await em.findOne(InscripcionPeriodo, { id });
    if (!inscripcion) throw new NotFoundError('Inscripción de periodo');
    await em.removeAndFlush(inscripcion);
  }

  async getInscripcionVigente(user: UserPayload, em: EntityManager): Promise<InscripcionPeriodo> {
    const campistaId = Number(user.id);
    const periodo = await this.periodoService.getVigente(em);

    // Si existe cache
    const cached = this.cachedInscripciones.get(campistaId);
    if (cached && cached.periodo.id === periodo.id) {
      return cached;
    }

    // Consulta a BBDD
    const inscripcion = await em.findOne(
      InscripcionPeriodo,
      {
        campista: campistaId,
        periodo: periodo.id,
      },
      { populate: ['campista', 'periodo'] },
    );

    if (!inscripcion) {
      throw new NotFoundError('El campista no está inscripto al período vigente');
    }

    // Cachear
    this.cachedInscripciones.set(campistaId, inscripcion);
    return inscripcion;
  }

  invalidateCache(campistaId: number): void {
    this.cachedInscripciones.delete(campistaId);
  }
}
