import { Router } from 'express';

import { adminRoutes } from '../usuarios/admin.routes.js';
import { campistaRoutes } from '../usuarios/campista.routes.js';
import { instructorRoutes } from '../usuarios/instructor.routes.js';
import { tallerRoutes } from '../talleres/taller.routes.js';
import { inscripTallerRoutes } from '../talleres/inscripcion-taller.routes.js';
import { asignaMisionRoutes } from '../misiones/asigna-mision.routes.js';
import { misionRoutes } from '../misiones/mision.routes.js';
import { eventoRoutes } from '../eventos/evento.routes.js';
import { solicitudEventoRoutes } from '../eventos/solicitud-evento.routes.js';
import { deidadRoutes } from '../deidades/deidad.routes.js';
import { cabaniaRoutes } from '../cabanas/cabania.routes.js';
import { hospedaRoutes } from '../cabanas/hospeda.routes.js';
import { authRoutes } from '../auth/auth.routes.js';
import { periodoRoutes } from '../periodo/periodo.routes.js';
import { inscripPeriodoRoutes } from '../periodo/inscripcion-periodo.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/periodo', periodoRoutes);
router.use('/inscripcion-periodo', inscripPeriodoRoutes);
router.use('/admin', adminRoutes);
router.use('/campista', campistaRoutes);
router.use('/instructor', instructorRoutes);
router.use('/talleres', tallerRoutes);
router.use('/inscripcion-taller', inscripTallerRoutes);
router.use('/asigna-mision', asignaMisionRoutes);
router.use('/misiones', misionRoutes);
router.use('/eventos', eventoRoutes);
router.use('/solicitud-evento', solicitudEventoRoutes);
router.use('/deidades', deidadRoutes);
router.use('/cabanias', cabaniaRoutes);
router.use('/hospedaje', hospedaRoutes);

export default router;
