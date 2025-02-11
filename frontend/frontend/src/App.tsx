// frontend/src/App.tsx

import React, { useState, useEffect } from 'react';
import './App.css';
import BookList from './components/BookList';

const App: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [genre, setGenre] = useState<string>('');

  useEffect(() => {
    // ajusta el puerto si es necesario
    fetch(`http://localhost:8000/books${genre ? `?genre=${genre}` : ''}`)
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, [genre]);

  return (
    <div className="App">
      <h1>Libros recomendados por el NYT</h1>
      <div>
        <label htmlFor="genre">Filtrar por género: </label>
        <input
          id="genre"
          type="text"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />
      </div>
      <BookList books={books} />
    </div>
  );
};

export default App;
