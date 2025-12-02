'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
import { Movie } from '@/types/movie-type';

interface SearchProps {
  searchParams: { q?: string; genre?: string };
}

const MOVIES_PER_PAGE = 20;

export default function InfiniteScrollMovies({ searchParams }: SearchProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [genreName, setGenreName] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useRef<HTMLDivElement>(null);

  const query = searchParams.q;
  const genreId = searchParams.genre;

  // Load genres on mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await getGenres();
        setGenres(genresData);
        
        if (genreId) {
          const genre = genresData.find((g: { id: number; name: string }) => g.id.toString() === genreId);
          if (genre) {
            setGenreName(genre.name);
          }
        }
      } catch (error) {
        console.error("Failed to load genres:", error);
      }
    };

    loadGenres();
  }, [genreId]);

  // Load movies function
  const loadMovies = useCallback(async (pageNum: number) => {
    if (loading) return;
    
    setLoading(true);
    try {
      let data;
      
      if (query) {
        data = await searchMovies(query, pageNum);
      } else if (genreId) {
        data = await getMoviesByGenre(parseInt(genreId), pageNum);
      } else {
        data = await getMovies(pageNum);
      }

      const newMovies = data?.results || [];
      const totalResults = data?.total_results || 0;
      
      setTotalPages(Math.ceil(totalResults / MOVIES_PER_PAGE));
      
      if (pageNum === 1) {
        setMovies(newMovies);
      } else {
        setMovies(prev => [...prev, ...newMovies]);
      }
      
      setHasMore(pageNum < Math.min(50, Math.ceil(totalResults / MOVIES_PER_PAGE)));
    } catch (error) {
      console.error("Failed to load movies:", error);
    } finally {
      setLoading(false);
    }
  }, [query, genreId, loading]);

  // Load initial movies
  useEffect(() => {
    setPage(1);
    loadMovies(1);
  }, [query, genreId, loadMovies]);

  // Handle infinite scroll
  useEffect(() => {
    if (loading || !hasMore) return;

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (lastMovieElementRef.current) {
      observer.current.observe(lastMovieElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  // Load more movies when page changes
  useEffect(() => {
    if (page > 1) {
      loadMovies(page);
    }
  }, [page, loadMovies]);

  // Reset scroll position when search/query changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query, genreId]);

  const handleClearGenre = () => {
    // This would require router navigation in a real implementation
    // For demo purposes, we'll just show how it would work
    console.log("Would navigate to clear genre filter");
  };

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

      {/* Search/Genre header */}
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
          <button
            onClick={handleClearGenre}
            className="flex items-center justify-center h-6 w-6 rounded hover:bg-card/80 transition-colors"
          >
            <X className="size-4 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      )}

      {/* Movie grid */}
      <div className="movie-cards-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {movies.map((movie, index) => {
          // Attach ref to the last movie element for infinite scroll
          if (movies.length === index + 1) {
            return (
              <div ref={lastMovieElementRef} key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            );
          }
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="py-6">
          <MovieListSkeleton />
        </div>
      )}

      {/* End of results message */}
      {!hasMore && movies.length > 0 && (
        <div className="text-center py-6 text-muted-foreground">
          You've reached the end of the movies collection
        </div>
      )}

      {/* No results message */}
      {movies.length === 0 && !loading && (
        <p className="text-center text-muted-foreground py-12">No movies found</p>
      )}
    </div>
  );
}