import { z } from 'zod';

/* -------------------------- INPUT SCHEMAS -------------------------- */

//Input Admin
export const cabaniaInputSchemaAdmin = z.object({
  nombre: z.string().min(2).max(100),
  capacidad: z.number().int().min(1).max(100),
  descripcion: z.string().min(10).max(500),
  ubicacion: z.string().min(2).max(100),
  cabinStatus: z.enum(['Activo', 'Inactivo']).default('Activo'),
  deidad: z.number().int().positive(), // id de deidad
});

//Input Campista
export const cabaniaInputSchemaCampista = z.object({});

//Input Instructor
export const cabaniaInputSchemaInstructor = z.object({});

/* -------------------------- INPUT UPDATE SCHEMAS -------------------------- */

// Update Admin
export const cabaniaInputUpdateSchemaAdmin = cabaniaInputSchemaAdmin
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });

// Update Campista
export const cabaniaInputUpdateSchemaCampista = z.object({}).refine((data) => Object.keys(data).length > 0, {
  message: 'Debes enviar al menos un campo para actualizar',
});

// Update Instructor
export const cabaniaInputUpdateSchemaInstructor = z.object({}).refine((data) => Object.keys(data).length > 0, {
  message: 'Debes enviar al menos un campo para actualizar',
});

/* -------------------------- OUTPUT SCHEMAS -------------------------- */

//Output Base
const cabaniaBaseOutput = {
  id: z.number(),
  nombre: z.string(),
  capacidad: z.number(),
  descripcion: z.string(),
  ubicacion: z.string(),
  cabinStatus: z.enum(['Activo', 'Inactivo']),
};

//Output Admin
export const cabaniaOutputSchemaAdmin = z
  .object({
    ...cabaniaBaseOutput,
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    deidad: z.object({
      id: z.number(),
      nombre: z.string(),
      descripcion: z.string(),
      lema: z.string(),
      simbolo: z.string(),
      createdAt: z.string().or(z.date()).optional(),
      updatedAt: z.string().or(z.date()).optional(),
    }),
  })
  .strip();

//Output Campista
export const cabaniaOutputSchemaCampista = z
  .object({
    ...cabaniaBaseOutput,
    deidad: z.object({
      id: z.number(),
      nombre: z.string(),
      descripcion: z.string(),
      lema: z.string(),
      simbolo: z.string(),
    }),
  })
  .strip();

//Output Instructor
export const cabaniaOutputSchemaInstructor = z
  .object({
    ...cabaniaBaseOutput,
    deidad: z.object({
      id: z.number(),
      nombre: z.string(),
      descripcion: z.string(),
      lema: z.string(),
      simbolo: z.string(),
    }),
  })
  .strip();

/* -------------------------- TYPES -------------------------- */

export type CabaniaInputAdmin = z.infer<typeof cabaniaInputSchemaAdmin>;
export type CabaniaUpdateInputAdmin = z.infer<typeof cabaniaInputUpdateSchemaAdmin>;
export type CabaniaOutputAdmin = z.infer<typeof cabaniaOutputSchemaAdmin>;

export type CabaniaInputCampista = z.infer<typeof cabaniaInputSchemaCampista>;
export type CabaniaUpdateInputCampista = z.infer<typeof cabaniaInputUpdateSchemaCampista>;
export type CabaniaOutputCampista = z.infer<typeof cabaniaOutputSchemaCampista>;

export type CabaniaInputInstructor = z.infer<typeof cabaniaInputSchemaInstructor>;
export type CabaniaUpdateInputInstructor = z.infer<typeof cabaniaInputUpdateSchemaInstructor>;
export type CabaniaOutputInstructor = z.infer<typeof cabaniaOutputSchemaInstructor>;
