'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFavorites } from '@/lib/favorites';

export default function FavoritesButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const favs = getFavorites();
      setCount(favs.length);
    };

    updateCount();
    const interval = setInterval(updateCount, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Link href="/favorites" className="badge- relative h-12 px-3 flex items-center justify-center rounded-lg bg-card hover:bg-card/80 border border-border transition-colors">
      <Heart size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 h-5  px-1 flex items-center justify-center text-xs font-bold bg-primary text-white rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}
