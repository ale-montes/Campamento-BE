import { z } from 'zod';
import { Dia } from '../talleres/talleres.entity.js';

export const tallerSchema = z.object({
  titulo: z.string().min(2).max(100),
  descripcion: z.string().min(10).max(500),
  dia: z.nativeEnum(Dia),
  hora: z.string().regex(/^\d{2}:\d{2}$/),
  lugar: z.string().min(2).max(100),
  instructor: z.string().min(2).max(100),
});

export const tallerUpdateSchema = tallerSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });
