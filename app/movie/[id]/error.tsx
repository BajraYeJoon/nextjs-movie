'use client';

import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="movie-error-message min-h-screen w-full max-w-md md:max-w-xl mx-auto flex flex-col items-center justify-center text-center bg-background px-6 gap-6">
      <div className="p-4 rounded-full bg-destructive/10">
        <AlertCircle size={48} className=" text-destructive" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl  font-bold text-foreground">
          Something went wrong
        </h1>
        <p className="text-muted-foreground">
          {error?.message ?? "It may be a network issue or the service might be unavailable. Please try again later."}
        </p>
      </div>

      <Link
        href={"/"}
        aria-label="Back"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium cursor-pointer"
      >
        <RefreshCw size={24} />
        Back to home
      </Link>
    </div>
  );
}
