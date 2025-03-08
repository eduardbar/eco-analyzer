# Usa Node.js 18
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del backend
COPY backend/package*.json ./

# Instala todas las dependencias (incluyendo devDependencies para build)
RUN npm install

# Copia el código fuente
COPY backend/ ./

# Genera el cliente de Prisma
RUN npx prisma generate

# Compila TypeScript
RUN npm run build

# Expone el puerto
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
