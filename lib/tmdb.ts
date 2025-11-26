import { MovieListResponse, MovieDetail } from "@/types/movie-type";

const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFromTMDB(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

export async function getMovies(page: number = 1): Promise<MovieListResponse> {
  return fetchFromTMDB(`/discover/movie?page=${page}`);
}

export async function searchMovies(query: string, page: number = 1): Promise<MovieListResponse> {
  return fetchFromTMDB(`/search/movie?query=${query}&page=${page}`);
}

export async function getMoviesByGenre(genreId: number, page: number = 1): Promise<MovieListResponse> {
  return fetchFromTMDB(`/discover/movie?with_genres=${genreId}&page=${page}`);
}

export async function getMovieDetails(movieId: number): Promise<MovieDetail> {
  return fetchFromTMDB(`/movie/${movieId}?append_to_response=credits,videos,images,similar`);
}

export async function getGenres() {
  const response = await fetchFromTMDB('/genre/movie/list');
  return response.genres;
}

export async function getGenreNames(genreIds: number[]): Promise<string[]> {
  const genres = await getGenres();
  const genreMap = new Map(genres.map((g: { id: number; name: string }) => [g.id, g.name]));
  return genreIds.map(id => genreMap.get(id)).filter(Boolean) as string[];
}
