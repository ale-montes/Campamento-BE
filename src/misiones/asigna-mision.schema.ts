import { z } from 'zod';

/* -------------------------- INPUT SCHEMAS -------------------------- */

// Input Instructor
export const asignaMisionInputSchemaAdmin = z.object({
  campista: z.number().int().positive(),
  mision: z.number().int().positive(),
  estado: z.enum(['en progreso', 'completada', 'fallida', 'rechazada', 'asignada']).default('asignada'),
  periodo: z.number().int().positive(),
});

// Input Admin (igual que Instructor pero admin puede enviar todo)
export const asignaMisionInputSchemaInstructor = asignaMisionInputSchemaAdmin;

/* -------------------------- INPUT UPDATE SCHEMAS -------------------------- */

// Update Instructor
export const asignaMisionInputUpdateSchemaInstructor = asignaMisionInputSchemaInstructor
  .partial()
  .refine((data) => Object.keys(data).length > 0, { message: 'Debes enviar al menos un campo para actualizar' });

// Update Admin (admin puede actualizar cualquier campo)
export const asignaMisionInputUpdateSchemaAdmin = asignaMisionInputSchemaAdmin
  .partial()
  .refine((data) => Object.keys(data).length > 0, { message: 'Debes enviar al menos un campo para actualizar' });

/* -------------------------- OUTPUT SCHEMAS -------------------------- */

// Base output
const asignaMisionBaseOutput = {
  id: z.number(),
  estado: z.enum(['en progreso', 'completada', 'fallida', 'rechazada', 'asignada']),
};

// Output Instructor
export const asignaMisionOutputSchemaAdmin = z
  .object({
    ...asignaMisionBaseOutput,
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    campista: z.object({ id: z.number(), nombre: z.string(), apellido: z.string() }),
    mision: z.object({
      id: z.number(),
      titulo: z.string(),
      descripcion: z.string(),
      pista: z.string().nullable().optional(),
      recompensa: z.string().nullable().optional(),
    }),
    periodo: z.object({ id: z.number(), nombre: z.string() }),
  })
  .strip();

// Output Admin (ve todo)
export const asignaMisionOutputSchemaInstructor = asignaMisionOutputSchemaAdmin;

export const asignaMisionOutputSchemaCampista = z
  .object({
    ...asignaMisionBaseOutput,
    mision: z.object({
      id: z.number(),
      titulo: z.string(),
      descripcion: z.string(),
      pista: z.string().nullable().optional(),
      recompensa: z.string().nullable().optional(),
    }),
    periodo: z.object({ id: z.number(), nombre: z.string() }),
  })
  .strip();

/* -------------------------- TYPES -------------------------- */

export type AsignaMisionInputInstructor = z.infer<typeof asignaMisionInputSchemaInstructor>;
export type AsignaMisionUpdateInputInstructor = z.infer<typeof asignaMisionInputUpdateSchemaInstructor>;
export type AsignaMisionOutputInstructor = z.infer<typeof asignaMisionOutputSchemaInstructor>;

export type AsignaMisionInputAdmin = z.infer<typeof asignaMisionInputSchemaAdmin>;
export type AsignaMisionUpdateInputAdmin = z.infer<typeof asignaMisionInputUpdateSchemaAdmin>;
export type AsignaMisionOutputAdmin = z.infer<typeof asignaMisionOutputSchemaAdmin>;
