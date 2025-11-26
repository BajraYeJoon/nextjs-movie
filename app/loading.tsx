import MovieListSkeleton from '@/components/movie/movie-loading';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1920px] mx-auto px-6 py-6">
        <div className="h-9 w-32 bg-muted rounded mb-6 animate-pulse" />
        <div className="h-12 w-full bg-card border border-border rounded-lg mb-8" />
        <MovieListSkeleton />
      </div>
    </div>
  );
}
