import crypto from 'crypto';

export class Deidad {
  constructor(
    public id = crypto.randomUUID(),
    public nombre: string,
    public descripcion: string,
    public elemento: string,
  ) {}
}
