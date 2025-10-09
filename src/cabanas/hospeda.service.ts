import { Request, Response } from 'express';
import { Hospeda } from './hospeda.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findHospedajePeriodo(req: Request, res: Response) {
  try {
    const campistaId = Number(req.params.campistaId);
    const fechaInicio = new Date(req.query.fechaInicio as string);
    const fechaFin = new Date(req.query.fechaFin as string);

    if (isNaN(campistaId) || isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
      return res.status(400).json({ message: 'Parámetros inválidos' });
    }

    const hospedaje = await em.findOne(
      Hospeda,
      {
        campista: { id: campistaId },
        fechaInicio: { $lte: fechaFin },
        fechaFin: { $gte: fechaInicio },
      },
      { populate: ['cabania'] },
    );

    if (!hospedaje) {
      return res.status(404).json({ message: 'No se encontró hospedaje en el periodo indicado' });
    }

    return res.status(200).json({
      success: true,
      data: hospedaje,
    });
  } catch (error: unknown) {
    console.error('Error buscando hospedaje:', error);
    return res.status(500).json({
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Error interno',
    });
  }
}

export { findHospedajePeriodo };
