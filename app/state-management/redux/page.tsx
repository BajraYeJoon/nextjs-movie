'use client';

// Redux implementation example for managing movie favorites
// This is a template showing how Redux would be implemented

// STORE SETUP (store.js)
/*
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Action Types
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const SET_FAVORITES = 'SET_FAVORITES';

// Action Creators
export const addFavorite = (movie) => ({
  type: ADD_FAVORITE,
  payload: movie
});

export const removeFavorite = (movieId) => ({
  type: REMOVE_FAVORITE,
  payload: movieId
});

export const setFavorites = (movies) => ({
  type: SET_FAVORITES,
  payload: movies
});

// Initial State
const initialState = {
  favorites: []
};

// Reducer
const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(movie => movie.id !== action.payload)
      };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };
    default:
      return state;
  }
};

// Root Reducer
const rootReducer = combineReducers({
  favorites: favoritesReducer
});

// Store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
*/

// COMPONENT USAGE (MovieList.js)
/*
import React from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../store';

const MovieList = ({ movies, favorites, addFavorite, removeFavorite }) => {
  const isFavorite = (movieId) => favorites.some(fav => fav.id === movieId);
  
  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <div key={movie.id} className="movie-card">
          <h3>{movie.title}</h3>
          <button 
            onClick={() => toggleFavorite(movie)}
            className={isFavorite(movie.id) ? 'favorited' : ''}
          >
            {isFavorite(movie.id) ? '♥ Remove Favorite' : '♡ Add Favorite'}
          </button>
        </div>
      ))}
    </div>
  );
};

// Connect to Redux
const mapStateToProps = (state) => ({
  favorites: state.favorites.favorites
});

const mapDispatchToProps = {
  addFavorite,
  removeFavorite
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
*/

export default function ReduxDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-card rounded-xl border border-border shadow-lg p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Redux Implementation</h1>
        <p className="text-muted-foreground mb-6">
          Traditional Redux with actions, reducers, and store configuration
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Key Components</h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Actions</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Plain objects that describe what happened in the application
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`// Action Types
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

// Action Creators
export const addFavorite = (movie) => ({
  type: ADD_FAVORITE,
  payload: movie
});

export const removeFavorite = (movieId) => ({
  type: REMOVE_FAVORITE,
  payload: movieId
});`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Reducers</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Pure functions that specify how the application state changes
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          movie => movie.id !== action.payload
        )
      };
    default:
      return state;
  }
};`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Store</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Holds the complete state tree of the application
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  favorites: favoritesReducer
});

const store = createStore(rootReducer);

export default store;`}
                </pre>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Usage in Components</h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Connecting Components</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Using connect() to bind components to Redux state
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`import { connect } from 'react-redux';

const MovieList = ({ favorites, addFavorite, removeFavorite }) => {
  // Component implementation
};

const mapStateToProps = (state) => ({
  favorites: state.favorites.favorites
});

const mapDispatchToProps = {
  addFavorite,
  removeFavorite
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MovieList);`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Provider Setup</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Wrapping the application with Provider to make store available
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <YourApp />
    </Provider>
  );
}`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Benefits & Tradeoffs</h3>
                <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                  <li>Predictable state management</li>
                  <li>Excellent debugging tools</li>
                  <li>Time-travel debugging</li>
                  <li>High learning curve</li>
                  <li>Significant boilerplate</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800">Interview Notes</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Redux is powerful but verbose. Good for large applications with complex state logic.
                  Requires understanding of functional programming concepts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}