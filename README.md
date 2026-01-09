# EcoAnalyzer

Plataforma de análisis de impacto ambiental potenciada por IA. Métricas precisas para decisiones sostenibles.

![Status](https://img.shields.io/badge/Status-Production-brightgreen)
![AI](https://img.shields.io/badge/AI-Gemini-orange)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%2015-black)
![Backend](https://img.shields.io/badge/Backend-Express-green)

## El Problema

Los consumidores carecen de herramientas accesibles para evaluar el impacto ambiental real de los productos que compran. La información es opaca, dispersa o demasiado técnica.

## La Solución

Una aplicación web que permite obtener un **Eco-Score** para cualquier producto. Describiendo un producto, la IA analiza datos para generar una puntuación de impacto ambiental fácil de entender, junto con un desglose detallado.

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Base de Datos | SQLite (dev) / MySQL (prod) con Prisma ORM |
| IA | Google Gemini API |
| Autenticación | JWT |
| Contenedores | Docker, Docker Compose |
| Testing | Jest, React Testing Library |

## Funcionalidades

### Análisis de Productos con IA
- Procesamiento de descripciones con Gemini AI
- Cálculo de Eco-Score (0-100)
- Estimación de huella de carbono (kg CO₂)
- Estimación de uso de agua (litros)
- Análisis de materiales con puntuación de sostenibilidad
- Recomendaciones personalizadas

### Autenticación
- Registro de usuarios
- Login/logout con JWT
- Protección de rutas
- Persistencia de sesión

### Historial
- Almacenamiento de análisis por usuario
- Búsqueda y filtrado
- Exportación de datos

### UI/UX
- Diseño glassmorphism oscuro
- Medidor circular de Eco-Score
- Tarjetas de métricas con iconos
- Responsive design
- Open Graph optimizado para redes sociales

## Estructura del Proyecto

```
├── backend/
│   ├── src/
│   │   ├── controllers/    # Handlers de requests
│   │   ├── routes/         # Definición de rutas
│   │   ├── services/       # Lógica de negocio
│   │   ├── middleware/     # Auth, validación
│   │   ├── utils/          # Eco-Score calculator, validación
│   │   └── lib/            # Prisma client
│   └── prisma/             # Schema y migraciones
├── frontend/
│   ├── src/
│   │   ├── app/            # App Router (Next.js)
│   │   ├── components/     # Componentes React
│   │   ├── hooks/          # Custom hooks
│   │   └── services/       # API client
│   └── public/             # Assets estáticos
└── docs/                   # RFCs y documentación
```

## API Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Registrar usuario |
| POST | `/api/v1/auth/login` | Iniciar sesión |

### Análisis (requiere auth)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/v1/analysis` | Crear nuevo análisis |
| GET | `/api/v1/analysis` | Obtener historial |

## Instalación

### Prerrequisitos
- Node.js 18+
- npm

### Configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/eduardbar/eco-analyzer.git
   cd eco-analyzer
   ```

2. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env`:
   ```
   GEMINI_API_KEY=tu_clave_de_gemini
   JWT_SECRET=tu_secreto_jwt
   DATABASE_URL=file:./dev.db
   ```

3. **Backend**
   ```bash
   cd backend
   npm install
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Frontend**
   ```bash
   cd frontend
   npm install
   ```

### Desarrollo

Terminal 1 (Backend):
```bash
cd backend && npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend && npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Docker

```bash
docker-compose up --build
```

## Eco-Score

El Eco-Score es una puntuación de 0 a 100 (mayor = mejor) calculada mediante:

| Métrica | Peso |
|---------|------|
| Huella de Carbono | 40% |
| Uso de Agua | 30% |
| Sostenibilidad de Materiales | 30% |

Cada métrica se normaliza a una escala 0-100 antes de aplicar los pesos.

## Documentación

- [RFC-001: UI/UX y Componentes](./docs/RFC-001.md)
- [RFC-002: Estrategia de Testing](./docs/RFC-002.md)
- [RFC-003: API y Autenticación](./docs/RFC-003.md)
- [RFC-004: Base de Datos](./docs/RFC-004.md)
- [RFC-005: Motor de Análisis](./docs/RFC-005.md)
- [RFC-006: Docker y Despliegue](./docs/RFC-006.md)

## Licencia

MIT
