'use client';

// Zustand implementation example for managing movie favorites
// This is a template showing how Zustand would be implemented

// STORE SETUP (useFavoritesStore.js)
/*
import { create } from 'zustand';

const useFavoritesStore = create((set, get) => ({
  favorites: [],
  addFavorite: (movie) => set((state) => ({ 
    favorites: [...state.favorites, movie] 
  })),
  removeFavorite: (movieId) => set((state) => ({ 
    favorites: state.favorites.filter(fav => fav.id !== movieId) 
  })),
  isFavorite: (movieId) => get().favorites.some(fav => fav.id === movieId),
  favoritesCount: () => get().favorites.length
}));

export default useFavoritesStore;
*/

export default function ZustandDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-card rounded-xl border border-border shadow-lg p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Zustand Implementation</h1>
        <p className="text-muted-foreground mb-6">
          Lightweight state management with minimal boilerplate
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Key Concepts</h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Store Creation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Create a store with state and actions in one function
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`import { create } from 'zustand';

const useFavoritesStore = create((set, get) => ({
  // Initial state
  favorites: [],
  
  // Actions
  addFavorite: (movie) => set((state) => ({ 
    favorites: [...state.favorites, movie] 
  })),
  
  removeFavorite: (movieId) => set((state) => ({ 
    favorites: state.favorites.filter(fav => fav.id !== movieId) 
  })),
  
  // Computed values
  isFavorite: (movieId) => get().favorites.some(fav => fav.id === movieId),
  
  // Selectors
  favoritesCount: () => get().favorites.length
}));

export default useFavoritesStore;`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Advanced Patterns</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Async actions, middleware, and persistence
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const useFavoritesStore = create(
  devtools(
    persist(
      (set, get) => ({
        favorites: [],
        
        // Async action
        fetchFavorites: async () => {
          const response = await fetch('/api/favorites');
          const favorites = await response.json();
          set({ favorites });
        },
        
        // Action with middleware
        addFavorite: (movie) => set((state) => ({ 
          favorites: [...state.favorites, movie] 
        }), false, 'favorites/addFavorite')
      }),
      {
        name: 'favorites-storage',
        partialize: (state) => ({ favorites: state.favorites })
      }
    )
  )
);`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Store Slicing</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Extract specific parts of the store to minimize re-renders
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`// Create selectors to extract specific data
const useFavorites = () => useFavoritesStore((state) => state.favorites);
const useAddFavorite = () => useFavoritesStore((state) => state.addFavorite);
const useRemoveFavorite = () => useFavoritesStore((state) => state.removeFavorite);
const useIsFavorite = () => useFavoritesStore((state) => state.isFavorite);

// Use in components
const MovieList = ({ movies }) => {
  const favorites = useFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const isFavorite = useIsFavorite();
  
  // Component implementation
};`}
                </pre>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Usage in Components</h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Basic Usage</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Direct usage of the store in functional components
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`import useFavoritesStore from '../stores/useFavoritesStore';

const MovieList = ({ movies }) => {
  // Subscribe to specific state
  const favorites = useFavoritesStore(state => state.favorites);
  const addFavorite = useFavoritesStore(state => state.addFavorite);
  const removeFavorite = useFavoritesStore(state => state.removeFavorite);
  const isFavorite = useFavoritesStore(state => state.isFavorite);
  
  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    // Component JSX
  );
};`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">No Provider Required</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Unlike Redux, Zustand doesn't require a Provider wrapper
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`// App.js - No Provider needed!
import { useFavoritesStore } from './stores/useFavoritesStore';

function App() {
  return (
    <div>
      <MovieList />
      <FavoritesSidebar />
    </div>
  );
}

// Any component can use the store directly
const FavoritesSidebar = () => {
  const favorites = useFavoritesStore(state => state.favorites);
  return (
    <div>
      <h2>Favorites ({favorites.length})</h2>
      // Render favorites
    </div>
  );
};`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Benefits</h3>
                <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                  <li>Minimal boilerplate</li>
                  <li>No providers needed</li>
                  <li>Selective re-renders out of the box</li>
                  <li>Lightweight (~1KB)</li>
                  <li>Easy to learn</li>
                  <li>Middleware support</li>
                  <li>TypeScript support</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800">Interview Notes</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Zustand is gaining popularity as a simpler alternative to Redux.
                  It's perfect for small to medium applications or when you need
                  just a few global state values. No complex setup required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}