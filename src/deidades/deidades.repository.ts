import { Repository } from '../shared/repository.js';
import { Deidad } from './deidades.entity.js';

const deidades = [
  new Deidad(
    '2b3c4d5e-6789-01ab-cdef-2345678901bc',
    'Poseidón',
    'Dios del mar y los terremotos',
    'Agua',
  ),
];

export class DeidadesRepository implements Repository<Deidad> {
  public findAll(): Deidad[] | undefined {
    return deidades;
  }

  public findOne(item: { id: string }): Deidad | undefined {
    return deidades.find((deidad) => deidad.id === item.id);
  }

  public add(item: Deidad): Deidad | undefined {
    deidades.push(item);
    return item;
  }

  public update(item: Deidad): Deidad | undefined {
    const index = deidades.findIndex((deidad) => deidad.id === item.id);
    if (index !== -1) {
      deidades[index] = { ...deidades[index], ...item };
    }
    return deidades[index];
  }

  public delete(item: { id: string }): Deidad | undefined {
    const index = deidades.findIndex((deidad) => deidad.id === item.id);

    if (index !== -1) {
      const deletedDeidad = deidades[index];
      deidades.splice(index, 1);
      return deletedDeidad;
    }
    return undefined;
  }
}
