# Arquitectura Técnica - AI Environmental Impact Analyzer (Stack JS/Node.js)

## 1. Filosofía de Diseño

Adoptaremos un enfoque **monolítico para el backend** en la fase inicial para simplificar el desarrollo y el despliegue, con la posibilidad de dividirlo en microservicios en el futuro. El frontend estará desacoplado y se comunicará con el backend a través de una API REST. Todo el sistema estará preparado para ser contenerizado con **Docker**.

## 2. Diagrama de Arquitectura

```
[Usuario (Navegador)] <--> [Frontend (Next.js en Vercel o Contenedor Docker)]
                                     |
                                     | (API REST sobre HTTPS)
                                     |
+-------------------------------------------------------------------------+
| Backend Monolítico (Contenedor Docker en AWS/GCP/Fly.io)                |
|                                                                         |
| [Servidor Node.js con Express.js]                                       |
|      |                                                                  |
|      +--> [Rutas API (/api/auth, /api/analyze, ...)]                     |
|      |         |                                                       |
|      |         +--> [Controladores (Lógica de solicitud/respuesta)]     |
|      |                   |                                             |
|      |                   +--> [Servicios (Lógica de negocio)] --------> [API Externa de IA (OpenAI)]
|      |                             |                                   |
|      +--> [ORM: Prisma Client] <---+-----------------------------------+
|                |                                                      |
+----------------|--------------------------------------------------------+
                 |
                 | (Conexión TCP/IP)
                 |
       [Base de Datos (MySQL en Contenedor Docker o servicio gestionado como AWS RDS)]
```

## 3. Componentes Detallados

### Frontend

- **Framework:** **Next.js 14+ (con App Router)**.
- **Lenguaje:** **TypeScript**.
- **Estilos:** **Tailwind CSS** para una utilidad máxima y diseño rápido.
- **Pruebas:** **Jest** para pruebas unitarias y **React Testing Library** para pruebas de componentes.
- **Despliegue:** Contenedor de **Docker** o directamente en **Vercel**.

### Backend

- **Entorno de Ejecución:** **Node.js**.
- **Framework:** **Express.js** con **TypeScript**.
- **ORM (Object-Relational Mapping):** **Prisma**. Gestionará todas las interacciones con la base de datos, proporcionando seguridad de tipos y migraciones automáticas.
- **Base de Datos:** **MySQL**. Una base de datos relacional robusta y ampliamente utilizada.
- **Autenticación:** Se implementará usando JWT (JSON Web Tokens). Una librería como `bcrypt` para el hash de contraseñas y `jsonwebtoken` para la creación/verificación de tokens.
- **Pruebas:** **Jest** y **Supertest** para probar los endpoints de la API.
- **Despliegue:** Contenedor de **Docker**.

### Contenerización (Docker)

- **`Dockerfile` para el Frontend:** Creará una imagen optimizada de producción de la aplicación Next.js.
- **`Dockerfile` para el Backend:** Creará una imagen del servidor Node.js.
- **`docker-compose.yml`:** Orquestará el inicio de todos los servicios: la aplicación frontend, el servidor backend y la base de datos MySQL, conectándolos a través de una red interna de Docker.