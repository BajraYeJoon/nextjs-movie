'use client';

// Redux Toolkit implementation example for managing movie favorites
// This is a template showing how Redux Toolkit would be implemented

// STORE SETUP (store.js)
/*
import { configureStore } from '@reduxjs/toolkit';
import favoritesSlice from './favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
*/

// SLICE SETUP (favoritesSlice.js)
/*
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching favorites from API
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async () => {
    const response = await fetch('/api/favorites');
    return response.json();
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addFavorite: (state, action) => {
      state.items.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
*/

// HOOKS SETUP (hooks.js)
/*
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
*/

export default function ReduxToolkitDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-card rounded-xl border border-border shadow-lg p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Redux Toolkit Implementation</h1>
        <p className="text-muted-foreground mb-6">
          Modern Redux with simplified setup and best practices
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Key Components</h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">createSlice</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Combines actions and reducers with less boilerplate
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    loading: false
  },
  reducers: {
    addFavorite: (state, action) => {
      // Redux Toolkit allows "mutating" logic in reducers
      state.items.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    }
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">configureStore</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Simplified store setup with good defaults
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  },
  // DevTools enabled by default
  // Redux Thunk included by default
  // Immutability check in development
});`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">createAsyncThunk</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Handles async logic with automatic loading states
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/favorites');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);`}
                </pre>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Usage in Components</h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Custom Hooks</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Typed hooks for better TypeScript support
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Component Usage</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Using custom hooks in functional components
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`import { useAppSelector, useAppDispatch } from '../hooks';
import { addFavorite, removeFavorite } from '../favoritesSlice';

const MovieList = ({ movies }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(
    (state) => state.favorites.items
  );
  
  const toggleFavorite = (movie) => {
    if (favorites.some(fav => fav.id === movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    // Component JSX
  );
};`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Benefits</h3>
                <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                  <li>10x less boilerplate than traditional Redux</li>
                  <li>Built-in Redux DevTools</li>
                  <li>Immutability enforcement</li>
                  <li>TypeScript support</li>
                  <li>Includes Redux Thunk</li>
                  <li>Automatic action creators</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800">Interview Notes</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Redux Toolkit is the official recommended approach for Redux.
                  It solves many pain points of traditional Redux while maintaining its benefits.
                  Preferred for new Redux projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}