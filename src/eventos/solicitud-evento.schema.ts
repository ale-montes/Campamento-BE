import { z } from 'zod';

/* -------------------------- INPUTS -------------------------- */

// Admin can create with campista, evento and choose estado
export const solicitudEventoInputSchemaAdmin = z.object({
  campista: z.number().int().positive(),
  evento: z.number().int().positive(),
  estado: z.enum(['pendiente', 'aceptado', 'rechazado']).optional().default('pendiente'),
});

// Campista only sends evento to request signup
export const solicitudEventoInputSchemaCampista = z.object({
  evento: z.number().int().positive(),
});

// Instructor (or admin) may update estado only (or create via admin)
export const solicitudEventoInputSchemaInstructor = z.object({
  estado: z.enum(['pendiente', 'aceptado', 'rechazado']).optional(),
});

/* -------------------------- UPDATE SCHEMAS -------------------------- */

// Admin update: can change any of the fields (partial)
export const solicitudEventoInputUpdateSchemaAdmin = solicitudEventoInputSchemaAdmin
  .partial()
  .refine((d) => Object.keys(d).length > 0, { message: 'Debes enviar al menos un campo para actualizar' });

// Campista update: normally campista shouldn't change estado; allow nothing or maybe cancel via DELETE.
// we'll still allow a small partial (none) but require at least one field if used.
export const solicitudEventoInputUpdateSchemaCampista = z
  .object({})
  .partial()
  .refine((d) => Object.keys(d).length > 0, { message: 'No hay campos permitidos para actualizar' });

// Instructor update: can change estado only
export const solicitudEventoInputUpdateSchemaInstructor = solicitudEventoInputSchemaInstructor
  .partial()
  .refine((d) => Object.keys(d).length > 0, { message: 'Debes enviar al menos un campo para actualizar' });

/* -------------------------- OUTPUTS -------------------------- */

const solicitudEventoBaseOutput = {
  id: z.number(),
  estado: z.enum(['pendiente', 'aceptado', 'rechazado']),
};

// Admin output: includes campista and evento fully
export const solicitudEventoOutputSchemaAdmin = z
  .object({
    ...solicitudEventoBaseOutput,
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    campista: z.object({
      id: z.number(),
      nombre: z.string(),
      apellido: z.string(),
      email: z.string().email(),
    }),
    evento: z.object({
      id: z.number(),
      titulo: z.string(),
      descripcion: z.string().optional(),
      fechaHora: z.string().or(z.date()).optional(),
      lugar: z.string().optional(),
    }),
  })
  .strip();

// Campista output: only evento info + estado
export const solicitudEventoOutputSchemaCampista = z
  .object({
    ...solicitudEventoBaseOutput,
    evento: z.object({
      id: z.number(),
      titulo: z.string(),
      descripcion: z.string().optional(),
      fechaHora: z.string().or(z.date()).optional(),
      lugar: z.string().optional(),
    }),
  })
  .strip();

// Instructor output: campista minimal + evento minimal
export const solicitudEventoOutputSchemaInstructor = z
  .object({
    ...solicitudEventoBaseOutput,
    campista: z.object({
      id: z.number(),
      nombre: z.string(),
      apellido: z.string(),
      email: z.string().email(),
    }),
    evento: z.object({
      id: z.number(),
      titulo: z.string(),
      fechaHora: z.string().or(z.date()).optional(),
    }),
  })
  .strip();

/* -------------------------- TYPES -------------------------- */

export type SolicitudEventoInputAdmin = z.infer<typeof solicitudEventoInputSchemaAdmin>;
export type SolicitudEventoInputCampista = z.infer<typeof solicitudEventoInputSchemaCampista>;
export type SolicitudEventoInputInstructor = z.infer<typeof solicitudEventoInputSchemaInstructor>;

export type SolicitudEventoUpdateInputAdmin = z.infer<typeof solicitudEventoInputUpdateSchemaAdmin>;
export type SolicitudEventoUpdateInputCampista = z.infer<typeof solicitudEventoInputUpdateSchemaCampista>;
export type SolicitudEventoUpdateInputInstructor = z.infer<typeof solicitudEventoInputUpdateSchemaInstructor>;

export type SolicitudEventoOutputAdmin = z.infer<typeof solicitudEventoOutputSchemaAdmin>;
export type SolicitudEventoOutputCampista = z.infer<typeof solicitudEventoOutputSchemaCampista>;
export type SolicitudEventoOutputInstructor = z.infer<typeof solicitudEventoOutputSchemaInstructor>;
