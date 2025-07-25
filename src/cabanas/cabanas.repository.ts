import { Cabana } from './cabanas.entity.js';

const cabanas = [
  new Cabana('a04b91bc-3769-4221-beb1-d7a3aeba7dad', 'Cabaña 1', 'Zeus', 2, [
    'Jason Grace',
    'Thalia Grace',
  ]),
  new Cabana('a05b91bc-3769-4221-beb1-d7a3aeba7dad', 'Cabaña 2', 'Hera', 0, ['Ninguno']),
  new Cabana('a06b91bc-3769-4221-beb1-d7a3aeba7dad', 'Cabaña 3', 'Poseidon', 1, ['Percy Jackson']),
];

export class CabanaRepository {
  public findAll(): Cabana[] | undefined {
    return cabanas;
  }

  public findOne(item: { id: string }): Cabana | undefined {
    return cabanas.find((cabana) => cabana.idCabanas === item.id);
  }

  public add(item: Cabana): Cabana | undefined {
    cabanas.push(item);
    return item;
  }

  public update(item: Cabana): Cabana | undefined {
    const index = cabanas.findIndex((cabana) => cabana.idCabanas === item.idCabanas);
    if (index !== -1) {
      cabanas[index] = { ...cabanas[index], ...item };
    }
    return cabanas[index];
  }

  public delete(item: { id: string }): Cabana | undefined {
    const index = cabanas.findIndex((cabana) => cabana.idCabanas === item.id);
    if (index !== -1) {
      const eliminado = cabanas[index];
      cabanas.splice(index, 1);
      return eliminado;
    }
    return undefined;
  }
}
