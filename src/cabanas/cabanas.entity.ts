import crypto from 'crypto';
export class Cabana {
  constructor(
    public idCabanas = crypto.randomUUID(),
    public nombreCabana: string,
    public dios: string,
    public cantCampistas: number,
    public campistas: string[],
  ) {}
}
