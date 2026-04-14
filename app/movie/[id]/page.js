import { fetchMovieDetails, IMG_BASE } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';


export async function generateMetadata({ params }) {
  
  const { id } = await params;
  try {
    const movie = await fetchMovieDetails(id);
    return {
      title: `${movie.title} (${movie.release_date?.slice(0, 4)}) — Cine·Stream`,
      description: movie.overview || `Watch ${movie.title} on Cine·Stream.`,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: movie.poster_path
          ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`]
          : [],
      },
    };
  } catch (err) {
    console.error('generateMetadata error:', err);
    return {
      title: 'Movie Not Found — Cine·Stream',
      description: 'This movie could not be found.',
    };
  }
}


export default async function MovieDetailPage({ params }) {

  const { id } = await params;
  let movie = null;

  try {
    movie = await fetchMovieDetails(id);
  } catch (err) {
    console.error('MovieDetailPage error:', err);
  }

  
  if (!movie) notFound();

  const year = movie.release_date?.slice(0, 4) || '—';
  
  const rating = movie.vote_average
    ? Number(movie.vote_average).toFixed(1)
    : '—';
  const runtime = movie.runtime ? `${movie.runtime} min` : '—';
  const posterUrl = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : null;

  return (
    <div className="movie-detail">
      {/* Back link */}
      <Link href="/" className="movie-detail-back">
        ← Back to Discover
      </Link>

      <div className="movie-detail-inner">
        {/* Poster */}
        <div className="movie-detail-poster">
          {posterUrl ? (
            <Image
              src={posterUrl}
              
              alt={movie.title || 'Movie poster'}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          ) : (
            <div style={{ background: 'var(--bg3)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
              No Poster
            </div>
          )}
        </div>

        {/* Info */}
        <div className="movie-detail-info">
          <h1 className="movie-detail-title">{movie.title} ({year})</h1>

          {movie.tagline && (
            <p className="movie-detail-tagline">"{movie.tagline}"</p>
          )}

          {/* Meta badges */}
          <div className="movie-detail-meta">
            <span className="movie-detail-badge movie-detail-rating">⭐ {rating}</span>
            <span className="movie-detail-badge">{year}</span>
            <span className="movie-detail-badge">{runtime}</span>
          </div>

          {/* Genres */}
          {movie.genres?.length > 0 && (
            <div className="movie-detail-genres">
              {movie.genres.map((g) => (
                <span key={g.id} className="genre-tag">{g.name}</span>
              ))}
            </div>
          )}

          {/* Overview */}
          {movie.overview && (
            <p className="movie-detail-overview">{movie.overview}</p>
          )}
        </div>
      </div>
    </div>
  );
}