import { Request, Response } from 'express';
import { Deidad } from './deidades.entity.js';
import { DeidadesRepository } from './deidades.repository.js';

const repository = new DeidadesRepository();

function getDeidades(req: Request, res: Response) {
  const deidades = repository.findAll();
  res.json(deidades);
}

function getDeidad(req: Request, res: Response) {
  const id = req.params.id;
  const deidad = repository.findOne({ id });
  if (!deidad) {
    return res.status(404).json({ message: 'Deidad no encontrada' });
  }
  res.json(deidad);
}

function addDeidad(req: Request, res: Response) {
  const newDeidad = req.body.sanitizedInput;
  const deidad = new Deidad(
    crypto.randomUUID(),
    newDeidad.nombre,
    newDeidad.descripcion,
    newDeidad.elemento,
  );

  repository.add(deidad);
  res.status(201).send({ message: 'Deidad creada', data: deidad });
}

function updateDeidad(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const deidad = repository.update(req.body.sanitizedInput);
  if (!deidad) {
    return res.status(404).json({ message: 'Deidad no encontrada' });
  }
  res.status(200).send({ message: 'Deidad actualizada', data: deidad });
}

function deleteDeidad(req: Request, res: Response) {
  const id = req.params.id;
  const deidad = repository.delete({ id });
  if (!deidad) {
    return res.status(404).json({ message: 'Deidad no encontrada' });
  }
  res.status(200).send({ message: 'Deidad eliminada', data: deidad });
}

export const deidadesController = {
  getDeidades,
  getDeidad,
  addDeidad,
  updateDeidad,
  deleteDeidad,
};
