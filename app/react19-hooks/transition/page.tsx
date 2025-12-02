'use client';

import { useTransition, useState, useEffect } from 'react';

// Simulate an expensive filtering operation
function filterMovies(movies: string[], searchTerm: string): string[] {
  if (!searchTerm) return movies;
  
  // Simulate expensive computation
  const result = [];
  for (let i = 0; i < 100; i++) {
    for (const movie of movies) {
      if (movie.toLowerCase().includes(searchTerm.toLowerCase())) {
        result.push(movie);
      }
    }
  }
  return result.filter((movie, index, self) => 
    self.indexOf(movie) === index && 
    movie.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export default function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<string[]>([]);
  const [immediateFilteredMovies, setImmediateFilteredMovies] = useState<string[]>([]);
  
  // Sample movie data
  const allMovies = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "Pulp Fiction",
    "Forrest Gump",
    "Inception",
    "The Matrix",
    "Goodfellas",
    "Se7en",
    "The Silence of the Lambs",
    "Saving Private Ryan",
    "Interstellar",
    "The Green Mile",
    "Life Is Beautiful",
    "The Prestige",
    "Parasite",
    "Whiplash",
    "The Intouchables",
    "Once Upon a Time in Hollywood",
    "Joker",
    "Avengers: Endgame",
    "Spider-Man: Into the Spider-Verse",
    "La La Land",
    "Mad Max: Fury Road",
    "Get Out",
    "Blade Runner 2049",
    "Django Unchained",
    "The Wolf of Wall Street",
    "Deadpool",
    "John Wick"
  ];

  // Immediate filtering (blocking UI)
  useEffect(() => {
    setImmediateFilteredMovies(filterMovies(allMovies, searchTerm));
  }, [searchTerm]);

  // Filter with transition (non-blocking UI)
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    startTransition(() => {
      setFilteredMovies(filterMovies(allMovies, term));
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-card rounded-xl border border-border shadow-lg p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">useTransition Hook</h1>
        <p className="text-muted-foreground mb-6">
          This hook allows you to mark state updates as transitions, which can be interrupted by urgent updates.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Movie Search Comparison</h2>
            
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
                Search Movies
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Type to search movies..."
              />
              {isPending && (
                <div className="mt-2 text-sm text-yellow-600">
                  Updating search results...
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">
                  With useTransition {isPending && <span className="text-yellow-600">(Pending)</span>}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Non-blocking UI update - typing remains responsive
                </p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie, index) => (
                      <div key={index} className="p-2 bg-muted rounded">
                        {movie}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No movies found</p>
                  )}
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">
                  Without useTransition
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Blocking UI update - typing may stutter
                </p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {immediateFilteredMovies.length > 0 ? (
                    immediateFilteredMovies.map((movie, index) => (
                      <div key={index} className="p-2 bg-muted rounded">
                        {movie}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No movies found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">useTransition</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Returns [isPending, startTransition] tuple. Updates wrapped in startTransition are treated as non-urgent.
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`const [isPending, startTransition] = useTransition();

startTransition(() => {
  // Non-urgent state updates
  setFilteredData(expensiveFilter(data));
});`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Key Benefits</h3>
                <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                  <li>Keeps UI responsive during expensive computations</li>
                  <li>Allows urgent updates to interrupt transitions</li>
                  <li>Provides visual feedback with isPending state</li>
                  <li>Better user experience for complex interactions</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">When to Use</h3>
                <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                  <li>Filtering large datasets</li>
                  <li>Sorting complex lists</li>
                  <li>Paginating large collections</li>
                  <li>Any expensive state updates</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800">Try It Out</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Type quickly in the search box to see the difference between blocking and non-blocking updates.
                  Notice how the useTransition version keeps the UI responsive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}