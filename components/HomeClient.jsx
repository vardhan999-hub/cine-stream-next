'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import MovieGrid from './MovieGrid';
import { fetchPopularMovies, searchMovies } from '@/lib/api';
import { getFavorites, toggleFavorite } from '@/lib/favorites';

const dedupe = (arr) =>
  Array.from(new Map(arr.map((m) => [m.id, m])).values());

const HomeClient = ({ initialMovies, totalPages: initialTotalPages, fetchError }) => {
  const [movies, setMovies]           = useState(initialMovies);
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(initialTotalPages);
  const [loading, setLoading]         = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery]             = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [favIds, setFavIds]           = useState(new Set());
  const [toast, setToast]             = useState(null);
  const sentinelRef                   = useRef(null);
  const toastRef                      = useRef(null);

  const showToast = useCallback((msg) => {
    clearTimeout(toastRef.current);
    setToast(msg);
    toastRef.current = setTimeout(() => setToast(null), 2500);
  }, []);


  useEffect(() => {
    setFavIds(new Set(getFavorites().map((m) => m.id)));
  }, []);

  
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(t);
  }, [query]);

  
  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setPage(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      try {
        const data = debouncedQuery
          ? await searchMovies(debouncedQuery, 1)
          : await fetchPopularMovies(1);

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [debouncedQuery]);

  
  const loadMore = useCallback(async () => {
    if (loadingMore || loading || page >= totalPages) return;

    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      const data = debouncedQuery
        ? await searchMovies(debouncedQuery, nextPage)
        : await fetchPopularMovies(nextPage);

      setMovies((prev) => dedupe([...prev, ...(data.results || [])]));
      setPage(nextPage);
    } catch (err) {
      console.error('Failed to load more movies:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, loading, page, totalPages, debouncedQuery]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingMore && !loading && page < totalPages) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    const el = sentinelRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [loadingMore, loading, page, totalPages, loadMore]);

  const handleToggleFav = useCallback((movie) => {
    if (!movie || !movie.id) return;

    const { added } = toggleFavorite(movie);
    setFavIds(new Set(getFavorites().map((m) => m.id)));

    showToast(
      added
        ? `❤️ Added "${movie.title}"`
        : `🖤 Removed "${movie.title}"`
    );
  }, [showToast]);

  const sectionTitle = debouncedQuery
    ? `Results for "${debouncedQuery}"`
    : 'POPULAR MOVIES';

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="hero">
        <p className="hero-eyebrow">↯ DISCOVER</p>
        <h1 className="hero-title">
          YOUR NEXT<br />
          <em>Obsession</em>
        </h1>
        <p className="hero-sub">Millions of movies. Start exploring.</p>
      </div>

      {/* Search */}
      <SearchBar value={query} onChange={setQuery} />

      {/* Header */}
      <div className="section-header">
        <h2 className="section-title">{sectionTitle}</h2>
        {!loading && movies.length > 0 && (
          <span className="section-count">{movies.length} loaded</span>
        )}
      </div>

      {/* Error */}
      {fetchError && (
        <div className="error-banner">
          🔑 {fetchError.includes('TMDB_API_KEY')
            ? 'Add your TMDB_API_KEY to .env.local'
            : fetchError}
        </div>
      )}

      {/* Grid */}
      <MovieGrid
        movies={movies}
        loading={loading}
        loadingMore={loadingMore}
        hasMore={page < totalPages}
        favIds={favIds}
        onToggleFav={handleToggleFav}
      />

      {/* Infinite scroll trigger */}
      <div ref={sentinelRef} className="scroll-sentinel" />

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default HomeClient;