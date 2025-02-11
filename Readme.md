# BookBridge: Conectando Lectores y Libros Recomendados

¡Bienvenido a **BookBridge**!  
En BookBridge conectamos a los lectores con los libros recomendados por el New York Times, ofreciéndote una experiencia única para descubrir tu próxima gran lectura. Nuestra plataforma integra la información del NYT y te permite explorar libros por género, todo a través de una interfaz moderna construida con React y TypeScript.

---

## 🚀 Características

- **Integración con NYT**: Conecta con la API del New York Times para obtener libros recomendados.
- **Actualización en segundo plano**: Se actualiza automáticamente la lista de libros cada 10 minutos sin interrumpir al usuario.
- **Manejo inteligente de errores**: Utilizamos [tenacity](https://tenacity.readthedocs.io/en/latest/) para implementar reintentos en caso de fallos.
- **Interfaz de usuario intuitiva**: Construida con React y TypeScript, permite buscar y filtrar libros fácilmente.
- **Diagramas de secuencia**: Incluye documentación visual para futuras integraciones con Amazon y O'Reilly.
- **Tests automatizados**: Pruebas básicas para el backend con pytest.

---

## 📂 Estructura del Proyecto

```plaintext
nyt-integration/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── tests/
│       └── test_app.py
├── docs/
│   └── sequence_diagrams.md
├── frontend/
│   ├── package.json
│   └── src/
│       ├── App.tsx
│       └── components/
│           └── BookList.tsx
├── README.md
└── .gitignore
```
 
## 🔧 Requisitos
- **Backend**:
    - Python 3.8 o superior
- **Frontend**:
    - Node.js 14 o superior

## 🛠️ Instalación y Ejecución
- **Backend**:
1. Accede al directorio backend:
```
cd backend
```
2. Crea y activa el entorno virtual:
```
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```
3. Instala las dependencias:
```
pip install -r requirements.txt
```
4. Ejecuta la aplicación:
```
uvicorn app:app --reload --port 8000
```

- **Frontend**:
1. Accede al directorio frontend:
```
cd frontend
```
2. Instala las dependencias:
Si encuentras conflictos de dependencias, ejecuta:
```
npm install --legacy-peer-deps
```
De lo contrario, puedes probar con:
```
npm install
```
3. Inicia la aplicación:
```
npm start
```

## 🧪 Ejecución de Tests
Para ejecutar las pruebas del backend, desde el directorio backend ejecuta:
```
pytest
```

## 📑 Diagramas de Secuencia
Consulta el archivo docs/sequence_diagrams.md para ver los diagramas de secuencia que muestran:
- La integración con la API del NYT.
- Una posible integración con Amazon.
- Una posible integración con O'Reilly para libros técnicos.

## 📌 Notas Adicionales
- Base de datos: No se utiliza una base de datos. La información se guarda en memoria.
- Integraciones Futuras: Se incluyen diagramas para futuras integraciones con Amazon y O'Reilly.
- Buenas prácticas: Se sigue una arquitectura limpia/hexagonal y se incluyen tests para asegurar el correcto funcionamiento del servicio.