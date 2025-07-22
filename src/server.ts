import express from 'express';
import morgan from 'morgan';
import { usuariosRoutes } from './usuarios/usuarios.routes.js';
import { cabanasRoutes } from './cabanas/cabanas.routes.js';
import { talleresRoutes } from './talleres/talleres.routes.js';
import { jsonErrorHandler } from './shared/jsonErrorHandler.js';

const app = express();
const PORT = 3000;
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/cabanas', cabanasRoutes);
app.use('/api/talleres', talleresRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
}); //Esto iría acá o en el jsonErrorHandler???

app.use(jsonErrorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
