import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('App Component', () => {
  test('renders heading and fetches default books on load', async () => {
    // Simula una respuesta con un arreglo de libros
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          title: 'Test Book',
          author: 'Test Author',
          description: 'Test Description',
        },
      ])
    );

    render(<App />);
    
    // Verifica que se muestre el heading
    const heading = screen.getByText(/Libros recomendados por el NYT/i);
    expect(heading).toBeInTheDocument();

    // Espera a que se muestre el libro simulado
    await waitFor(() => {
      expect(screen.getByText(/Test Book/i)).toBeInTheDocument();
    });
  });

  test('fetches and displays books when genre is changed', async () => {
    // Primero, simulamos una respuesta vacía en la carga inicial
    fetchMock.mockResponseOnce(JSON.stringify([]));

    render(<App />);
    
    // Preparamos la respuesta para cuando se cambie el género a "romance"
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          title: 'Romance Book',
          author: 'Romance Author',
          description: 'Romance Description',
        },
      ])
    );

    // Buscamos el input del género y simulamos un cambio
    const input = screen.getByLabelText(/Filtrar por género/i);
    fireEvent.change(input, { target: { value: 'romance' } });

    // Espera a que se muestre el nuevo libro
    await waitFor(() => {
      expect(screen.getByText(/Romance Book/i)).toBeInTheDocument();
    });
  });
});
