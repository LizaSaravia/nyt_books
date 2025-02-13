import logging
import asyncio
from typing import List, Dict

import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tenacity import retry, stop_after_attempt, wait_fixed

app = FastAPI(title="Integración NYT - Books Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("nyt_integration")

@retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
async def fetch_nyt_books(list_type: str = "hardcover-fiction"):
    """
    Llama a la API de NYT para obtener la lista de best sellers de acuerdo a list_type.
    """
    logger.info("Intentando conectar con el API del NYT para la lista: %s", list_type)
    url = "https://api.nytimes.com/svc/books/v3/lists.json"
    params = {
        "list": list_type,
        "api-key": "ce5DXwvXL79iSg3ajeg79L5h4DJ4JZXd"  
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        response.raise_for_status()  # Lanza excepción si la petición falla
        data = response.json()
        logger.info("Datos obtenidos del NYT para la lista: %s", list_type)
        # Extraer los detalles de cada libro.
        books = []
        for entry in data.get("results", []):
            details = entry.get("book_details", [])
            if details:
                books.append(details[0])
        return books

# Endpoint que retorna los libros actuales de acuerdo al género (lista)
@app.get("/books", response_model=List[Dict])
async def get_books(genre: str = "hardcover-fiction"):
    """
    Si se recibe un parámetro 'genre', se usa ese valor como nombre de la lista;
    de lo contrario, se usa "hardcover-fiction" por defecto.
    """
    books = await fetch_nyt_books(list_type=genre)
    return books
