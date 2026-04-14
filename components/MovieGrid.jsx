'use client';

import MovieCard from './MovieCard';
import Loader from './Loader';

const MovieGrid = ({ movies, loading, loadingMore, hasMore, favIds, onToggleFav }) => {
  if (loading) return <Loader text="Fetching movies…" />;

  if (!movies.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎬</div>
        <p className="empty-title">NO RESULTS FOUND</p>
        <p className="empty-desc">Try a different search term or browse popular movies.</p>
      </div>
    );
  }

  return (
    <>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFav={favIds.has(movie.id)}
            onToggleFav={onToggleFav}
          />
        ))}
      </div>

      {loadingMore && <Loader text="Loading more…" />}

      {!hasMore && movies.length > 0 && (
        <p style={{ textAlign: 'center', padding: '32px 0', color: 'var(--muted)', fontSize: '13px', letterSpacing: '1px' }}>
          — END OF RESULTS —
        </p>
      )}
    </>
  );
};

export default MovieGrid;