'use client';

import { useActionState, useState, useEffect } from 'react';

// Simulate an API call for adding to favorites
async function toggleFavorite(prevState: any, formData: FormData) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const movieId = formData.get('movieId');
  const isCurrentlyFavorite = formData.get('isFavorite') === 'true';
  
  // Simulate occasional network error
  if (Math.random() < 0.1) {
    return {
      success: false,
      message: 'Network error. Please try again.',
      isFavorite: !isCurrentlyFavorite
    };
  }
  
  // Simulate successful toggle
  return {
    success: true,
    message: isCurrentlyFavorite 
      ? 'Removed from favorites' 
      : 'Added to favorites',
    isFavorite: !isCurrentlyFavorite
  };
}

export default function ActionStateDemo() {
  const [movies, setMovies] = useState([
    { id: 1, title: 'Inception', year: 2010, isFavorite: false },
    { id: 2, title: 'The Dark Knight', year: 2008, isFavorite: true },
    { id: 3, title: 'Interstellar', year: 2014, isFavorite: false },
    { id: 4, title: 'Tenet', year: 2020, isFavorite: false },
    { id: 5, title: 'Dunkirk', year: 2017, isFavorite: true }
  ]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-card rounded-xl border border-border shadow-lg p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">useActionState Hook</h1>
        <p className="text-muted-foreground mb-6">
          This hook manages the state of actions, including pending states and error handling.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Movie Favorites</h2>
            
            <div className="space-y-4">
              {movies.map(movie => (
                <MovieItem key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">useActionState</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Similar to useFormState but for general actions. Manages state, pending status, and errors.
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`const [state, action, isPending] = useActionState(
  actionFunction,
  initialState
);`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Key Differences</h3>
                <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                  <li>Works with any async function, not just forms</li>
                  <li>Returns [state, action, isPending] tuple</li>
                  <li>Built-in pending state management</li>
                  <li>Designed for Server Actions</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Implementation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The hook takes an action function and initial state, returning the current state, action dispatcher, and pending status.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800">Try It Out</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Toggle favorites to see useActionState in action. 
                  Notice the pending state and occasional simulated errors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MovieItem({ movie }: { movie: { id: number; title: string; year: number; isFavorite: boolean } }) {
  const [state, formAction, isPending] = useActionState(toggleFavorite, { 
    success: false, 
    message: '', 
    isFavorite: movie.isFavorite 
  });
  
  // Update local state when action completes
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite);
  
  useEffect(() => {
    if (state.message) {
      setIsFavorite(state.isFavorite);
    }
  }, [state]);

  return (
    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
      <div>
        <h3 className="font-medium text-foreground">{movie.title}</h3>
        <p className="text-sm text-muted-foreground">{movie.year}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <form action={formAction}>
          <input type="hidden" name="movieId" value={movie.id} />
          <input type="hidden" name="isFavorite" value={String(isFavorite)} />
          <button
            type="submit"
            disabled={isPending}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              isFavorite
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-muted text-foreground hover:bg-muted/80'
            } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isPending ? '...' : isFavorite ? '♥ Favorited' : '♡ Favorite'}
          </button>
        </form>
        
        {state.message && (
          <div className={`text-xs ${
            state.message.includes('error') ? 'text-red-600' : 'text-green-600'
          }`}>
            {state.message}
          </div>
        )}
      </div>
    </div>
  );
}