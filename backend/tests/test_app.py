# backend/tests/test_app.py

from fastapi.testclient import TestClient
from app import app, BOOKS_DATA

client = TestClient(app)

def test_get_books():
    # Asumimos que BOOKS_DATA puede estar vacío al arrancar
    response = client.get("/books")
    assert response.status_code == 200
    data = response.json()
    # El endpoint debe retornar una lista
    assert isinstance(data, list)
