import { Request, Response } from 'express';
import { Cabana } from './cabanas.entity.js';
import { CabanaRepository } from './cabanas.repository.js';
import crypto from 'crypto';

const repoCabana = new CabanaRepository();

const getCabanas = (req: Request, res: Response) => {
  res.json(repoCabana.findAll());
};

const getCabana = (req: Request, res: Response) => {
  const id = req.params.id;
  const cabana = repoCabana.findOne({ id });
  if (!cabana) {
    res.status(404).json({ message: 'Cabaña no encontrada' });
    return;
  }
  res.json(cabana);
};

const createCabana = (req: Request, res: Response) => {
  const data = req.body.sanitizedInput;
  const cabana = new Cabana(
    crypto.randomUUID(),
    data.nombreCabana,
    data.dios,
    data.campistas.length,
    data.campistas,
  );
  repoCabana.add(cabana);
  res.status(201).send({ message: 'Cabaña creada', data: cabana });
};

const updateCabana = (req: Request, res: Response) => {
  const input = req.body.sanitizedInput;
  input.idCabanas = req.params.id;
  if (input.campistas) {
    input.cantCampistas = input.campistas.length;
  }
  const cabana = repoCabana.update(input);
  if (!cabana) {
    res.status(404).send({ error: 'Cabaña no encontrada' });
    return;
  }
  res.status(200).send({ message: 'Cabaña actualizada', data: cabana });
};

const deleteCabana = (req: Request, res: Response) => {
  const id = req.params.id;
  const cabana = repoCabana.delete({ id });
  if (!cabana) {
    res.status(404).json({ message: 'Cabaña no encontrada' });
    return;
  }
  res.status(200).send({ message: 'Cabaña eliminada correctamente' });
};
export const cabanasController = {
  getCabanas,
  getCabana,
  createCabana,
  updateCabana,
  deleteCabana,
};
