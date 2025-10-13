import { CampistaService } from '../usuarios/campista.service.js';
import { UsuariosService, UserEntityOmitPass, UserEntity } from '../usuarios/usuarios.service.js';
import { sendVerificationEmail } from './email.service.js';
import { generateJwtToken } from '../shared/jwtUtils.js';
import { CampistaInput } from '../usuarios/campista.schema.js';
import bcrypt from 'bcryptjs';
import { EntityManager } from '@mikro-orm/core';

export class AuthService {
  private campistaService = new CampistaService();
  private usuarioService = new UsuariosService();

  async register(data: CampistaInput, em: EntityManager) {
    const campista = await this.campistaService.add('campista', data, em);
    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${campista.verificationToken}`;
    await sendVerificationEmail(campista.email, verificationUrl);
    return campista;
  }

  async verifyEmail(token: string, em: EntityManager) {
    const user = await this.campistaService.findByVerificationToken(token, em);
    console.log(user);
    if (!user) throw new Error('Token inválido o expirado');
    const id = Number(user.id);
    const userUpdate = await this.campistaService.update(id, { isVerified: true, verificationToken: null }, em);

    if (!userUpdate) throw new Error('Error al verificar token');
    return { message: 'Email verificado con éxito.' };
  }

  async login(email: string, contrasena: string, em: EntityManager) {
    const result = await this.usuarioService.findByEmail(email, em);
    if (!result) throw new Error('Usuario no encontrado');

    const { user, role } = result;
    if (!user.isVerified) throw new Error('Email no verificado');

    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) throw new Error('Credenciales inválidas');
    const id = Number(user.id);
    const token = generateJwtToken({ id, email: user.email, role });
    return { token, role, user };
  }

  async resendVerification(email: string, em: EntityManager) {
    const user = await this.campistaService.findByEmail(email, em);
    if (!user) throw new Error('Usuario no encontrado');
    if (user.isVerified) throw new Error('El usuario ya está verificado');
    const token = user.verificationToken;
    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;
    const result = await sendVerificationEmail(user.email, verificationUrl);
    if (!result) throw new Error('Problemas al enviar el Correo');
    return { message: 'Correo de verificación reenviado.' };
  }

  async getProfile(user: { id: number; role: string }, em: EntityManager): Promise<UserEntityOmitPass | null> {
    const profile = await this.usuarioService.findByIdAndRole(user.id, user.role, em);
    if (!profile) throw new Error('Usuario no encontrado');
    return profile;
  }
  async updateProfile(
    user: { id: number; role: string },
    data: Partial<UserEntity>,
    em: EntityManager,
  ): Promise<UserEntityOmitPass> {
    const updated = await this.usuarioService.updateByIdAndRole(user.id, user.role, data, em);
    return updated;
  }
}
