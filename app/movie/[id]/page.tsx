import { getMovieDetails } from "@/lib/tmdb";
import Image from "next/image";
import { Star } from "lucide-react";
import BackButton from "@/components/back-button";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(parseInt(id));
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: movie.title,
    description: movie.overview,
    keywords: [movie.title, "movie", "film"],
    openGraph: {
      title: movie.title,
      description: movie.overview,
      type: "video.movie",
      url: `${baseUrl}/movie/${id}`,
      images: {
        url: `https://image.tmdb.org/t/p/w780${movie.poster_path}`,
        width: 780,
        height: 1170,
        alt: movie.title,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: movie.title,
      description: movie.overview,
      images: `https://image.tmdb.org/t/p/w780${movie.poster_path}`,
    },
    alternates: {
      canonical: `${baseUrl}/movie/${id}`,
    },
  };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(parseInt(id));

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : "/placeholder-poster.svg";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="h-full bg-background text-foreground">
      <div className="absolute top-6 left-6 z-20">
        <BackButton />
      </div>

      <div className="relative h-[50vh] w-full overflow-hidden bg-muted">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover brightness-75"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="main-wrapper container mx-auto px-6 -mt-56 md:-mt-36 lg:-mt-32 relative z-10 flex flex-col md:flex-row gap-8 items-start">
        <div className="poster mx-auto md:mx-0 w-64 h-96 shrink-0 rounded-xl overflow-hidden shadow-2xl border-4 border-background bg-muted relative">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="movie-detail flex flex-col justify-end space-y-4 flex-1 pb-4">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-muted-foreground">
            <div className="flex items-center gap-1 text-primary">
              <Star size={20} />
              <span className="font-bold text-foreground">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>

            <span>•</span>

            <div className="flex gap-2 flex-wrap">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-secondary/50 px-2 py-1 rounded-md text-secondary-foreground"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="max-w-3xl">
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Overview</h3>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
