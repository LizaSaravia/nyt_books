import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from fastapi.testclient import TestClient
from app import app, fetch_nyt_books

client = TestClient(app)

# Usamos un fixture para reemplazar fetch_nyt_books y evitar llamadas reales a la API
@pytest.fixture(autouse=True)
def override_fetch_nyt_books(monkeypatch):
    async def fake_fetch_nyt_books(list_type: str = "hardcover-fiction"):
        # Devolvemos una lista de prueba con un solo libro
        return [{
            "title": "Fake Book",
            "author": "Fake Author",
            "description": "Fake Description"
        }]
    monkeypatch.setattr("app.fetch_nyt_books", fake_fetch_nyt_books)

def test_get_books():
    response = client.get("/books")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert data[0]["title"] == "Fake Book"
