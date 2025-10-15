import { z } from 'zod';

/* -------------------------- INPUT SCHEMAS -------------------------- */

// Input Admin
export const tallerInputSchemaAdmin = z.object({
  titulo: z.string().min(3).max(150),
  descripcion: z.string().min(10).max(1000),
  fechaHora: z.string().datetime(), // se convierte a Date en el controller
  lugar: z.string().min(3).max(200),
  cupo: z.number().int().min(1).max(1000),
  duracionMin: z.number().int().min(1).max(1440),
  estado: z.enum(['abierto', 'cerrado', 'en progreso', 'cancelado', 'completado']).default('abierto'),
  instructor: z.number().int().positive(), // id del instructor
  periodo: z.number().int().positive(), // id del periodo
});

// Input Campista (solo inscribirse o ver información, no crear)
export const tallerInputSchemaCampista = z.object({});

// Input Instructor (puede crear sus talleres)
export const tallerInputSchemaInstructor = z.object({
  titulo: z.string().min(3).max(150),
  descripcion: z.string().min(10).max(1000),
  fechaHora: z.string().datetime(),
  lugar: z.string().min(3).max(200),
  cupo: z.number().int().min(1).max(500),
  duracionMin: z.number().int().min(1).max(480),
  estado: z.enum(['abierto', 'cerrado', 'en progreso', 'cancelado', 'completado']).default('abierto'),
  periodo: z.number().int().positive(),
});

/* -------------------------- INPUT UPDATE SCHEMAS -------------------------- */

// Update Admin
export const tallerInputUpdateSchemaAdmin = tallerInputSchemaAdmin
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });

// Update Campista
export const tallerInputUpdateSchemaCampista = z
  .object({})
  .refine((data) => Object.keys(data).length > 0, { message: 'Debes enviar al menos un campo para actualizar' });

// Update Instructor
export const tallerInputUpdateSchemaInstructor = tallerInputSchemaInstructor
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });

/* -------------------------- OUTPUT SCHEMAS -------------------------- */

// Output Base
const tallerBaseOutput = {
  id: z.number(),
  titulo: z.string(),
  descripcion: z.string(),
  fechaHora: z.string().or(z.date()),
  lugar: z.string(),
  cupo: z.number(),
  duracionMin: z.number(),
  estado: z.enum(['abierto', 'cerrado', 'en progreso', 'cancelado', 'completado']),
};

// Output Admin
export const tallerOutputSchemaAdmin = z
  .object({
    ...tallerBaseOutput,
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    instructor: z.object({
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
      fechaInicioInsc: z.string().or(z.date()),
      fechaFinInsc: z.string().or(z.date()),
    }),
  })
  .strip();

// Output Campista
export const tallerOutputSchemaCampista = z
  .object({
    ...tallerBaseOutput,
    instructor: z.object({
      id: z.number(),
      nombre: z.string(),
      apellido: z.string(),
    }),
    periodo: z.object({
      id: z.number(),
      nombre: z.string(),
    }),
  })
  .strip();

// Output Instructor
export const tallerOutputSchemaInstructor = z
  .object({
    ...tallerBaseOutput,
    createdAt: z.string().or(z.date()).optional(),
    updatedAt: z.string().or(z.date()).optional(),
    periodo: z.object({
      id: z.number(),
      nombre: z.string(),
    }),
  })
  .strip();

/* -------------------------- TYPES -------------------------- */

export type TallerInputAdmin = z.infer<typeof tallerInputSchemaAdmin>;
export type TallerUpdateInputAdmin = z.infer<typeof tallerInputUpdateSchemaAdmin>;
export type TallerOutputAdmin = z.infer<typeof tallerOutputSchemaAdmin>;

export type TallerInputCampista = z.infer<typeof tallerInputSchemaCampista>;
export type TallerUpdateInputCampista = z.infer<typeof tallerInputUpdateSchemaCampista>;
export type TallerOutputCampista = z.infer<typeof tallerOutputSchemaCampista>;

export type TallerInputInstructor = z.infer<typeof tallerInputSchemaInstructor>;
export type TallerUpdateInputInstructor = z.infer<typeof tallerInputUpdateSchemaInstructor>;
export type TallerOutputInstructor = z.infer<typeof tallerOutputSchemaInstructor>;
