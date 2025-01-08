# Documento de Requisitos del Producto (PRD): AI Environmental Impact Analyzer

## 1. Introducción y Visión General

**Visión del Producto:** Crear una herramienta intuitiva y poderosa que permita a los consumidores tomar decisiones de compra más conscientes y sostenibles. Mediante el uso de inteligencia artificial, nuestra aplicación analizará productos y proporcionará una puntuación clara y comprensible de su impacto ambiental, fomentando así la transparencia y la responsabilidad en la industria.

**Problema:** Los consumidores actuales carecen de herramientas accesibles para evaluar el impacto ambiental real de los productos que compran. La información es a menudo opaca, dispersa o demasiado técnica, lo que dificulta la toma de decisiones informadas.

**Solución:** Una aplicación web que permite a los usuarios obtener un "Eco-Score" para cualquier producto. Simplemente pegando una URL o describiendo un producto, la IA analizará datos disponibles para generar una puntuación de impacto ambiental fácil de entender, junto con un desglose detallado.

## 2. Audiencia Objetivo

- **Consumidores Conscientes:** Individuos que buscan activamente reducir su huella de carbono.
- **Familias:** Hogares que buscan opciones más ecológicas para sus compras diarias.
- **Educadores y Estudiantes:** Interesados en la sostenibilidad y el impacto del consumo.

## 3. Requisitos Funcionales

| #    | Funcionalidad                          | Descripción                                                  | Prioridad |
| ---- | -------------------------------------- | ------------------------------------------------------------ | --------- |
| 1    | **Análisis de Producto por Texto/URL** | El usuario introduce una descripción o URL. El sistema extrae la información relevante para el análisis. | Alta      |
| 2    | **Generación de Eco-Score**            | La IA procesa la información y genera una puntuación del 1 al 100 (100 = mejor). | Alta      |
| 3    | **Informe de Impacto Detallado**       | Se muestra un informe que desglosa el impacto en: Huella de Carbono, Uso de Agua, y Materiales. | Alta      |
| 4    | **Historial de Búsqueda de Usuario**   | Los usuarios registrados pueden ver un historial de los productos que han analizado. | Media     |
| 5    | **Autenticación de Usuarios**          | Sistema de registro e inicio de sesión (correo/contraseña).  | Media     |

## 4. Requisitos No Funcionales

| #    | Requisito         | Descripción                                                  |
| ---- | ----------------- | ------------------------------------------------------------ |
| 1    | **Rendimiento**   | El análisis y la generación de la puntuación deben completarse en menos de 15 segundos. |
| 2    | **Escalabilidad** | La arquitectura debe poder manejar un crecimiento de usuarios. |
| 3    | **Seguridad**     | Proteger los datos del usuario y asegurar las comunicaciones (HTTPS). |
| 4    | **Usabilidad**    | La interfaz debe ser limpia, intuitiva y responsive (móvil/escritorio). |