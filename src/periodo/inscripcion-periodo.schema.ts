import { z } from 'zod';

/* -------------------------- INPUT SCHEMAS -------------------------- */

// Input Admin (puede enviar todo)
export const inscripcionPeriodoInputSchemaAdmin = z.object({
  campista: z.number().int().positive(),
  periodo: z.number().int().positive(),
  metodoPago: z.enum(['TRANSFERENCIA', 'MERCADOPAGO', 'EFECTIVO', 'TARJETA', 'OTRO']),
  referenciaPago: z.string().min(1),
  estado: z.enum(['PAGADO', 'CANCELADO', 'RECHAZADO', 'PENDIENTE']),
});

// Input Campista (no puede enviar estado ni cambiar otro campista)
export const inscripcionPeriodoInputSchemaCampista = z.object({
  periodo: z.number().int().positive(),
  metodoPago: z.enum(['TRANSFERENCIA', 'MERCADOPAGO', 'EFECTIVO', 'TARJETA', 'OTRO']),
  referenciaPago: z.string().min(1),
});

/* -------------------------- INPUT UPDATE SCHEMAS -------------------------- */

// Update Admin (puede actualizar todo)
export const inscripcionPeriodoUpdateSchemaAdmin = inscripcionPeriodoInputSchemaAdmin
  .partial()
  .refine((data) => Object.keys(data).length > 0, { message: 'Debes enviar al menos un campo para actualizar' });

// Update Campista (solo puede modificar su método o referencia de pago)
export const inscripcionPeriodoUpdateSchemaCampista = z
  .object({
    metodoPago: z.enum(['TRANSFERENCIA', 'MERCADOPAGO', 'EFECTIVO', 'TARJETA', 'OTRO']).optional(),
    referenciaPago: z.string().min(1).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, { message: 'Debes enviar al menos un campo para actualizar' });

/* -------------------------- OUTPUT SCHEMAS -------------------------- */

// Base output (común)
const inscripcionPeriodoBaseOutput = {
  id: z.number(),
  estado: z.enum(['PAGADO', 'CANCELADO', 'RECHAZADO', 'PENDIENTE']),
  metodoPago: z.enum(['TRANSFERENCIA', 'MERCADOPAGO', 'EFECTIVO', 'TARJETA', 'OTRO']),
  referenciaPago: z.string().nullable().optional(),
};

/* ---------- Output Admin (ve todo) ---------- */
export const inscripcionPeriodoOutputSchemaAdmin = z
  .object({
    ...inscripcionPeriodoBaseOutput,
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    campista: z.object({
      id: z.number(),
      nombre: z.string(),
      apellido: z.string(),
      email: z.string(),
      telefono: z.string().nullable().optional(),
      activo: z.boolean().optional(),
      isVerified: z.boolean().optional(),
    }),
    periodo: z.object({
      id: z.number(),
      nombre: z.string(),
      descripcion: z.string().nullable().optional(),
      fechaInicioPer: z.union([z.string(), z.date()]),
      fechaFinPer: z.union([z.string(), z.date()]),
      fechaInicioInsc: z.union([z.string(), z.date()]),
      fechaFinInsc: z.union([z.string(), z.date()]),
      estado: z.string(),
    }),
  })
  .strip();

/* ---------- Output Campista (solo sus datos básicos y periodo) ---------- */
export const inscripcionPeriodoOutputSchemaCampista = z
  .object({
    ...inscripcionPeriodoBaseOutput,
    periodo: z.object({
      id: z.number(),
      nombre: z.string(),
      fechaInicioPer: z.union([z.string(), z.date()]),
      fechaFinPer: z.union([z.string(), z.date()]),
      estado: z.string().optional(),
    }),
    campista: z.object({
      id: z.number(),
      nombre: z.string(),
      apellido: z.string(),
      email: z.string(),
    }),
  })
  .strip();

/* ---------- Output Coordinador (similar a admin, pero puede omitirse) ---------- */
export const inscripcionPeriodoOutputSchemaInstructor = inscripcionPeriodoOutputSchemaAdmin;

/* -------------------------- TYPES -------------------------- */

export type InscripcionPeriodoInputAdmin = z.infer<typeof inscripcionPeriodoInputSchemaAdmin>;
export type InscripcionPeriodoUpdateInputAdmin = z.infer<typeof inscripcionPeriodoUpdateSchemaAdmin>;
export type InscripcionPeriodoOutputAdmin = z.infer<typeof inscripcionPeriodoOutputSchemaAdmin>;

export type InscripcionPeriodoInputCampista = z.infer<typeof inscripcionPeriodoInputSchemaCampista>;
export type InscripcionPeriodoUpdateInputCampista = z.infer<typeof inscripcionPeriodoUpdateSchemaCampista>;
export type InscripcionPeriodoOutputCampista = z.infer<typeof inscripcionPeriodoOutputSchemaCampista>;

export type InscripcionPeriodoOutputCoordinador = z.infer<typeof inscripcionPeriodoOutputSchemaInstructor>;
