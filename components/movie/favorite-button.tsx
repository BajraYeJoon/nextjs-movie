'use client';

import { Heart } from 'lucide-react';
import React, { useState } from 'react';
import { Movie } from '@/types/movie-type';
import { isFavorite, toggleFavorite } from '@/lib/favorites';

export default function FavoriteButton({ movie }: { movie: Movie }) {
  const [isFav, setIsFav] = useState(() => {
    if (typeof window === 'undefined') return false;
    return isFavorite(movie.id);
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFav(toggleFavorite(movie));
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all"
    >
      <Heart
        size={16}
        className={` ${isFav ? "fill-primary text-primary" : ""}`}
      />
    </button>
  );
}
