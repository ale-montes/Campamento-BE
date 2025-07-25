import { Usuario } from './usuarios.entity';
export const sanitizeUser = (user: Usuario) => ({
  id: user.idUsuario,
  nombre: user.nombre,
  apellido: user.apellido,
  email: user.email,
  nick: user.nick,
  fechaNac: user.fechaNac,
  direccion: user.direccion,
  alergia: user.alergia,
  grupoSanguineo: user.grupoSanguineo,
  rh: user.rh,
  rol: user.rol,
});
