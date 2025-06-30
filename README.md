# 🏕️ Sistema de Gestión de Campamento

Este proyecto es una API REST desarrollada en **Express + TypeScript**, que gestiona la información de un sistema de campamento, incluyendo usuarios, turnos, inscripciones, datos médicos, entre otros.

## 🚀 Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MikroORM](https://mikro-orm.io/) - ORM para PostgreSQL
- [Zod](https://zod.dev/) - Validación de esquemas
- [ESLint + Prettier](https://eslint.org/) - Estilo de código
- [pnpm](https://pnpm.io/) - Gestor de paquetes rápido

## 🔐 Validaciones

Todas las entradas a la API están validadas con [Zod](https://zod.dev/):

- Estructura esperada de cada entidad
- Reglas de negocio (ej. campos obligatorios, formato de email, contraseñas seguras)
- Sanitización básica de entradas

## 🧠 Lógica principal del sistema

Este sistema está pensado para manejar:

- Registro y gestión de usuarios (campistas, coordinadores, etc.)
- Inscripcion y gestion a Eventos, Talles y misiones
- Asignar Notas
- Validación cruzada de datos

> El modelo de datos fue diseñado previamente a partir de un DER, asegurando integridad y relaciones correctas entre las entidades.

## 📦 Scripts disponibles

| Comando          | Descripción                                            |
| ---------------- | ------------------------------------------------------ |
| `pnpm install`   | Instala dependencias                                   |
| `pnpm run dev`   | Corre el servidor en modo desarrollo con recarga       |
| `pnpm run start` | Compila TypeScript y ejecuta el servidor desde `dist/` |
| `pnpm run lint`  | Corre ESLint                                           |

## 🧪 Cómo levantar el entorno

1. Cloná el repositorio
   ```bash
   git clone git@github.com:usuario/sistema-campamento.git
   cd sistema-campamento
   ```
