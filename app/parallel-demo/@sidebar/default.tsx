'use client';

import { useState } from 'react';
import GenreFilter from "@/components/genre/genre-filter";
import SearchBar from "@/components/search-bar";

export default function SidebarDefault() {
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
        <h3 className="font-medium text-foreground mb-2">Filters</h3>
        <p className="text-muted-foreground text-sm">Select filters to refine your movie search</p>
      </div>
    </div>
  );
}