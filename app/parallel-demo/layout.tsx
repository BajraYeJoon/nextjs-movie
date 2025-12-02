'use client';

import React from 'react';

export default function ParallelDemoLayout({
  sidebar,
  content,
}: {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Parallel Routes Demo</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar slot - takes 1/4 width on large screens */}
          <div className="lg:w-1/4">
            <div className="bg-card rounded-lg p-6 shadow-md border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Filters</h2>
              <div className="space-y-6">
                {sidebar}
              </div>
            </div>
          </div>
          
          {/* Content slot - takes 3/4 width on large screens */}
          <div className="lg:w-3/4">
            <div className="bg-card rounded-lg p-6 shadow-md border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Movie Listings</h2>
              <div className="space-y-4">
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}