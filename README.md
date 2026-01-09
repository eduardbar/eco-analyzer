# 🌱 EcoAnalyzer: Análisis Ambiental Inteligente

![EcoAnalyzer Preview](frontend/public/og-image.png)

**EcoAnalyzer** es una plataforma de análisis de impacto ambiental de nivel empresarial, potenciada por Inteligencia Artificial. A diferencia de las herramientas convencionales de evaluación ambiental, EcoAnalyzer transforma descripciones de productos en métricas precisas y accionables, permitiendo a consumidores y organizaciones tomar decisiones de compra más conscientes y sostenibles.

## 🚀 Características Principales

- 🤖 **IA Avanzada**: Motor de análisis impulsado por Google Gemini para evaluaciones precisas.
- 📊 **Eco-Score**: Puntuación única de 0-100 que sintetiza el impacto ambiental total.
- 🌍 **Huella de Carbono**: Estimación de emisiones de CO₂ en kg con analogías comprensibles.
- 💧 **Uso de Agua**: Cálculo del consumo hídrico en litros del ciclo de vida del producto.
- ♻️ **Análisis de Materiales**: Desglose de componentes con puntuación de sostenibilidad individual.
- 🔐 **Autenticación Segura**: Sistema de login con JWT y protección de rutas.
- 📜 **Historial Personal**: Almacenamiento y consulta de análisis previos por usuario.
- 🎨 **UI Glassmorphism**: Interfaz moderna, elegante y responsive con tema oscuro.

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express.js, TypeScript |
| **Base de Datos** | SQLite (dev) / MySQL (prod) con Prisma ORM |
| **IA** | Google Gemini API |
| **Auth** | JWT (JSON Web Tokens), bcrypt |
| **Testing** | Jest, React Testing Library |
| **Infraestructura** | Docker, Docker Compose |

## ⚙️ Configuración del Entorno

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
# Base de datos
DATABASE_URL="file:./dev.db"

# Autenticación
JWT_SECRET=tu_secreto_super_seguro

# Google Gemini AI
GEMINI_API_KEY=tu_api_key_de_gemini

NODE_ENV=development
```

## 📦 Instalación y Despliegue

### 1. Clonar el repositorio

```bash
git clone https://github.com/eduardbar/eco-analyzer.git
cd eco-analyzer
```

### 2. Instalar dependencias

Instala las dependencias del backend y frontend:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configurar la base de datos

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### 4. Desarrollo Local

Para correr ambos servidores simultáneamente:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

- Frontend disponible en: `http://localhost:3000`
- Backend API en: `http://localhost:3001`

### 5. Docker (Producción)

Para levantar todo el entorno con Docker:

```bash
docker-compose up --build
```

## 📂 Estructura del Proyecto

```
eco-analyzer/
├── backend/                  # API REST Express + TypeScript
│   ├── src/
│   │   ├── controllers/      # Lógica de requests/responses
│   │   ├── services/         # Lógica de negocio (Gemini AI)
│   │   ├── routes/           # Definición de endpoints
│   │   ├── middleware/       # Auth, validación
│   │   ├── utils/            # Eco-Score calculator, schemas
│   │   └── lib/              # Prisma client
│   └── prisma/               # Schema y migraciones DB
├── frontend/                 # SPA Next.js 15 + React 19
│   ├── src/
│   │   ├── app/              # App Router (páginas y layouts)
│   │   ├── components/       # Componentes UI reutilizables
│   │   ├── hooks/            # Custom hooks (useAnalysis, useAuth)
│   │   └── services/         # API client
│   └── public/               # Assets estáticos
└── docs/                     # RFCs y documentación técnica
```

## 📡 API Endpoints

### Autenticación (`/api/v1/auth`)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/register` | Registrar nuevo usuario |
| `POST` | `/login` | Iniciar sesión (retorna JWT) |

### Análisis (`/api/v1/analysis`) - *Requiere Auth*
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/` | Crear nuevo análisis de producto |
| `GET` | `/` | Obtener historial del usuario |

## 📚 Documentación

| RFC | Descripción |
|-----|-------------|
| [RFC-001](./docs/RFC-001.md) | Estructura de Componentes y UI/UX |
| [RFC-002](./docs/RFC-002.md) | Estrategia de Pruebas |
| [RFC-003](./docs/RFC-003.md) | Diseño de API y Autenticación |
| [RFC-004](./docs/RFC-004.md) | Esquema de Base de Datos |
| [RFC-005](./docs/RFC-005.md) | Motor de Análisis Principal |
| [RFC-006](./docs/RFC-006.md) | Dockerización y Despliegue |

---

© 2026 EcoAnalyzer Team
