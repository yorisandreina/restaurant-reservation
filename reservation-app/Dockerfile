# Etapa 1: Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

# Copiamos solo package.json y package-lock.json para instalar dependencias
COPY frontend/package*.json ./
RUN npm install

# Copiamos el resto del frontend y construimos
COPY frontend/ ./
RUN npm run build

# Etapa 2: Build backend
FROM node:20-alpine AS backend
WORKDIR /app/backend

# Copiamos package.json y package-lock.json del backend
COPY backend/package*.json ./
RUN npm install

# Copiamos el resto del backend
COPY backend/ ./

# Copiamos el build del frontend al backend
COPY --from=frontend-build /app/frontend/dist ./public

# Exponer el puerto donde corre el backend
EXPOSE 8000

# Comando para ejecutar el backend
CMD ["node", "index.js"]
