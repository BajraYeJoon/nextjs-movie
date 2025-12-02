import Image from "next/image";
import Link from "next/link";
import { Star, Info } from "lucide-react";
import { Movie } from "@/types/movie-type";
import { Suspense } from "react";
import { getGenreNames } from "@/lib/tmdb";
import FavoriteButton from "./favorite-button";

interface MovieCardProps {
  movie: Movie;
}

async function GenreDisplay({ genreIds }: { genreIds: number[] }) {
  const genres = await getGenreNames(genreIds);
  return (
    <span className="text-xs">{genres.slice(0, 2).join(" • ") || "N/A"}</span>
  );
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div className="group relative w-full cursor-pointer h-full flex flex-col">
      <div className="relative overflow-hidden rounded-xl bg-card transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col">
        <Link
          href={`/movie/${movie.id}?intercept=true`}
          prefetch={false}
          className="flex-1 flex flex-col"
        >
          <div className="relative aspect-2/3 overflow-hidden bg-muted">
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-50"
              loading="lazy"
            />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
              <button className="flex cursor-pointer h-12 w-12 items-center justify-center rounded-full border border-foreground/50 bg-background/10 backdrop-blur-sm transition-all hover:bg-foreground hover:text-background">
                <Info size={24} />
              </button>{" "}
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 backdrop-blur-sm">
              <Star className="size-3.5 fill-primary text-primary" />
              <span className="text-sm font-semibold text-foreground">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-card via-card/80 to-transparent" />
          </div>

          <div className="relative -mt-8 px-4 pb-4 flex-1 flex flex-col justify-end">
            <h3 className="mb-2 text-lg font-semibold leading-tight text-foreground line-clamp-2">
              {movie.title}
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{releaseYear}</span>
              <span className="hidden sm:block size-1 rounded-full bg-muted-foreground" />
              <Suspense fallback={<span className="text-xs">Loading...</span>}>
                <GenreDisplay genreIds={movie.genre_ids} />
              </Suspense>
            </div>
          </div>
        </Link>
        <div className="absolute top-3 left-3 z-10">
          <FavoriteButton movie={movie} />
        </div>
      </div>
    </div>
  );
}
