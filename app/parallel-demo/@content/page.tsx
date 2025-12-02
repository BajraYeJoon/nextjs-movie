import { Suspense } from 'react';
import MovieCard from '@/components/movie/movie-card';
import MovieListSkeleton from "@/components/movie/movie-loading";
import { getMovies } from "@/lib/tmdb";

export default async function ContentSlot() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-foreground mb-4">Popular Movies</h3>
        <Suspense fallback={<MovieListSkeleton />}>
          <MovieList />
        </Suspense>
      </div>
    </div>
  );
}

async function MovieList() {
  const data = await getMovies(1);
  const movies = data?.results?.slice(0, 12) || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}