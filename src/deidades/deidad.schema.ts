import { z } from 'zod';

/* -------------------------- INPUT SCHEMAS -------------------------- */

// Input Admin
export const deidadInputSchemaAdmin = z.object({
  nombre: z.string().min(2).max(100),
  descripcion: z.string().min(10).max(500),
  lema: z.string().min(2).max(200),
  simbolo: z.string().min(2).max(200),
});

// Input Campista
export const deidadInputSchemaCampista = z.object({});

// Input Instructor
export const deidadInputSchemaInstructor = z.object({});

/* -------------------------- INPUT UPDATE SCHEMAS -------------------------- */

// Update Admin
export const deidadInputUpdateSchemaAdmin = deidadInputSchemaAdmin
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });

// Update Campista
export const deidadInputUpdateSchemaCampista = z
  .object({})
  .refine((data) => Object.keys(data).length > 0, { message: 'Debes enviar al menos un campo para actualizar' });

// Update Instructor
export const deidadInputUpdateSchemaInstructor = z
  .object({})
  .refine((data) => Object.keys(data).length > 0, { message: 'Debes enviar al menos un campo para actualizar' });

/* -------------------------- OUTPUT SCHEMAS -------------------------- */

// Output Base
const deidadBaseOutput = {
  id: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
  lema: z.string(),
  simbolo: z.string(),
};

// Output Admin
export const deidadOutputSchemaAdmin = z
  .object({
    ...deidadBaseOutput,
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
  })
  .strip();

// Output Campista
export const deidadOutputSchemaCampista = z
  .object({
    ...deidadBaseOutput,
  })
  .strip();

// Output Instructor
export const deidadOutputSchemaInstructor = z
  .object({
    ...deidadBaseOutput,
  })
  .strip();

/* -------------------------- TYPES -------------------------- */

export type DeidadInputAdmin = z.infer<typeof deidadInputSchemaAdmin>;
export type DeidadUpdateInputAdmin = z.infer<typeof deidadInputUpdateSchemaAdmin>;
export type DeidadOutputAdmin = z.infer<typeof deidadOutputSchemaAdmin>;

export type DeidadInputCampista = z.infer<typeof deidadInputSchemaCampista>;
export type DeidadUpdateInputCampista = z.infer<typeof deidadInputUpdateSchemaCampista>;
export type DeidadOutputCampista = z.infer<typeof deidadOutputSchemaCampista>;

export type DeidadInputInstructor = z.infer<typeof deidadInputSchemaInstructor>;
export type DeidadUpdateInputInstructor = z.infer<typeof deidadInputUpdateSchemaInstructor>;
export type DeidadOutputInstructor = z.infer<typeof deidadOutputSchemaInstructor>;
