import { z } from 'zod';
import { id } from 'zod/v4/locales';
export const TallerSchema = z
  .object({
    id: z.number().int().positive().optional(),
    titulo: z.string().min(1).max(100),
    descripcion: z.string().min(1).max(500),
    fechaHora: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
    lugar: z.string().min(1).max(100),
    cupoMaximo: z.number().int().positive(),
    instructorId: z.number().int().positive(),
  })
  .partial();
