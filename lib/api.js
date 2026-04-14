const BASE_URL = 'https://api.themoviedb.org/3';

export const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
export const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original';

const getKey = () => {
  return process.env.NEXT_PUBLIC_TMDB_API_KEY;
};

const apiFetch = async (endpoint, params = {}) => {
  const apiKey = getKey();

  if (!apiKey) {
    console.warn('TMDB API key is missing');
    return { results: [], total_pages: 1 };
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('language', 'en-US');

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      url.searchParams.set(k, v);
    }
  });

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // ISR (cache 1 hour)
    });

    if (!res.ok) {
      console.error(`TMDB error: ${res.status}`);
      return { results: [], total_pages: 1 };
    }

    return res.json();
  } catch (error) {
    console.error('API fetch failed:', error);
    return { results: [], total_pages: 1 };
  }
};

export const fetchPopularMovies = (page = 1) =>
  apiFetch('/movie/popular', { page });

export const searchMovies = (query, page = 1) =>
  apiFetch('/search/movie', { query, page, include_adult: false });

export const fetchMovieDetails = (id) =>
  apiFetch(`/movie/${id}`);