import { z } from 'zod';

export const instructorSchema = z.object({
  nombre: z.string().min(2).max(100),
  apellido: z.string().min(2).max(100),
  email: z.string().email(),
  telefono: z.string().min(6),
  contrasena: z.string().min(6),
  especialidad: z.string().min(2).max(100),
  nivel: z.number().int().min(0).max(10),
  activo: z.boolean().optional().default(true),
  isVerified: z.boolean().optional().default(false),
});

export const instructorUpdateSchema = instructorSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'Debes enviar al menos un campo para actualizar',
});

export type InstructorInput = z.infer<typeof instructorSchema>;
export type InstructorUdateInput = z.infer<typeof instructorUpdateSchema>;
