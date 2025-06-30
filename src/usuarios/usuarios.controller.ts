import { Request, Response, NextFunction } from 'express';
import { Usuario } from './usuarios.entity.js';
import { UsuarioRepository } from './usuarios.repository.js';
import crypto from 'crypto';

const repo = new UsuarioRepository();

export function sanitizeUsuarioInput(req: Request, _resp: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    nick: req.body.nick,
    contrasena: req.body.contrasena,
    fechaNac: req.body.fechaNac,
    direccion: req.body.direccion,
    alergia: req.body.alergia,
    grupoSanguineo: req.body.grupoSanguineo,
    rh: req.body.rh,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

export const usuariosController = {
  getUsuarios: (req: Request, res: Response) => {
    res.json(repo.findAll());
  },

  getUsuario: (req: Request, res: Response) => {
    const id = req.params.id;
    const usuario = repo.findOne({ id });
    if (!usuario) {
      res.status(404).json({ message: 'No encontrado' });
      return;
    }
    res.json(usuario);
  },

  createUsuario: (req: Request, res: Response) => {
    const usuario = new Usuario(
      crypto.randomUUID(),
      req.body.nombre,
      req.body.apellido,
      req.body.email,
      req.body.nick,
      req.body.contrasena,
      req.body.fechaNac,
      req.body.direccion,
      req.body.alergia,
      req.body.grupoSanguineo,
      req.body.rh,
      'campista',
    );
    repo.add(usuario);
    res.status(201).send({ message: 'User Created', data: usuario });
  },

  updateUsuario: (req: Request, res: Response) => {
    req.body.sanitizedInput.idUsuario = req.params.id;
    const usuario = repo.update(req.body.sanitizedInput);
    if (!usuario) {
      res.status(404).send({ error: 'User not found' });
      return;
    }
    res.status(200).send({ message: 'User updated', data: usuario });
  },

  deleteUsuario: (req: Request, res: Response) => {
    const id = req.params.id;
    const usuario = repo.delete({ id });
    if (!usuario) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).send({ message: 'Character deleted successfully' });
  },
};
