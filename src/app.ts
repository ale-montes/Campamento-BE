import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { jsonErrorHandler } from './shared/jsonErrorHandler.js';
import { adminRoutes } from './usuarios/admin.routes.js';
import { campistaRoutes } from './usuarios/campista.routes.js';
import { instructorRoutes } from './usuarios/instructor.routes.js';
import { tallerRoutes } from './talleres/taller.routes.js';
import { inscripcionTallerRoutes } from './talleres/inscripcion-taller.routes.js';
import { asignaMisionRoutes } from './misiones/asigna-mision.routes.js';
import { misionRoutes } from './misiones/mision.routes.js';
import { eventoRoutes } from './eventos/evento.routes.js';
import { solicitudEventoRoutes } from './eventos/solicitud-evento.routes.js';
import { deidadRoutes } from './deidades/deidad.routes.js';
import { cabaniaRoutes } from './cabanas/cabania.routes.js';
import { hospedaRoutes } from './cabanas/hospeda.routes.js';
import { authRoutes } from './auth/auth.routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

//luego de los middlewares base
app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});
//antes de las rutas y middlewares de negocio

//Routes
app.use('/api/admin', adminRoutes);
app.use('/api/campista', campistaRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api/talleres', tallerRoutes);
app.use('/api/inscripcion-taller', inscripcionTallerRoutes);
app.use('/api/asigna-mision', asignaMisionRoutes);
app.use('/api/misiones', misionRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/solicitud-evento', solicitudEventoRoutes);
app.use('/api/deidades', deidadRoutes);
app.use('/api/cabanias', cabaniaRoutes);
app.use('/api/hospedaje', hospedaRoutes);
app.use('/api/login', authRoutes);

app.use(jsonErrorHandler);
app.use(cors({ origin: 'http://localhost:5173' }));
app.use((_, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

await syncSchema(); //never in production

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
