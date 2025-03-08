# Usa Node.js 18
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del backend
COPY backend/package*.json ./
RUN npm ci --only=production

# Copia el código fuente
COPY backend/ ./

# Compila TypeScript
RUN npm run build

# Expone el puerto
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]
