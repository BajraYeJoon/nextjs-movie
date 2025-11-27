import { Movie } from '@/types/movie-type';

export function getFavorites(): Movie[] {
  const data = localStorage.getItem('favorites');
  return data ? JSON.parse(data) : [];
}

export function saveFavorites(movies: Movie[]) {
  localStorage.setItem('favorites', JSON.stringify(movies));
}

export function isFavorite(movieId: number): boolean {
  return getFavorites().some(m => m.id === movieId);
}

export function toggleFavorite(movie: Movie): boolean {
  const favs = getFavorites();
  const exists = favs.some(m => m.id === movie.id);
  saveFavorites(exists ? favs.filter(m => m.id !== movie.id) : [...favs, movie]);
  return !exists;
}
