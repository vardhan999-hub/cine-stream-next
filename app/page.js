import { fetchPopularMovies } from '@/lib/api';
import HomeClient from '@/components/HomeClient';


export const metadata = {
  title: 'Cine·Stream — Discover Movies',
  description: 'Browse millions of popular movies. Search, save favorites, and find your next obsession.',
};

export default async function HomePage() {
  let initialMovies = [];
  let totalPages = 1;
  let fetchError = null;

  try {
    const data = await fetchPopularMovies(1);
    initialMovies = data.results;
    totalPages = data.total_pages;
  } catch (err) {
    fetchError = err.message;
  }

  return (
    <HomeClient
      initialMovies={initialMovies}
      totalPages={totalPages}
      fetchError={fetchError}
    />
  );
}