// src/App.test.tsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

// Aseguramos que antes de cada test se reinicien los mocks de fetch.
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('App Component', () => {
  test('renders heading and fetches default books on load', async () => {
    // Configuramos la respuesta del mock para la llamada inicial (default, sin género)
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            book_details: [
              {
                title: 'Test Book',
                author: 'Test Author',
                description: 'Test Description',
              },
            ],
          },
        ],
      })
    );

    render(<App />);
    
    // Verificamos que se muestre el título principal
    const heading = screen.getByText(/Libros recomendados por el NYT/i);
    expect(heading).toBeInTheDocument();

    // Esperamos a que se muestre el libro simulado
    await waitFor(() => {
      expect(screen.getByText(/Test Book/i)).toBeInTheDocument();
    });
  });

  test('fetches and displays books when genre is changed', async () => {
    // Configuramos una respuesta para la llamada inicial (aunque no se mostrará si se cambia rápido)
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            book_details: [
              {
                title: 'Test Book',
                author: 'Test Author',
                description: 'Test Description',
              },
            ],
          },
        ],
      })
    );

    render(<App />);
    
    // Configuramos la respuesta para la nueva llamada cuando se cambie el género
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            book_details: [
              {
                title: 'Romance Book',
                author: 'Romance Author',
                description: 'Romance Description',
              },
            ],
          },
        ],
      })
    );

    // Buscamos el input de género y simulamos un cambio (ej.: "romance")
    const input = screen.getByLabelText(/Filtrar por género/i);
    fireEvent.change(input, { target: { value: 'romance' } });

    // Esperamos a que se muestre el nuevo libro
    await waitFor(() => {
      expect(screen.getByText(/Romance Book/i)).toBeInTheDocument();
    });
  });
});
