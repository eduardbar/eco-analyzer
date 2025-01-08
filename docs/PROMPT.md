## Contexto General del Proyecto

Estoy construyendo una aplicación full-stack "AI Environmental Impact Analyzer" con el siguiente stack:

- **Frontend:** Next.js, TypeScript, Tailwind CSS.
- **Backend:** Node.js, Express, TypeScript, Prisma.
- **Base de Datos:** MySQL.
- **Testing:** Jest, React Testing Library, Supertest.
- **Contenerización:** Docker.

El objetivo es analizar descripciones de productos para darles una puntuación de impacto ambiental. Por favor, ten en cuenta este contexto para todas las solicitudes.

### Tarea 1: Crear el esquema de la base de datos con Prisma

**Rol:** Eres un desarrollador backend experto en Prisma y MySQL.

**Solicitud:** Crea el archivo `schema.prisma`. Debe contener los siguientes modelos:

1. **`User`**:
   - `id` (autoincremental), `email` (único), `password` (string), `name` (opcional), `createdAt`, `updatedAt`.
2. **`Analysis`**:
   - `id` (autoincremental), `productTitle` (string), `ecoScore` (float), `summary` (texto largo), `carbonFootprint` (float), `waterUsage` (float), `createdAt`, `updatedAt`.
   - Debe tener una relación con `User`: un usuario puede tener muchas análisis.
   - Debe tener una relación con `MaterialAnalysis`: un análisis puede tener muchos análisis de materiales.
3. **`MaterialAnalysis`**:
   - `id` (autoincremental), `materialName` (string), `sustainabilityScore` (float), `notes` (texto).
   - Debe tener una relación con `Analysis`.

Asegúrate de configurar el `provider` para que sea `mysql`.

**Archivos a modificar:** `prisma/schema.prisma`

### Tarea 2: Crear el endpoint de análisis en el Backend

**Rol:** Eres un desarrollador backend experto en Node.js, Express y TypeScript.

**Solicitud:** Crea la ruta y el controlador para el análisis de productos.

1. **Ruta:** Define una ruta `POST /api/v1/analyze` en `src/routes/analysis.routes.ts`.
2. **Controlador:** Crea una función `handleAnalyzeProduct` en `src/controllers/analysis.controller.ts`.
3. **Lógica del Controlador:**
   - Debe ser una función `async`.
   - Extrae la `description` del `req.body`.
   - Llama a una función de un servicio (que simularemos por ahora) `analyzeProductService(description)`.
   - Esta función de servicio devolverá un resultado de análisis simulado.
   - Usa el `prisma client` para guardar este resultado en la base de datos (modelos `Analysis` y `MaterialAnalysis`).
   - Devuelve el resultado guardado con un código de estado 201.
   - Añade manejo de errores con un bloque `try...catch`.

**Archivos a modificar:** `src/routes/analysis.routes.ts`, `src/controllers/analysis.controller.ts`