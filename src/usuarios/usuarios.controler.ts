import { Campista } from './campista.entity.js';
import { Instructor } from './instructor.entity.js';
import { Admin } from './admin.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

export async function findByMail(email: string) {
  let user: Campista | Instructor | Admin | null = await em.findOne(Campista, { email });
  let role: string | null = null;

  if (user) {
    role = 'campista';
  } else {
    user = await em.findOne(Instructor, { email });
    if (user) {
      role = 'instructor';
    } else {
      user = await em.findOne(Admin, { email });
      if (user) {
        role = 'admin';
      }
    }
  }

  if (!user) return null;

  return { user, role };
}
