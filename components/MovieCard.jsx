'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IMG_BASE } from '../lib/api';

const StarIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const MovieCard = ({ movie, isFav, onToggleFav }) => {
  const posterUrl = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : null;

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : '—';

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : '—';

  const handleFavClick = (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    onToggleFav(movie);
  };

  return (
    
    <Link href={`/movie/${movie.id}`}>
      <article className="movie-card">
        <div className="card-poster-wrap">
          {posterUrl ? (
            <Image
              className="card-poster"
              src={posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 50vw, 200px"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="card-no-poster">
              <span className="card-no-poster-icon">🎬</span>
              <span>No Poster</span>
            </div>
          )}

          {/* Rating badge */}
          <div className="card-rating">
            <StarIcon />
            {rating}
          </div>

          {/* Favorite button */}
          <button
            className={`card-fav${isFav ? ' is-fav' : ''}`}
            onClick={handleFavClick}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <HeartIcon filled={isFav} />
          </button>

          {/* Hover overlay */}
          <div className="card-overlay">
            <p className="card-overlay-text">
              {movie.overview?.slice(0, 160) || 'No description available.'}
            </p>
          </div>
        </div>

        <div className="card-body">
          <p className="card-title">{movie.title}</p>
          <p className="card-meta">{year}</p>
        </div>
      </article>
    </Link>
  );
};

export default MovieCard;
