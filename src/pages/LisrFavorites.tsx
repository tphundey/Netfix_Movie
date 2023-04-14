import { CloseCircleOutlined } from '@ant-design/icons';
import { message } from 'antd';
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
            message.success("Remove success")
          })
          .catch(error => console.error(error));
      };
    return (
        <div style={{ backgroundColor: '#222222', color: 'white' }}>
            <h1>Favorite Movies</h1>
            <div style={{ display: 'flex', gap: '30px' }}>
                {Object.values(filteredFavorites).map(movie => (
                   
                        <div key={movie.id}>
                             <a href={`/products/${movie.id}`}>
                            <img width={'200px'} src={movie.image} alt="" />
                            <p>{movie.name}</p>
                            </a>
                            <button style={{backgroundColor:'none'}} onClick={() => handleDelete(movie.favoriteId)}><CloseCircleOutlined /></button>
                        </div>
                       
                ))}
            </div>
        </div>
    );
}

export default FavoriteMovies;
