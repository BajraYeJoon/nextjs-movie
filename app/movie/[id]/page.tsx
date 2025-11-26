import { getMovieDetails } from "@/lib/tmdb";
import Image from "next/image";
import { Star } from "lucide-react";

interface PageProps {
    params: Promise<{ id: string }>;
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
        <div className="min-h-screen bg-background text-foreground">

            <div className="relative h-[50vh] w-full overflow-hidden">
                {backdropUrl && (
                    <Image
                        src={backdropUrl}
                        alt={movie.title}
                        fill
                        className="object-cover brightness-[0.3]"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>

            <div className="container mx-auto px-6 -mt-32 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">

                    <div className="flex-shrink-0 mx-auto md:mx-0">
                        <div className="relative w-64 h-96 rounded-xl overflow-hidden shadow-2xl border-4 border-background">
                            <Image
                                src={posterUrl}
                                alt={movie.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>


                    <div className="flex flex-col justify-end pb-4 space-y-4">

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            {movie.title}
                        </h1>


                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-muted-foreground">
                            <div className="flex items-center gap-1 text-primary">
                                <Star className="h-5 w-5 fill-current" />
                                <span className="font-bold text-foreground">{movie.vote_average.toFixed(1)}</span>
                            </div>
                            <span>•</span>
                            <div className="flex gap-2">
                                {movie.genres.map((genre) => (
                                    <span key={genre.id} className="bg-secondary/50 px-2 py-1 rounded-md text-secondary-foreground">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>


                        <div className="max-w-3xl mt-4">
                            <h3 className="text-xl font-semibold mb-2">Overview</h3>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
