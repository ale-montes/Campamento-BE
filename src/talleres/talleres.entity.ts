import crypto from 'crypto';
export class Taller {
  constructor(
    public idTaller = crypto.randomUUID(),
    public titulo: string,
    public descripcion: string,
    public fechaHora: Date,
    public lugar: string,
    public instructor: string,
  ) {}
}
