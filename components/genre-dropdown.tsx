'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useState } from 'react';
import { Filter } from 'lucide-react';

interface GenreDropdownProps {
  genres: { id: number; name: string }[];
}

export default function GenreDropdown({ genres }: GenreDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [_, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const selectedGenre = searchParams.get('genre');

  const handleGenreChange = (genreId: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (genreId === 'all') {
        params.delete('genre');
      } else {
        params.set('genre', genreId);
      }
      params.set('page', '1');
      router.push(`/?${params.toString()}`);
    });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center h-10 w-10 rounded-lg bg-card border border-border text-foreground  cursor-pointer transition-colors
          ${isOpen ? 'bg-primary' : 'bg-transparent'}
          `}
      >

        <Filter className={`h-5 w-5 `}  />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            <button
              onClick={() => handleGenreChange('all')}
              className={`w-full text-left px-4 py-2 transition-colors cursor-pointer ${
                !selectedGenre
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-card/80'
              }`}
            >
              All Genres
            </button>
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreChange(genre.id.toString())}
                className={`w-full text-left px-4 py-2 transition-colors cursor-pointer ${
                  selectedGenre === genre.id.toString()
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-card/80'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
