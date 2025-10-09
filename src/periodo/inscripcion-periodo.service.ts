import { Request, Response } from 'express';
import { orm } from '../shared/db/orm.js';
import { InscripcionPeriodo } from './inscripcion-periodo.entity.js';

const em = orm.em;

export async function findByUserId(req: Request, res: Response): Promise<void> {
  try {
    const userId = Number.parseInt(req.params.userId);

    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid userId parameter' });
      return;
    }

    const inscripciones = await em.find(InscripcionPeriodo, { campista: userId });

    res.status(200).json({
      message: 'found user inscriptions',
      data: inscripciones,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in findByUserId:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.error('Unknown error', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}
