import os
import sys
from pathlib import Path

os.environ.setdefault("JWT_SECRET_KEY", "test-secret-key-do-not-use-in-production")
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_token_success() -> None:
    response = client.post(
        "/token",
        json={"username": "admin", "password": "admin123"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["token_type"] == "bearer"
    assert body["expires_in"] == 300
    assert "access_token" in body
    assert "refresh_token" in body


def test_token_invalid_credentials() -> None:
    response = client.post(
        "/token",
        json={"username": "admin", "password": "wrong"},
    )

    assert response.status_code == 401


def test_refresh_success() -> None:
    token_response = client.post(
        "/token",
        json={"username": "admin", "password": "admin123"},
    )
    refresh_token = token_response.json()["refresh_token"]

    response = client.post("/refresh", json={"refresh_token": refresh_token})

    assert response.status_code == 200
    body = response.json()
    assert body["token_type"] == "bearer"
    assert body["expires_in"] == 300
    assert "access_token" in body


def test_refresh_invalid_token() -> None:
    response = client.post("/refresh", json={"refresh_token": "invalid-token"})

    assert response.status_code == 401
