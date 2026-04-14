const FAVORITES_KEY = 'cinestream_favorites';

export const getFavorites = () => {
  
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read favorites:', err);
    return [];
  }
};

export const toggleFavorite = (movie) => {
 
  if (typeof window === 'undefined') return { added: false };
 
  if (!movie || !movie.id) return { added: false };

  const favorites = getFavorites();
  const exists = favorites.find((m) => m.id === movie.id);
  const updated = exists
    ? favorites.filter((m) => m.id !== movie.id)
    : [movie, ...favorites];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return { added: !exists };
};