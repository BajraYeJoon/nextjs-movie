import { Suspense } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/movie/movie-card';
import MovieListSkeleton from '@/components/movie/movie-loading';
import PaginationControls from '@/components/pagination';
import SearchBar from '@/components/search-bar';
import GenreFilter from '@/components/genre-filter';
import { getMovies, searchMovies, getMoviesByGenre, getGenres } from '@/lib/tmdb';
import { X } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string; genre?: string }>;
}

const MOVIES_PER_PAGE = 10;

async function MovieList({ page, query, genreId, genres }: { page: number; query?: string; genreId?: string; genres: { id: number; name: string }[] }) {
  let data;
  if (query) {
    data = await searchMovies(query, page);
  } else if (genreId) {
    data = await getMoviesByGenre(parseInt(genreId), page);
  } else {
    data = await getMovies(page);
  }
  
  const genreName = genres.find(g => g.id.toString() === genreId)?.name;
  
  const paginatedResults = data.results?.slice(0, MOVIES_PER_PAGE) || [];
  const totalPages = Math.ceil((data.total_results || 0) / MOVIES_PER_PAGE);

  if (paginatedResults.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-muted-foreground">No movies found</p>
      </div>
    );
  }

  return (
    <>
      {query && (
        <h2 className="text-xl text-muted-foreground mb-6">
          Search results for &quot;{query}&quot;
        </h2>
      )}
      {genreId && genreName && (
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl text-muted-foreground">
            Results for {genreName}
          </h2>
          <Link href="/" className="inline-flex items-center justify-center h-6 w-6 rounded hover:bg-card/80 transition-colors cursor-pointer">
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </Link>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {paginatedResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <PaginationControls currentPage={page} totalPages={Math.min(50, totalPages)} />
    </>
  );
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Math.min(50, parseInt(params.page || '1', 10)));
  const query = params.q;
  const genreId = params.genre;
  const genres = await getGenres();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1920px] mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">Movies</h1>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="flex-1 md:flex-none md:w-80">
              <SearchBar />
            </div>
            <GenreFilter />
          </div>
        </div>
        
        <Suspense fallback={<MovieListSkeleton />}>
          <MovieList page={page} query={query} genreId={genreId} genres={genres} />
        </Suspense>
      </div>
    </div>
  );
}
