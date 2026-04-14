'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import { getFavorites, toggleFavorite } from '@/lib/favorites';

const FavoritesClient = () => {
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast]         = useState(null);
  const toastRef                  = useRef(null); 

  const showToast = useCallback((msg) => {
    clearTimeout(toastRef.current);
    setToast(msg);
    toastRef.current = setTimeout(() => setToast(null), 2500);
  }, []);

  
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

 
  useEffect(() => {
    const sync = () => setFavorites(getFavorites());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const favIds = new Set(favorites.map((m) => m.id));

  const handleToggleFav = useCallback((movie) => {
    if (!movie || !movie.id) return;
    const { added } = toggleFavorite(movie);
    setFavorites(getFavorites());
    showToast(added ? `❤️ Added "${movie.title}"` : `🖤 Removed "${movie.title}"`);
  }, [setFavorites, showToast]);


  const avgRating = favorites.length
    ? Number(
        favorites.reduce((sum, m) => sum + (m.vote_average || 0), 0) / favorites.length
      ).toFixed(1)
    : '—';

  return (
    <div className="page-wrapper">
      <div className="hero">
        <p className="hero-eyebrow">↯ COLLECTION</p>
        <h1 className="hero-title">MY<br /><em>Favorites</em></h1>
      </div>

      {favorites.length > 0 && (
        <div className="fav-stats">
          <div className="fav-stat">
            <div className="fav-stat-number">{favorites.length}</div>
            <div className="fav-stat-label">FILMS SAVED</div>
          </div>
          <div className="fav-stat">
            <div className="fav-stat-number">{avgRating}</div>
            <div className="fav-stat-label">AVG RATING</div>
          </div>
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🤍</div>
          <p className="empty-title">NO FAVORITES YET</p>
          <p className="empty-desc">Tap the heart icon on any movie to save it here.</p>
        </div>
      ) : (
        <>
          <div className="section-header">
            <h2 className="section-title">SAVED FILMS</h2>
          </div>
          <div className="movie-grid">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFav={favIds.has(movie.id)}
                onToggleFav={handleToggleFav}
              />
            ))}
          </div>
        </>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default FavoritesClient;