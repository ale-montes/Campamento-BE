import { z } from 'zod';
import { grupoSanguineoEnum } from '../usuarios/campista.schema.js'; // reutilizamos el enum

export const adminSchema = z.object({
  nombre: z.string().min(2).max(100),
  apellido: z.string().min(2).max(100),
  email: z.string().email(),
  telefono: z.string().min(6),
  contrasena: z.string().min(6),
  activo: z.boolean().optional().default(true),
  isVerified: z.boolean().optional().default(false),
  fechaNac: z.date().optional(),
  pais: z.string().min(2).max(50).optional(),
  ciudad: z.string().min(2).max(50).optional(),
  direccion: z.string().min(2).max(100).optional(),
  alergias: z.string().min(2).max(100).optional(),
  grupoSanguineo: grupoSanguineoEnum.optional(),
  telefonoEmergencia: z.string().min(6).max(15).optional(),
});

export const adminUpdateSchema = adminSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'Debes enviar al menos un campo para actualizar',
});

export type AdminInput = z.infer<typeof adminSchema>;
export type AdminUpdateInput = z.infer<typeof adminUpdateSchema>;
