import crypto from 'crypto';
export class Taller {
  constructor(
    public idTaller = crypto.randomUUID(),
    public titulo: string,
    public descripcion: string,
    public dia: Dia,
    public hora: string,
    public lugar: string,
    public instructor: string,
  ) {}
}

export enum Dia {
  Lunes = 'Lunes',
  Martes = 'Martes',
  Miercoles = 'Miercoles',
  Jueves = 'Jueves',
  Viernes = 'Viernes',
  Sabado = 'Sabado',
  Domingo = 'Domingo',
}
