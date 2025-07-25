import { Request, Response } from 'express';
import { Taller } from './talleres.entity.js';
import { TallerRepository } from './talleres.repository.js';
import crypto from 'crypto';

const tallerRepository = new TallerRepository();

const getTalleres = (req: Request, res: Response) => {
  res.json(tallerRepository.findAll());
};

const getTaller = (req: Request, res: Response) => {
  const id = req.params.id;
  const taller = tallerRepository.findOne({ id });
  if (!taller) {
    res.status(404).json({ message: 'Taller no encontrado' });
    return;
  }
  res.json(taller);
};

const createTaller = (req: Request, res: Response) => {
  const data = req.body.sanitizedInput;
  const taller = new Taller(
    crypto.randomUUID(),
    data.titulo,
    data.descripcion,
    new Date(data.fechaHora),
    data.lugar,
    data.instructor,
  );
  tallerRepository.add(taller);
  res.status(201).send({ message: 'Taller creado', data: taller });
};
const updateTaller = (req: Request, res: Response) => {
  const input = req.body.sanitizedInput;
  input.idTaller = req.params.id;
  const taller = tallerRepository.update(input);
  if (!taller) {
    res.status(404).send({ error: 'Taller no encontrado' });
    return;
  }
  res.status(200).send({ message: 'Taller actualizado', data: taller });
};

const deleteTaller = (req: Request, res: Response) => {
  const id = req.params.id;
  const taller = tallerRepository.delete({ id });
  if (!taller) {
    res.status(404).json({ message: 'Taller no encontrado' });
    return;
  }
  res.status(200).send({ message: 'Taller eliminado correctamente' });
};
export const talleresController = {
  getTalleres,
  getTaller,
  createTaller,
  updateTaller,
  deleteTaller,
};
