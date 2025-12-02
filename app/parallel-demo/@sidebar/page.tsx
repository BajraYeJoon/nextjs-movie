'use client';

import { useState } from 'react';
import GenreFilter from "@/components/genre/genre-filter";
import SearchBar from "@/components/search-bar";

export default function SidebarSlot() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-foreground mb-2">Search</h3>
        <SearchBar />
      </div>
      
      <div>
        <h3 className="font-medium text-foreground mb-2">Genres</h3>
        <GenreFilter />
      </div>
      
      <div>
        <h3 className="font-medium text-foreground mb-2">Release Year</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-muted-foreground">2024</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-muted-foreground">2023</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-muted-foreground">2022</span>
          </label>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-foreground mb-2">Rating</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-muted-foreground">★ ★ ★ ★ ★ (5 stars)</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-muted-foreground">★ ★ ★ ★ ☆ & up (4 stars)</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-muted-foreground">★ ★ ★ ☆ ☆ & up (3 stars)</span>
          </label>
        </div>
      </div>
    </div>
  );
}