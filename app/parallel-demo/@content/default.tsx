import { Suspense } from 'react';
import MovieListSkeleton from "@/components/movie/movie-loading";

export default function ContentDefault() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-foreground mb-4">Featured Movies</h3>
        <Suspense fallback={<MovieListSkeleton />}>
          <div className="text-muted-foreground">
            <p>Loading featured movies...</p>
          </div>
        </Suspense>
      </div>
    </div>
  );
}