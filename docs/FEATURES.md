# Funcionalidades Clave (Features) - AI Environmental Impact Analyzer

## 1. Core: Motor de Análisis de Impacto Ambiental (Backend)

- **API de Análisis:** Un endpoint (`POST /api/analyze`) que acepta la descripción de un producto.
- **Procesamiento con IA:** El backend se comunica con un servicio de IA externo (como OpenAI) enviándole la descripción del producto dentro de un prompt diseñado para extraer información ambiental.
- **Generación de Resultados:** El servicio de IA devuelve datos estructurados (JSON) con estimaciones de la huella de carbono, uso de agua y análisis de materiales.
- **Cálculo del Eco-Score:** Un algoritmo en el backend pondera los resultados de la IA para calcular una puntuación final.
- **Persistencia:** Los resultados del análisis se guardan en la base de datos MySQL a través de Prisma, asociados al perfil del usuario.

## 2. Interfaz de Usuario para el Análisis (Frontend)

- **Página Principal:**
  - Un campo de entrada central para que el usuario ingrese la descripción o URL del producto.
  - Un botón de "Analizar" que inicia el proceso y muestra un estado de carga.
- **Visualización de Resultados:**
  - Una vez completado el análisis, la UI muestra de forma destacada el **Eco-Score** con un gran indicador visual.
  - Tarjetas de "glassmorphism" separadas para desglosar:
    - **Huella de Carbono:** Con una analogía fácil de entender.
    - **Uso de Agua:** También con una analogía.
    - **Análisis de Materiales:** Listando los materiales y su sostenibilidad.
    - **Resumen General:** Un texto explicativo generado por la IA.

## 3. Gestión de Usuarios

- **Autenticación:** Páginas de registro e inicio de sesión.
- **Panel de Usuario:** Una página donde los usuarios pueden ver su historial de análisis previos.