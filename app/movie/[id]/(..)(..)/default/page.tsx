'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Image from "next/image";
import { Star } from "lucide-react";

export default function DefaultInterceptedModal({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intercept = searchParams.get('intercept');
  const movieId = params.id;

  // If we're not supposed to intercept, redirect to the normal movie page
  useEffect(() => {
    if (!intercept) {
      router.replace(`/movie/${movieId}`);
    }
  }, [intercept, movieId, router]);

  // Close the modal when pressing escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.back();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [router]);

  // In a real implementation, you would fetch the actual movie data
  // For this demo, we'll use placeholder data
  const movie = {
    id: parseInt(movieId),
    title: "Intercepted Movie Modal",
    overview: "This is a demonstration of intercepting routes in Next.js. When you clicked on a movie, instead of navigating to a new page, this modal appeared while keeping the original URL in the browser's address bar.",
    vote_average: 8.7,
    poster_path: "/placeholder.jpg",
    release_date: "2024-01-01",
    genres: [
      { id: 1, name: "Demonstration" },
      { id: 2, name: "Education" },
      { id: 3, name: "Technology" }
    ]
  };

  const posterUrl = 'https://placehold.co/780x1170?text=Movie+Poster';

  if (!intercept) {
    return null; // Don't render anything if we're redirecting
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => router.back()}
    >
      <div 
        className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-foreground">Movie Details</h2>
            <button 
              onClick={() => router.back()}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            <div className="md:w-2/3 space-y-4">
              <h3 className="text-3xl font-bold text-foreground">{movie.title}</h3>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={20} />
                  <span className="font-bold text-foreground">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                
                <span>•</span>
                
                <span>{movie.release_date.substring(0, 4)}</span>
                
                <span>•</span>
                
                <div className="flex gap-2 flex-wrap">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-secondary/50 px-2 py-1 rounded-md text-secondary-foreground text-xs"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-2">Overview</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.overview}
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Intercepting Routes Explanation:</h4>
                <p className="text-muted-foreground text-sm">
                  You're seeing this modal because of Next.js intercepting routes! 
                  The URL in your browser's address bar hasn't changed, but we're 
                  displaying different content. This is perfect for showing movie 
                  details without losing context of the movie listing page.
                </p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => router.back()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}