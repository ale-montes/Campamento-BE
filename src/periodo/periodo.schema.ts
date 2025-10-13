import { z } from 'zod';

const dateField = z.preprocess((arg) => {
  if (typeof arg === 'string' || arg instanceof Date) {
    const date = new Date(arg);
    if (!isNaN(date.getTime())) return date;
  }
  return undefined;
}, z.date());

export const periodoSchema = z.object({
  nombre: z.string().min(2).max(100),
  descripcion: z.string().min(0).max(500).default(''),
  fechaInicioPer: dateField,
  fechaFinPer: dateField,
  fechaInicioInsc: dateField,
  fechaFinInsc: dateField,
  estado: z.enum(['en curso', 'cerrado', 'abierto', 'finalizado']).optional().default('cerrado'),
});

export type PeriodoInput = z.infer<typeof periodoSchema>;

export const periodoUpdateSchema = periodoSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'Debes enviar al menos un campo para actualizar',
});
