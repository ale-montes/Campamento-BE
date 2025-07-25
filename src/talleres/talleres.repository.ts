import { Taller } from './talleres.entity.js';

const Talleres = [
  new Taller(
    'a04b91bc-3769-4221-beb1-d7a3aeba7dad',
    'Taller de Griego Antiguo',
    'Taller para poder leer mejor y evitar la dislexia',
    new Date('2025-08-01T14:00:00'),
    'Casa grande',
    'Annabeth Chase',
  ),
  new Taller(
    'b04b91bc-3769-4221-beb1-d7a3aeba7dad',
    'Taller de Natacion',
    'Taller para aprender a nadar y mejorar técnicas',
    new Date('2025-08-01T15:00:00'),
    'Lago de las canoas',
    'Percy Jackson',
  ),
  new Taller(
    'c04b91bc-3769-4221-beb1-d7a3aeba7dad',
    'Taller de tiro con Arco',
    'Taller para aprender a disparar con arco y mejorar técnicas de puntería',
    new Date('2025-08-01T16:00:00'),
    'Campo de tiro',
    'Will Solace',
  ),
];

export class TallerRepository {
  public findAll(): Taller[] | undefined {
    return Talleres;
  }

  public findOne(item: { id: string }): Taller | undefined {
    return Talleres.find((taller) => taller.idTaller === item.id);
  }

  public add(item: Taller): Taller | undefined {
    Talleres.push(item);
    return item;
  }

  public update(item: Taller): Taller | undefined {
    const index = Talleres.findIndex((taller) => taller.idTaller === item.idTaller);
    if (index !== -1) {
      Talleres[index] = { ...Talleres[index], ...item };
    }
    return Talleres[index];
  }

  public delete(item: { id: string }): Taller | undefined {
    const index = Talleres.findIndex((taller) => taller.idTaller === item.id);
    if (index !== -1) {
      const eliminado = Talleres[index];
      Talleres.splice(index, 1);
      return eliminado;
    }
    return undefined;
  }
}
