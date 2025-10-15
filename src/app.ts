import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { jsonErrorHandler } from './shared/jsonErrorHandler.js';
import { apiLimiter } from './shared/ratelimit.js';
import routes from './routes.js';
import { errorMiddleware } from './shared/middleware/error.middleware.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const apiBasePath = process.env.API_BASE_PATH || '/api';

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(jsonErrorHandler);
app.use(apiBasePath, apiLimiter);

// Crear RequestContext
app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

//Rutas
app.use(apiBasePath, routes);

//Error middleware
app.use(errorMiddleware);

await syncSchema(); //never in production

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
