import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { usuariosRoutes } from './usuarios/usuarios.routes.js';
import { deidadesRoutes } from './deidades/deidades.routes.js';
import { jsonErrorHandler } from './shared/jsonErrorHandler.js';

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/deidades', deidadesRoutes);

app.use(jsonErrorHandler);
app.use(cors({ origin: 'http://localhost:5173' }));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
