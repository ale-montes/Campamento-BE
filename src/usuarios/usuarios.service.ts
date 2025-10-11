import { CampistaService } from './campista.service.js';
import { InstructorService } from './instructor.service.js';
import { AdminService } from './admin.service.js';
import type { Campista } from './campista.entity.js';
import type { Instructor } from './instructor.entity.js';
import type { Admin } from './admin.entity.js';
import { EntityManager } from '@mikro-orm/core';

type UserEntity = Campista | Instructor | Admin;
type UserRole = 'campista' | 'instructor' | 'admin';

export class UsuariosService {
  private campistaService = new CampistaService();
  private instructorService = new InstructorService();
  private adminService = new AdminService();

  async findByEmail(
    email: string,
    em: EntityManager,
  ): Promise<{ user: UserEntity; role: UserRole } | null> {
    const campista = await this.campistaService.findByEmail(email, em);
    if (campista) return { user: campista, role: 'campista' };

    const instructor = await this.instructorService.findByEmail(email, em);
    if (instructor) return { user: instructor, role: 'instructor' };

    const admin = await this.adminService.findByEmail(email, em);
    if (admin) return { user: admin, role: 'admin' };

    return null;
  }
}
