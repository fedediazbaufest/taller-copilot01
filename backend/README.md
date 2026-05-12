# Backend JWT con FastAPI

Aplicación Web API en Python + FastAPI que implementa autenticación JWT.

## Requisitos

- Python 3.11+
- Poetry
- Docker (opcional)

## Variables de entorno (opcional)

- `JWT_ADMIN_USERNAME` (default: `admin`)
- `JWT_ADMIN_PASSWORD` (default: `admin123`)
- `JWT_SECRET_KEY` (default: `change-this-secret-key`)  
  > Recomendado cambiarlo en despliegues reales.

## Instalación local con Poetry

```bash
cd backend
poetry install
```

## Ejecución local

```bash
cd backend
poetry run uvicorn app.main:app --reload
```

La API quedará disponible en: `http://localhost:8000`

## Endpoints

### 1) Obtener token

- **URL:** `POST /token`
- **Body (JSON):**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

- **Respuesta (ejemplo):**

```json
{
  "access_token": "<jwt>",
  "refresh_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 300
}
```

El `access_token` expira en **300 segundos**.

### 2) Refrescar token

- **URL:** `POST /refresh`
- **Body (JSON):**

```json
{
  "refresh_token": "<jwt>"
}
```

El `refresh_token` emitido por `/token` expira en **1800 segundos**.

- **Respuesta (ejemplo):**

```json
{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 300
}
```

## Uso con Docker

```bash
cd backend
docker compose up --build
```

Luego usa los endpoints en `http://localhost:8000`.
