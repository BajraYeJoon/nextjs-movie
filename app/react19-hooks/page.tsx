'use client';

import { useState } from 'react';

export default function React19HooksDemo() {
  const [activeTab, setActiveTab] = useState('form');

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">React 19 Hooks Demonstration</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore the new hooks introduced in React 19 and how they enhance Next.js applications
          </p>
        </header>

        <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-border">
            <nav className="flex overflow-x-auto">
              <button
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === 'form'
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('form')}
              >
                useFormState & useFormStatus
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === 'optimistic'
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('optimistic')}
              >
                useOptimistic
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === 'action'
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('action')}
              >
                useActionState
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === 'transition'
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('transition')}
              >
                useTransition
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === 'deferred'
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('deferred')}
              >
                useDeferredValue
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'form' && <FormHooksDemo />}
            {activeTab === 'optimistic' && <OptimisticHookDemo />}
            {activeTab === 'action' && <ActionStateDemo />}
            {activeTab === 'transition' && <TransitionDemo />}
            {activeTab === 'deferred' && <DeferredValueDemo />}
          </div>
        </div>

        <div className="mt-8 bg-card rounded-xl border border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">React 19 Hooks Overview</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">useFormState & useFormStatus</h3>
              <p className="text-muted-foreground text-sm">
                Simplify form handling with built-in state management and submission status tracking.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">useOptimistic</h3>
              <p className="text-muted-foreground text-sm">
                Enable optimistic UI updates for better perceived performance during async operations.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">useActionState</h3>
              <p className="text-muted-foreground text-sm">
                Manage action state and pending states for Server Actions and async operations.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">useTransition</h3>
              <p className="text-muted-foreground text-sm">
                Mark state updates as transitions to keep UI responsive during expensive operations.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">useDeferredValue</h3>
              <p className="text-muted-foreground text-sm">
                Defer updating a value until more urgent updates have completed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholder components for each tab - will implement in separate files
function FormHooksDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">useFormState & useFormStatus</h2>
      <p className="text-muted-foreground">
        These hooks simplify form handling in React Server Components. Navigate to the dedicated route to see the full implementation.
      </p>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm">
          Implementation available at: <a href="/react19-hooks/form-state" className="text-primary hover:underline">/react19-hooks/form-state</a>
        </p>
      </div>
    </div>
  );
}

function OptimisticHookDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">useOptimistic</h2>
      <p className="text-muted-foreground">
        This hook enables optimistic UI updates, showing immediate feedback while async operations complete.
      </p>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm">
          Implementation available at: <a href="/react19-hooks/optimistic" className="text-primary hover:underline">/react19-hooks/optimistic</a>
        </p>
      </div>
    </div>
  );
}

function ActionStateDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">useActionState</h2>
      <p className="text-muted-foreground">
        This hook manages the state of actions, including pending states and error handling.
      </p>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm">
          Implementation available at: <a href="/react19-hooks/action-state" className="text-primary hover:underline">/react19-hooks/action-state</a>
        </p>
      </div>
    </div>
  );
}

function TransitionDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">useTransition</h2>
      <p className="text-muted-foreground">
        This hook keeps UI responsive during expensive state updates by marking them as transitions.
      </p>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm">
          Implementation available at: <a href="/react19-hooks/transition" className="text-primary hover:underline">/react19-hooks/transition</a>
        </p>
      </div>
    </div>
  );
}

function DeferredValueDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">useDeferredValue</h2>
      <p className="text-muted-foreground">
        This hook defers updating a value until more urgent updates have completed.
      </p>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm">
          Implementation available at: <a href="/react19-hooks/deferred-value" className="text-primary hover:underline">/react19-hooks/deferred-value</a>
        </p>
      </div>
    </div>
  );
}