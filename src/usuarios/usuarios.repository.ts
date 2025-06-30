import { Usuario } from './usuarios.entity.js';
import { Repository } from '../shared/repository.js';

const usuarios = [
  new Usuario(
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad',
    'Alejandro',
    'Gomez',
    'ale_gomez@gmail.com',
    'alegomez',
    'pass123',
    '1999-02-03',
    'Mendoza 256',
    'Mani',
    'O',
    '-',
    'admin',
  ),
];

export class UsuarioRepository implements Repository<Usuario> {
  public findAll(): Usuario[] | undefined {
    return usuarios;
  }

  public findOne(item: { id: string }): Usuario | undefined {
    return usuarios.find((usuario) => usuario.idUsuario.toString() === item.id);
  }

  public add(item: Usuario): Usuario | undefined {
    usuarios.push(item);
    return item;
  }

  public update(item: Usuario): Usuario | undefined {
    const index = usuarios.findIndex((usuario) => usuario.idUsuario === item.idUsuario);
    if (index !== -1) {
      usuarios[index] = { ...usuarios[index], ...item };
    }
    return usuarios[index];
  }

  public delete(item: { id: string }): Usuario | undefined {
    const index = usuarios.findIndex((usuario) => usuario.idUsuario.toString() === item.id);
    if (index !== -1) {
      const eliminado = usuarios[index];
      usuarios.splice(index, 1);
      return eliminado;
    }
    return undefined;
  }
}
