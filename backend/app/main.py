from datetime import datetime, timedelta, timezone
import os
from typing import Any

from fastapi import FastAPI, HTTPException
from jose import JWTError, jwt
from pydantic import BaseModel

app = FastAPI(title="JWT FastAPI Demo")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 300
REFRESH_TOKEN_EXPIRE_SECONDS = 1800
ADMIN_USERNAME = os.getenv("JWT_ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("JWT_ADMIN_PASSWORD", "admin123")
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-this-secret-key")


class AuthRequest(BaseModel):
    username: str
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str


def _create_token(data: dict[str, Any], expires_seconds: int, token_type: str) -> str:
    payload = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(seconds=expires_seconds)
    payload.update({"exp": expire, "type": token_type})
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def _is_valid_user(username: str, password: str) -> bool:
    return username == ADMIN_USERNAME and password == ADMIN_PASSWORD


@app.post("/token")
def login(auth: AuthRequest) -> dict[str, Any]:
    if not _is_valid_user(auth.username, auth.password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    access_token = _create_token(
        {"sub": auth.username},
        expires_seconds=ACCESS_TOKEN_EXPIRE_SECONDS,
        token_type="access",
    )
    refresh_token = _create_token(
        {"sub": auth.username},
        expires_seconds=REFRESH_TOKEN_EXPIRE_SECONDS,
        token_type="refresh",
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_SECONDS,
    }


@app.post("/refresh")
def refresh_token(request: RefreshRequest) -> dict[str, Any]:
    try:
        payload = jwt.decode(request.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Refresh token inválido")

        username = payload.get("sub")
        if username != ADMIN_USERNAME:
            raise HTTPException(status_code=401, detail="Usuario no autorizado")

    except JWTError as exc:
        raise HTTPException(status_code=401, detail="Refresh token inválido") from exc

    new_access_token = _create_token(
        {"sub": username},
        expires_seconds=ACCESS_TOKEN_EXPIRE_SECONDS,
        token_type="access",
    )

    return {
        "access_token": new_access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_SECONDS,
    }
