import { z } from 'zod';

/* -------------------------- INPUT SCHEMAS -------------------------- */

// Input Admin
export const hospedaInputSchemaAdmin = z.object({
  cabania: z.number().int().positive(), // id de cabania
  campista: z.number().int().positive(), // id de campista
  fechaInicio: z.string().or(z.date()).optional(),
  fechaFin: z.string().or(z.date()).optional(),
  estado: z.enum(['reservada', 'finalizada']).default('reservada'),
  periodo: z.number().int().positive(), // id de periodo
});

// Input Campista
export const hospedaInputSchemaCampista = z.object({
  cabania: z.number().int().positive(),
});

// Input Instructor
export const hospedaInputSchemaInstructor = z.object({});

/* -------------------------- INPUT UPDATE SCHEMAS -------------------------- */

// Update Admin
export const hospedaInputUpdateSchemaAdmin = hospedaInputSchemaAdmin
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });

// Update Campista
export const hospedaInputUpdateSchemaCampista = hospedaInputSchemaCampista
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });

// Update Instructor
export const hospedaInputUpdateSchemaInstructor = z.object({}).refine((data) => Object.keys(data).length > 0, {
  message: 'Debes enviar al menos un campo para actualizar',
});

/* -------------------------- OUTPUT SCHEMAS -------------------------- */

// Output Base
const hospedaBaseOutput = {
  id: z.number(),
  fechaInicio: z.string().or(z.date()).nullable(),
  fechaFin: z.string().or(z.date()).nullable(),
  estado: z.enum(['reservada', 'finalizada']),
};

// Output Admin
export const hospedaOutputSchemaAdmin = z
  .object({
    ...hospedaBaseOutput,
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    cabania: z.object({
      id: z.number(),
      nombre: z.string(),
      capacidad: z.number(),
      descripcion: z.string(),
      ubicacion: z.string(),
      cabinStatus: z.enum(['Activo', 'Inactivo']),
    }),
    campista: z.object({
      id: z.number(),
      nombre: z.string(),
      apellido: z.string(),
      email: z.string().email(),
    }),
    periodo: z.object({
      id: z.number(),
      nombre: z.string(),
      fechaInicioPer: z.string().or(z.date()),
      fechaFinPer: z.string().or(z.date()),
    }),
  })
  .strip();

// Output Campista
export const hospedaOutputSchemaCampista = z
  .object({
    ...hospedaBaseOutput,
    cabania: z.object({
      id: z.number(),
      nombre: z.string(),
      descripcion: z.string(),
      ubicacion: z.string(),
    }),
    periodo: z.object({
      id: z.number(),
      nombre: z.string(),
    }),
  })
  .strip();

// Output Instructor
export const hospedaOutputSchemaInstructor = z
  .object({
    ...hospedaBaseOutput,
    cabania: z.object({
      id: z.number(),
      nombre: z.string(),
    }),
    campista: z.object({
      id: z.number(),
      nombre: z.string(),
      apellido: z.string(),
    }),
  })
  .strip();

/* -------------------------- TYPES -------------------------- */

export type HospedaInputAdmin = z.infer<typeof hospedaInputSchemaAdmin>;
export type HospedaUpdateInputAdmin = z.infer<typeof hospedaInputUpdateSchemaAdmin>;
export type HospedaOutputAdmin = z.infer<typeof hospedaOutputSchemaAdmin>;

export type HospedaInputCampista = z.infer<typeof hospedaInputSchemaCampista>;
export type HospedaUpdateInputCampista = z.infer<typeof hospedaInputUpdateSchemaCampista>;
export type HospedaOutputCampista = z.infer<typeof hospedaOutputSchemaCampista>;

export type HospedaInputInstructor = z.infer<typeof hospedaInputSchemaInstructor>;
export type HospedaUpdateInputInstructor = z.infer<typeof hospedaInputUpdateSchemaInstructor>;
export type HospedaOutputInstructor = z.infer<typeof hospedaOutputSchemaInstructor>;
