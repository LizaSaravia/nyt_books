// src/components/BookList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import BookList from './BookList';

describe('BookList Component', () => {
  test('displays message when no books are available', () => {
    render(<BookList books={[]} />);
    expect(screen.getByText(/No hay libros disponibles/i)).toBeInTheDocument();
  });

  test('renders book details correctly', () => {
    const books = [
      {
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description',
      },
    ];
    render(<BookList books={books} />);
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText(/Test Author/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();

    // Verifica que el enlace a Amazon contenga el título codificado
    const amazonLink = screen.getByText(/Ver en Amazon/i);
    expect(amazonLink).toHaveAttribute(
      'href',
      expect.stringContaining(encodeURIComponent('Test Book'))
    );
  });
});
