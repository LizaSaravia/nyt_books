import logging
import asyncio
from typing import List, Dict

import httpx
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from tenacity import retry, stop_after_attempt, wait_fixed

app = FastAPI(title="Integración NYT - Books Service")

# Comunicación con el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("nyt_integration")

# Simulación de almacenamiento en memoria
BOOKS_DATA: List[Dict] = []


# Función que integra con el API del NYT
@retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
async def fetch_nyt_books():
    logger.info("Intentando conectar con el API del NYT...")
    # Reemplazar con url real
    url = "https://api.nytimes.com/svc/books/v3/lists.json"
    params = {"api-key": "ce5DXwvXL79iSg3ajeg79L5h4DJ4JZXd"}
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        response.raise_for_status()  # Si falla, se lanzará una excepción y se reintentará.
        data = response.json()
        logger.info("Datos obtenidos del NYT")
        return data.get("results", {}).get("books", [])


async def update_books_data():
    global BOOKS_DATA
    try:
        books = await fetch_nyt_books()
        BOOKS_DATA = books 
        logger.info(f"Se actualizaron {len(books)} libros desde el NYT")
    except Exception as e:
        logger.error(f"Error al obtener datos del NYT: {e}")


# Tarea en segundo plano
async def periodic_book_update():
    while True:
        await update_books_data()
        await asyncio.sleep(60 * 10)  # Actualiza cada 10 minutos


# Evento de inicio de la aplicación para lanzar la tarea en background
@app.on_event("startup")
async def startup_event():
    # Inicialmente actualizamos la data
    await update_books_data()
    # Ejecutamos la tarea en background sin bloquear el servidor
    asyncio.create_task(periodic_book_update())


# Endpoint que retorna los libros actuales
@app.get("/books", response_model=List[Dict])
async def get_books(genre: str = None):
    if genre:
        filtered_books = [book for book in BOOKS_DATA if genre.lower() in book.get("description", "").lower()]
        return filtered_books
    return BOOKS_DATA
