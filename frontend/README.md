# Frontend - Compliance Platform

Aplicación web construida con React + Vite que proporciona autenticación JWT con el backend FastAPI.

## Tecnologías

- **React 18** – Biblioteca UI
- **Vite** – Bundler y servidor de desarrollo
- **React Router v6** – Enrutamiento del lado del cliente

## Estructura del proyecto

```
frontend/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx      # Contexto de autenticación
│   ├── components/
│   │   └── ProtectedRoute.jsx   # Guardia de ruta autenticada
│   ├── pages/
│   │   ├── LoginPage.jsx        # Página de inicio de sesión
│   │   ├── LoginPage.module.css
│   │   ├── WelcomePage.jsx      # Página de bienvenida (protegida)
│   │   └── WelcomePage.module.css
│   ├── services/
│   │   └── api.js               # Llamadas a la API del backend
│   ├── App.jsx                  # Configuración de rutas
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Estilos globales y variables CSS
├── vite.config.js
├── package.json
└── README.md
```

## Configuración

El frontend se comunica con el backend a través de un proxy de Vite. Asegúrate de que el backend esté corriendo en `http://localhost:8000`.

## Instalación

```bash
cd frontend
npm install
```

## Ejecución en desarrollo

```bash
# Primero, inicia el backend (en otra terminal):
cd backend
export JWT_SECRET_KEY="tu-clave-secreta"
poetry run uvicorn app.main:app --reload

# Luego, inicia el frontend:
cd frontend
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

## Build para producción

```bash
npm run build
```

Los archivos de producción se generarán en la carpeta `dist/`.

## Funcionalidades

### Página de Login (`/login`)
- Formulario con campos de usuario y contraseña
- Validación de credenciales contra el backend (`POST /token`)
- Almacenamiento del token JWT en `sessionStorage`
- Redirección automática al dashboard tras login exitoso
- Manejo de errores con mensajes descriptivos

### Página de Bienvenida (`/`)
- Acceso protegido: redirige a `/login` si no hay sesión activa
- Muestra mensaje de bienvenida y estado de sesión
- Botón de cierre de sesión que limpia el token y redirige al login

## Credenciales de prueba

Por defecto, el backend acepta:
- **Usuario:** `admin`
- **Contraseña:** `admin123`

## Diseño

La interfaz sigue el sistema de diseño definido en `DESIGN.md`:
- Tipografía: Inter
- Superficies de vidrio (glassmorphism) con blur y gradientes
- Paleta de colores: primario `#0F172A`, fondo `#FAFAFA`
- Espaciado basado en múltiplos de 12px

