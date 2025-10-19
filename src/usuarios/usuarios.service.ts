import { CampistaService } from './campista.service.js';
import { InstructorService } from './instructor.service.js';
import { AdminService } from './admin.service.js';
import type { Campista } from './campista.entity.js';
import type { Instructor } from './instructor.entity.js';
import type { Admin } from './admin.entity.js';
import { EntityManager } from '@mikro-orm/core';

export type UserEntity = Campista | Instructor | Admin;
export type UserEntityOmitPass =
  | Omit<Campista, 'contrasena'>
  | Omit<Instructor, 'contrasena'>
  | Omit<Admin, 'contrasena'>;
export class UsuariosService {
  private campistaService = new CampistaService();
  private instructorService = new InstructorService();
  private adminService = new AdminService();

  async findByEmail(email: string, em: EntityManager): Promise<{ user: UserEntity; role: string } | null> {
    const campista = await this.campistaService.findByEmail(email, em);
    if (campista) return { user: campista, role: 'campista' };

    const instructor = await this.instructorService.findByEmail(email, em);
    if (instructor) return { user: instructor, role: 'instructor' };

    const admin = await this.adminService.findByEmail(email, em);
    if (admin) return { user: admin, role: 'admin' };

    return null;
  }
  async findByIdAndRole(id: number, role: string, em: EntityManager): Promise<UserEntityOmitPass | null> {
    switch (role) {
      case 'campista':
        return await this.campistaService.findOne(id, em);
      case 'instructor':
        return await this.instructorService.findOne(id, em);
      case 'admin':
        return await this.adminService.findOne(id, em);
      default:
        return null;
    }
  }

  async updateByIdAndRole(
    id: number,
    role: string,
    data: Partial<UserEntity>,
    em: EntityManager,
  ): Promise<UserEntityOmitPass> {
    switch (role) {
      case 'campista':
        return await this.campistaService.update(id, data, em);
      case 'instructor':
        return await this.instructorService.update(id, data, em);
      case 'admin':
        return await this.adminService.update(id, data, em);
      default:
        throw new Error('Rol no reconocido');
    }
  }
}
