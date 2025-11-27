import { Suspense } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/movie/movie-card';
import MovieListSkeleton from "@/components/movie/movie-loading";
import SearchBar from "@/components/search-bar";
import GenreFilter from "@/components/genre/genre-filter";
import FavoritesButton from "@/components/favorite/favorites-header";
import {
  getMovies,
  searchMovies,
  getMoviesByGenre,
  getGenres,
} from "@/lib/tmdb";
import { X } from "lucide-react";
import Pagination from "@/components/pagination";

interface searchProps {
  searchParams: Promise<{ page?: string; q?: string; genre?: string }>;
}

const MOVIES_PER_PAGE = 10;

export default async function Home({ searchParams }: searchProps) {
  const params = await searchParams;
  const page = Math.max(1, Math.min(50, parseInt(params.page || "1", 10)));
  const query = params.q;
  const genreId = params.genre;
  const genres = await getGenres();

  return (
    <div className="main-container flex flex-col gap-4 px-6 py-6 max-w-[1620px] mx-auto bg-background">
      <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-foreground">Movies</h1>

        <div className="filters flex gap-2 w-full md:w-auto">
          <SearchBar />
          <FavoritesButton />
          <GenreFilter />
        </div>
      </div>

      <Suspense fallback={<MovieListSkeleton />}>
        <MovieList
          page={page}
          query={query}
          genreId={genreId}
          genres={genres}
        />
      </Suspense>
    </div>
  );
}

async function MovieList({
  page,
  query,
  genreId,
  genres,
}: {
  page: number;
  query?: string;
  genreId?: string;
  genres: { id: number; name: string }[];
}) {
  let data;

  if (query) {
    data = await searchMovies(query, page);
  } else if (genreId) {
    data = await getMoviesByGenre(parseInt(genreId), page);
  } else {
    data = await getMovies(page);
  }

  const genreName = genreId
    ? genres?.find((g) => g.id.toString() === genreId)?.name
    : null;
  const paginatedResults = data?.results?.slice(0, MOVIES_PER_PAGE) || [];
  const totalPages = Math.ceil((data?.total_results || 0) / MOVIES_PER_PAGE);

  if (paginatedResults?.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">No movies found</p>
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
          <Link
            href="/"
            className="flex items-center justify-center h-6 w-6 rounded hover:bg-card/80 transition-colors"
          >
            <X className="size-4 text-muted-foreground hover:text-foreground" />
          </Link>
        </div>
      )}

      <div className="movie-cards-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {paginatedResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={Math.min(50, totalPages)} />
    </>
  );
}

