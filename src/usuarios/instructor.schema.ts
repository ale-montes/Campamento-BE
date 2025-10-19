import { z } from 'zod';
import { grupoSanguineoEnum } from '../usuarios/campista.schema.js';

export const instructorSchema = z.object({
  nombre: z.string().min(2).max(100),
  apellido: z.string().min(2).max(100),
  email: z.string().email(),
  telefono: z.string().min(6),
  contrasena: z.string().min(6),
  fechaNac: z.date().optional(),
  pais: z.string().min(2).max(50).optional(),
  ciudad: z.string().min(2).max(50).optional(),
  direccion: z.string().min(2).max(100).optional(),
  alergias: z.string().min(2).max(100).optional(),
  grupoSanguineo: grupoSanguineoEnum.optional(),
  telefonoEmergencia: z.string().min(6).max(15).optional(),
  especialidad: z.string().min(2).max(100),
  nivel: z.number().int().min(0).max(1000),
  activo: z.boolean().optional().default(true),
  isVerified: z.boolean().optional().default(true),
});

export const instructorUpdateSchema = instructorSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'Debes enviar al menos un campo para actualizar',
});

export type InstructorInput = z.infer<typeof instructorSchema>;
export type InstructorUdateInput = z.infer<typeof instructorUpdateSchema>;
