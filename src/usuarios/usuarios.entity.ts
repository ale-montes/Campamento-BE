import crypto from 'crypto';
export type Rol = 'campista' | 'instructor' | 'admin';

export class Usuario {
  constructor(
    public idUsuario = crypto.randomUUID(),
    public nombre: string,
    public apellido: string,
    public email: string,
    public nick: string,
    public contrasena: string,
    public fechaNac: string,
    public direccion: string,
    public alergia: string,
    public grupoSanguineo: string,
    public rh: string,
    public rol: Rol,
  ) {}
}
