'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function InterceptedModal() {
  const router = useRouter();

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

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => router.back()}
    >
      <div 
        className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-foreground">Intercepted Modal</h2>
            <button 
              onClick={() => router.back()}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This is an intercepted route! Notice how the URL in your browser's address bar 
              hasn't changed, but we're displaying different content.
            </p>
            
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">How Intercepting Routes Work:</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Defined using (..) folder naming convention</li>
                <li>Load content from one route into another's context</li>
                <li>Preserve the original URL in the address bar</li>
                <li>Perfect for modal dialogs and overlays</li>
              </ul>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}