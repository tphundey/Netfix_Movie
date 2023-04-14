import React, { useState, useEffect } from 'react';

function FavoriteMovies() {
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    // lấy danh sách phim yêu thích từ API
    fetch('http://localhost:3000/favorites')
      .then(response => response.json())
      .then(data => {
        setFavorites(data);
        setFavoriteIds(data.map(fav => fav.id));
      });

    // lấy danh sách phim từ API
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => setMovies(data));
  }, []);

  // lọc danh sách các sản phẩm phù hợp
  const filteredFavorites = favorites.reduce((acc, fav) => {
    const movie = movies.find(movie => movie.id === fav.productId);
    if (movie && !acc[movie.id]) {
      acc[movie.id] = { ...movie, favoriteId: fav.id };
    }
    return acc;
  }, {});

  // xóa một phim yêu thích
  const handleDelete = (favoriteId) => {
    fetch(`http://localhost:3000/favorites/${favoriteId}`, { method: 'DELETE' })
      .then(() => {
        setFavorites(favorites.filter(fav => fav.id !== favoriteId));
        setFavoriteIds(favoriteIds.filter(id => id !== favoriteId));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Favorite Movies</h1>
      <ul>
        {Object.values(filteredFavorites).map(movie => (
          <li key={movie.id}>
            <p>{movie.name}</p>
            <button onClick={() => handleDelete(movie.favoriteId)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteMovies;
