# 🏕️ Sistema de Gestión de Campamento

Este proyecto corresponde al backend del sistema Campamento Mestizo, desarrollado en Node.js con TypeScript.
Gestiona usuarios, talleres, hospedajes y actividades del campamento mediante una API REST segura y validada.

## 🚀 Tecnologías utilizadas

- [Node.js](https://nodejs.org/) - entorno de ejecución
- [Express.js](https://expressjs.com/) - framework backend
- [TypeScript](https://www.typescriptlang.org/) - tipado estático
- [MikroORM](https://mikro-orm.io/) - ORM para MySQL
- [Zod](https://zod.dev/) - Validación de esquemas y respuestas
- [ESLint + Prettier](https://eslint.org/) - Estilo de código
- [pnpm](https://pnpm.io/) - Gestor de paquetes rápido

## 🧠 Funcionalidad del sistema
El sistema permite gestionar las operaciones principales del campamento:
- Registro y autenticación de usuarios (campistas, instructores, administradores)
- Gestión de hospedajes en cabañas
- Inscripción y gestión de talleres, misiones y eventos
- Asignación de periodos vigentes
- Validación cruzada y control de acceso por rol
- Envío de correos automáticos (validaciones SMTP)

Todo el modelo de datos se diseñó a partir de un DER que garantiza la integridad referencial y las relaciones correctas entre entidades.

## 🔐 Validaciones
- Cada request entrante y respuesta saliente se valida usando Zod, garantizando:
- Formato y tipo correcto de los datos
- Reglas de negocio (IDs válidos, estados, rangos, etc.)
- Sanitización completa de entradas
- Estructura esperada de salida (control por rol cuando aplica)

## 📦 Scripts disponibles

| Comando          | Descripción                                            |
| ---------------- | ------------------------------------------------------ |
| `pnpm install`   | Instala dependencias                                   |
| `pnpm run dev`   | Corre el servidor en modo desarrollo con recarga       |
| `pnpm run start` | Compila TypeScript y ejecuta el servidor desde `dist/` |
| `pnpm run lint`  | Corre ESLint                                           |

## 📂 Estructura del proyecto
```bash
src/
├── auth/                 # Autenticación
├── cabanas/              # Entidades y lógica de hospedajes
├── talleres/             # Entidades e Inscripción a talleres
├── deidades/             # Entidad Deidades disponibles
├── eventos/              # Entidades y Solicitud de eventos
├── misiones/             # Entidades y Asignacion de misiones
├── periodo/              # Entidad de Periodos del campamento e inscripcion
├── usuarios/             # Gestión de campista, admin e instructor
├── types/                # Tipo globales definidos
├── shared/               # Middlewares, utils y configuración
│   ├── db/orm.ts         # Configuración de MikroORM
│   ├── config/permis..   # Permisos Centralizados de proteccion de endpoint
│   ├── middleware/       # Middlewares de autentificacion, autorizacion, validacion y gesion de errores.
│   ├── ratelimit.ts      # Proteccion contra request masivas.  
│   └── ...
├── routes.ts             # Definición de rutas principales
└── app.ts                # Punto de entrada, inicializador de la aplicacion 
```

## 🧪 Cómo levantar el entorno

1. Cloná el repositorio
   ```bash
   git clone https://github.com/ale-montes/Campamento-BE
   cd Campamento-BE
   ```
2. Instala las dependencias
   ```bash
   pnpm install
   ```
3. Configuramos el archivo .env. Se puede utilizar el .env.example solo hay que solicitar database_url y credenciales smtp a los integrantes.

3. Corre el servidor en modo desarrollo con recarga
   ```bash
   pnpm run dev
   ```
