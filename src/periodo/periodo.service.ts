import { Request, Response } from 'express';
import { Periodo } from './periodo.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findCurrent(req: Request, res: Response) {
  try {
    const today = new Date();

    // Buscar periodo donde la fecha actual esté entre inicio y fin
    const periodoActual = await em.findOne(Periodo, {
      fechaInicioPer: { $lte: today },
      fechaFinPer: { $gte: today },
    });

    if (periodoActual) {
      return res.status(200).json({ message: 'found current periodo', data: periodoActual });
    }

    // Si no hay periodo actual, buscar el más próximo (futuro más cercano)
    const periodoProximo = await em.findOne(
      Periodo,
      {
        fechaInicioPer: { $gt: today },
      },
      {
        orderBy: { fechaInicioPer: 'ASC' },
      },
    );

    res.status(200).json({
      message: periodoProximo ? 'found next periodo' : 'no period found',
      data: periodoProximo,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Unknown error', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}
export { findCurrent };
