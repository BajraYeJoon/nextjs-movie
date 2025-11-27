"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Info } from "lucide-react";
import { Movie } from "@/types/movie-type";
import { getFavorites } from "@/lib/favorites";
import FavoriteButton from "../movie/favorite-button";

export default function FavoritesList() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setFavorites(getFavorites());
    }, 0);
  }, []);

  if (favorites.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        You have no any favorite movies.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {favorites?.map((movie) => {
        const posterUrl = movie?.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/placeholder-poster.svg";
        const releaseYear = movie?.release_date
          ? new Date(movie?.release_date).getFullYear()
          : "N/A";

        return (
          <div
            key={movie?.id}
            className="group relative flex flex-col cursor-pointer overflow-hidden rounded-xl bg-card transition-shadow duration-500 ease-out hover:shadow-2xl hover:shadow-primary/20"
          >
            <Link
              href={`/movie/${movie?.id}`}
              prefetch
              className="flex-1 flex flex-col"
            >
              <div className="relative aspect-2/3 bg-muted overflow-hidden">
                <Image
                  src={posterUrl}
                  alt={movie?.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-50"
                  loading="lazy"
                />

                <button className="infobutton absolute inset-0 m-auto flex h-12 w-12 items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-full border border-foreground/50 bg-background/10 backdrop-blur-sm hover:bg-foreground hover:text-background">
                  <Info className="h-6 w-6" />
                </button>

                <div className="rating absolute top-3 right-3 flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 backdrop-blur-sm">
                  <Star className="size-3.5 fill-primary text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    {movie?.vote_average.toFixed(1)}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-linear-to-t from-card via-card/80 to-transparent" />
              </div>

              <div className="title px-4 pb-4 -mt-8 flex flex-col justify-end">
                <h3 className="text-lg font-semibold leading-tight text-foreground line-clamp-2 mb-2">
                  {movie?.title}
                </h3>
                <span className="text-sm text-muted-foreground font-medium">
                  {releaseYear}
                </span>
              </div>
            </Link>

            <FavoriteButton movie={movie} />
          </div>
        );
      })}
    </div>
  );
}
