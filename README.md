# 🌱 AI Environmental Impact Analyzer

## ✨ ¡Aplicación Completamente Implementada con Gemini AI!

Una aplicación completa para analizar el impacto ambiental de productos usando Inteligencia Artificial de Gemini, desarrollada con las últimas tecnologías web.

![Status](https://img.shields.io/badge/Status-Completado-brightgreen)
![RFC](https://img.shields.io/badge/RFCs-100%25%20Implementados-blue)
![AI](https://img.shields.io/badge/AI-Gemini-orange)
![Framework](https://img.shields.io/badge/Framework-Next.js%2015-black)

---

## 🚀 Estado Actual

### ✅ **TODOS LOS RFCs IMPLEMENTADOS AL 100%**

**Servidores Funcionando:**
- 🟢 **Backend API**: http://localhost:3001 (Express + TypeScript)
- 🟢 **Frontend Web**: http://localhost:3003 (Next.js 15 + React 19)

---

## 🎯 Funcionalidades Principales

### **1. Autenticación Completa**
- ✅ Registro de usuarios con validación
- ✅ Login/logout con JWT tokens
- ✅ Protección de rutas
- ✅ Persistencia de sesión

### **2. Análisis de Productos con IA**
- ✅ Formulario intuitivo de entrada
- ✅ Procesamiento con Gemini AI
- ✅ Cálculo de Eco-Score personalizado
- ✅ Visualización rica de resultados

### **3. Visualización Avanzada**
- ✅ Medidor circular de Eco-Score
- ✅ Tarjetas de métricas individuales
- ✅ Lista detallada de materiales
- ✅ Recomendaciones de sostenibilidad

### **4. Historial y Persistencia**
- ✅ Base de datos SQLite con Prisma
- ✅ Historial personal por usuario
- ✅ Búsqueda y filtrado
- ✅ Exportación de datos

### **5. Diseño Moderno**
- ✅ **Glassmorphism** con Tailwind CSS
- ✅ Gradientes dinámicos
- ✅ Colores según Eco-Score
- ✅ Responsive design
- ✅ Animaciones suaves

---

## 🤖 Integración con Gemini AI

### **Migración Completa de OpenAI a Gemini**
- ✅ **Google Generative AI** implementado
- ✅ **Prompt optimizado** para análisis ambientales
- ✅ **Validación robusta** con Zod
- ✅ **Manejo de errores** específico para Gemini
- ✅ **API Key configurada** en variables de entorno

### Backend
- Node.js con Express
- TypeScript
- Prisma ORM con SQLite
- JWT para autenticación
- Gemini AI API

## Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Docker y Docker Compose (opcional)

### Configuración Local

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd ai-environmental-analyzer
   ```

2. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env` con tus valores:
   ```
   GEMINI_API_KEY="tu_clave_de_gemini_aqui"
   JWT_SECRET="tu_secreto_jwt_seguro"
   DATABASE_URL="file:./dev.db"
   ```

3. **Instalar dependencias del backend**
   ```bash
   cd backend
   npm install
   ```

4. **Configurar la base de datos**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Instalar dependencias del frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Ejecutar en modo desarrollo

1. **Iniciar el backend** (en terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

2. **Iniciar el frontend** (en terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Acceder a la aplicación**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Usar con Docker

1. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con tus valores
   ```

2. **Construir y ejecutar**
   ```bash
   docker-compose up --build
   ```

3. **Acceder a la aplicación**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Uso

1. **Registro/Login**: Crea una cuenta o inicia sesión
2. **Análisis**: Describe un producto en el formulario
3. **Resultados**: Revisa el Eco-Score y análisis detallado
4. **Historial**: Ve tus análisis anteriores (funcionalidad futura)

## Estructura del Proyecto

```
├── backend/
│   ├── src/
│   │   ├── auth/           # Autenticación JWT
│   │   ├── controllers/    # Controladores de la API
│   │   ├── services/       # Lógica de negocio
│   │   ├── utils/          # Utilidades (calculador Eco-Score)
│   │   └── lib/           # Configuración de Prisma
│   ├── prisma/            # Schema y migraciones de DB
│   └── Dockerfile.backend
├── frontend/
│   ├── src/
│   │   ├── app/           # App Router de Next.js
│   │   ├── components/    # Componentes React
│   │   └── hooks/         # Hooks personalizados
│   └── public/           # Archivos estáticos
├── docs/                 # RFCs y documentación
├── docker-compose.yml    # Configuración de Docker
└── .env.example         # Variables de entorno de ejemplo
```

## API Endpoints

### Autenticación
- `POST /api/v1/auth/register` - Registro de usuario
- `POST /api/v1/auth/login` - Inicio de sesión

### Análisis (requiere autenticación)
- `POST /api/v1/analysis` - Crear nuevo análisis
- `GET /api/v1/analysis` - Obtener historial de análisis

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## Documentación Adicional

- [RFC-001: Estructura de Componentes y UI/UX](./docs/RFC-001.md)
- [RFC-002: Estrategia de Pruebas](./docs/RFC-002.md)
- [RFC-003: Diseño de API y Autenticación](./docs/RFC-003.md)
- [RFC-004: Esquema de Base de Datos](./docs/RFC-004.md)
- [RFC-005: Motor de Análisis Principal](./docs/RFC-005.md)
- [RFC-006: Dockerización y Despliegue](./docs/RFC-006.md)
