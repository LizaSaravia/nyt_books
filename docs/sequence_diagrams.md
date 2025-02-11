# Diagramas de Secuencia

## 5.1. Integración con NYT

```mermaid
sequenceDiagram
    participant BG as Background Task
    participant API as NYT API
    participant LOG as Logger

    BG->>API: Realiza solicitud GET a /svc/books/v3/lists/current/...
    API-->>BG: Responde con datos JSON
    BG->>LOG: Registra "Datos obtenidos del NYT"
    BG->>BG: Actualiza BOOKS_DATA en memoria


sequenceDiagram
    participant UI as Usuario
    participant FE as Frontend (React)
    participant BE as Backend (Books Service)
    participant AMZ as Amazon API

    UI->>FE: Hace clic en "Ver en Amazon"
    FE->>AMZ: (Potencial) Solicita información del libro
    AMZ-->>FE: Retorna detalles del producto
    FE->>UI: Redirige a la página del producto en Amazon

sequenceDiagram
    participant FE as Frontend (React)
    participant OR as O'Reilly API
    participant LOG as Logger

    FE->>OR: Solicita precio para libro técnico
    OR-->>FE: Retorna precio y disponibilidad
    FE->>LOG: Registra información del precio
