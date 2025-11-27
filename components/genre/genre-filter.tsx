import GenreDropdown from './genre-dropdown';
import { getGenres } from '@/lib/tmdb';

export default async function GenreFilter() {
  const genres = await getGenres();

  return <GenreDropdown genres={genres} />;
}
