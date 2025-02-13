import React from 'react';

interface Book {
  title: string;
  author: string;
  description?: string;
  [key: string]: any;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div>
      {books.length === 0 ? (
        <p>No hay libros disponibles.</p>
      ) : (
        books.map((book, index) => (
          <div key={index} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
            <h3>{book.title}</h3>
            <p><strong>Autor:</strong> {book.author}</p>
            {book.description && <p>{book.description}</p>}
            {/* Botón de Amazon (no implementa integración, redirige a una URL ficticia) */}
            <a href={`https://www.amazon.com/s?k=${encodeURIComponent(book.title)}`} target="_blank" rel="noopener noreferrer">
              Ver en Amazon
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default BookList;
