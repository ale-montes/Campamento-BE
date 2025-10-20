import { EntityManager, LockMode } from '@mikro-orm/core';
import { Admin } from './admin.entity.js';
import { AdminInput } from './admin.schema.js';
import { NotFoundError } from '../shared/errors/http-error.js';
import bcrypt from 'bcryptjs';
import { validateId } from '../shared/validateParam.js';
import { hashPassword } from '../shared/password.utils.js';
import { Instructor } from './instructor.entity.js';

export class AdminService {
  async findAll(em: EntityManager): Promise<Omit<Admin, 'contrasena'>[]> {
    const admins = await em.find(Admin, {});
    return admins.map(({ contrasena: _omit, ...rest }) => rest);
  }

  async findOne(id: number, em: EntityManager): Promise<Omit<Admin, 'contrasena'>> {
    validateId(id);
    const admin = await em.findOne(Admin, { id });
    if (!admin) throw new NotFoundError('Admin');
    const { contrasena: _omit, ...sanitized } = admin;
    return sanitized;
  }

  async findByEmail(email: string, em: EntityManager): Promise<Admin | null> {
    return em.findOne(Admin, { email });
  }

  async findByResetToken(token: string, em: EntityManager) {
    return await em.findOne(Instructor, { resetPasswordToken: token });
  }

  async updateVerific(token: string, em: EntityManager): Promise<Admin | null> {
    return em.findOne(Admin, { verificationToken: token });
  }

  async updatePassword(id: number, newPassword: string, em: EntityManager) {
    const admin = await em.findOne(Admin, { id });
    if (!admin) throw new Error('Admin no encontrado');
    admin.contrasena = await hashPassword(newPassword);
    await em.flush();
  }

  async add(data: AdminInput, em: EntityManager): Promise<Omit<Admin, 'contrasena'>> {
    const hashedPassword = await bcrypt.hash(data.contrasena, 10);
    const admin = em.create(Admin, {
      ...data,
      contrasena: hashedPassword,
      isVerified: true,
    });
    await em.persistAndFlush(admin);
    const { contrasena: _omit, ...sanitized } = admin;
    return sanitized;
  }

  async update(id: number, data: Partial<Admin>, em: EntityManager): Promise<Omit<Admin, 'contrasena'>> {
    validateId(id);
    const updated = await em.transactional(async (tEm) => {
      const admin = await tEm.findOne(Admin, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
      if (!admin) throw new NotFoundError(`Admin ${id} no encontrado`);
      if (data.contrasena) {
        data.contrasena = await bcrypt.hash(data.contrasena, 10);
      }
      tEm.assign(admin, data);
      await tEm.flush();
      const { contrasena: _omit, ...sanitized } = admin;
      return sanitized;
    });
    return updated;
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    validateId(id);
    const admin = await em.findOne(Admin, { id });
    if (!admin) throw new NotFoundError(`Admin ${id} no encontrado`);
    await em.removeAndFlush(admin);
  }
}
