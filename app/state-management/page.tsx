'use client';

import { useState } from 'react';

export default function StateManagementDemo() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">State Management Solutions</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore different state management approaches for React/Next.js applications
          </p>
        </header>

        <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-border">
            <nav className="flex overflow-x-auto">
              <button
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === 'redux'
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('redux')}
              >
                Redux
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === 'redux-toolkit'
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('redux-toolkit')}
              >
                Redux Toolkit
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === 'zustand'
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('zustand')}
              >
                Zustand
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'redux' && <ReduxTab />}
            {activeTab === 'redux-toolkit' && <ReduxToolkitTab />}
            {activeTab === 'zustand' && <ZustandTab />}
          </div>
        </div>

        <div className="mt-8 bg-card rounded-xl border border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Comparison Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-semibold text-foreground">Solution</th>
                  <th className="text-left py-2 font-semibold text-foreground">Learning Curve</th>
                  <th className="text-left py-2 font-semibold text-foreground">Boilerplate</th>
                  <th className="text-left py-2 font-semibold text-foreground">Performance</th>
                  <th className="text-left py-2 font-semibold text-foreground">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium">Redux</td>
                  <td className="py-2 text-muted-foreground">High</td>
                  <td className="py-2 text-muted-foreground">High</td>
                  <td className="py-2 text-muted-foreground">Good</td>
                  <td className="py-2 text-muted-foreground">Large, complex apps</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium">Redux Toolkit</td>
                  <td className="py-2 text-muted-foreground">Medium</td>
                  <td className="py-2 text-muted-foreground">Low</td>
                  <td className="py-2 text-muted-foreground">Excellent</td>
                  <td className="py-2 text-muted-foreground">Modern Redux apps</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Zustand</td>
                  <td className="py-2 text-muted-foreground">Low</td>
                  <td className="py-2 text-muted-foreground">Very Low</td>
                  <td className="py-2 text-muted-foreground">Excellent</td>
                  <td className="py-2 text-muted-foreground">Small to medium apps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">State Management Overview</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-muted p-5 rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-2">What is State Management?</h3>
          <p className="text-muted-foreground">
            State management is the practice of managing how data flows through an application. 
            It involves storing, updating, and retrieving application state in a predictable way.
          </p>
        </div>
        
        <div className="bg-muted p-5 rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-2">Why Use State Management Libraries?</h3>
          <p className="text-muted-foreground">
            As applications grow, managing state with just React's built-in useState and useContext 
            becomes challenging. Libraries provide tools for predictable state updates and debugging.
          </p>
        </div>
      </div>
      
      <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Explore Implementation Examples</h3>
        <p className="text-blue-700">
          Navigate to the tabs above to see implementation examples for Redux, Redux Toolkit, and Zustand.
          Each solution demonstrates managing a simple movie favorites system.
        </p>
      </div>
    </div>
  );
}

function ReduxTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Redux Implementation</h2>
      <p className="text-muted-foreground">
        Traditional Redux implementation with actions, reducers, and store configuration.
      </p>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm">
          Implementation available at: <a href="/state-management/redux" className="text-primary hover:underline">/state-management/redux</a>
        </p>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Key Concepts</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Actions - Plain objects describing what happened</li>
          <li>Reducers - Pure functions that specify how state changes</li>
          <li>Store - Holds the application state tree</li>
          <li>Middleware - Extends Redux with additional capabilities</li>
        </ul>
      </div>
    </div>
  );
}

function ReduxToolkitTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Redux Toolkit Implementation</h2>
      <p className="text-muted-foreground">
        Modern Redux implementation using Redux Toolkit for simplified setup and best practices.
      </p>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm">
          Implementation available at: <a href="/state-management/redux-toolkit" className="text-primary hover:underline">/state-management/redux-toolkit</a>
        </p>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Key Concepts</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>createSlice - Combines actions and reducers</li>
          <li>configureStore - Simplified store setup with good defaults</li>
          <li>createAsyncThunk - Handles async logic</li>
          <li>RTK Query - Data fetching and caching solution</li>
        </ul>
      </div>
    </div>
  );
}

function ZustandTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Zustand Implementation</h2>
      <p className="text-muted-foreground">
        Lightweight state management solution with minimal boilerplate.
      </p>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm">
          Implementation available at: <a href="/state-management/zustand" className="text-primary hover:underline">/state-management/zustand</a>
        </p>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Key Concepts</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Bear necessities for state management</li>
          <li>Minimal API surface</li>
          <li>No providers needed</li>
          <li>Selective re-renders out of the box</li>
        </ul>
      </div>
    </div>
  );
}