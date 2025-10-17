import { z } from 'zod';

/* -------------------------- INPUT SCHEMAS -------------------------- */
export const misionInputSchemaAdmin = z.object({
  titulo: z.string().min(2).max(200),
  descripcion: z.string().min(5).max(1000),
  recompensa: z.string().optional(),
  pista: z.string().optional(),
});

export const misionInputSchemaCampista = z.object({});
export const misionInputSchemaInstructor = z.object({});

/* -------------------------- UPDATE SCHEMAS -------------------------- */
export const misionUpdateSchemaAdmin = misionInputSchemaAdmin
  .partial()
  .refine((data) => Object.keys(data).length > 0, { message: 'Debes enviar al menos un campo' });

export const misionUpdateSchemaCampista = z.object({}).refine((data) => Object.keys(data).length > 0, {
  message: 'Debes enviar al menos un campo',
});

export const misionUpdateSchemaInstructor = z.object({}).refine((data) => Object.keys(data).length > 0, {
  message: 'Debes enviar al menos un campo',
});

/* -------------------------- OUTPUT SCHEMA -------------------------- */
export const misionOutputSchemaAdmin = z.object({
  id: z.number(),
  titulo: z.string(),
  descripcion: z.string(),
  recompensa: z.string().optional(),
  pista: z.string().optional(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export const misionOutputSchemaCampista = misionOutputSchemaAdmin.omit({ createdAt: true, updatedAt: true });
export const misionOutputSchemaInstructor = misionOutputSchemaCampista;

/* -------------------------- TYPES -------------------------- */
export type MisionInputAdmin = z.infer<typeof misionInputSchemaAdmin>;
export type MisionUpdateAdmin = z.infer<typeof misionUpdateSchemaAdmin>;
export type MisionOutputAdmin = z.infer<typeof misionOutputSchemaAdmin>;
