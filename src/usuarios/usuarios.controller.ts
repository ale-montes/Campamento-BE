import { Request, Response } from 'express';
import { Usuario } from './usuarios.entity.js';
import { UsuarioRepository } from './usuarios.repository.js';
import { sanitizeUser } from './usuarios.utils.js';
import crypto from 'crypto';

const repo = new UsuarioRepository();

const getUsuarios = (req: Request, res: Response) => {
  const usuarios = repo.findAll() ?? [];
  const usuariosSanitizados = usuarios.map(sanitizeUser);
  res.json(usuariosSanitizados);
};

const getUsuario = (req: Request, res: Response) => {
  const id = req.params.id;
  const usuario = repo.findOne({ id });
  if (!usuario) {
    res.status(404).json({ message: 'No encontrado' });
    return;
  }
  res.json(sanitizeUser(usuario));
};

const createUsuario = (req: Request, res: Response) => {
  const data = req.body.sanitizedInput;
  const usuario = new Usuario(
    crypto.randomUUID(),
    data.nombre,
    data.apellido,
    data.email,
    data.nick,
    data.contrasena,
    data.fechaNac,
    data.direccion,
    data.alergia,
    data.grupoSanguineo,
    data.rh,
    'campista',
  );
  repo.add(usuario);
  res.status(201).send({ message: 'User Created', data: sanitizeUser(usuario) });
};

const updateUsuario = (req: Request, res: Response) => {
  req.body.sanitizedInput.idUsuario = req.params.id;
  const usuario = repo.update(req.body.sanitizedInput);
  if (!usuario) {
    res.status(404).send({ error: 'User not found' });
    return;
  }
  res.status(200).send({ message: 'User updated', data: sanitizeUser(usuario) });
};

const deleteUsuario = (req: Request, res: Response) => {
  const id = req.params.id;
  const usuario = repo.delete({ id });
  if (!usuario) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(200).send({ message: 'Character deleted successfully' });
};

export const usuariosController = {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
