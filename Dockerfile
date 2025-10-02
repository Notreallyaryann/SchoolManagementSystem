# Stage 1: Build React frontend
FROM node:24 AS frontend-build

WORKDIR /app/frontend

# Copy only package files to install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Backend + React build
FROM node:24

WORKDIR /app/backend

# Copy only package files first to install backend dependencies
COPY backend/package*.json ./

# Install backend dependencies (bcrypt and native modules compiled inside container)
RUN npm install

# Copy backend source code
COPY backend/ ./

# Copy React build from frontend stage
COPY --from=frontend-build /app/frontend/build ./public

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["npm", "start"]



