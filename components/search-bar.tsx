'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    if (query === initialQuery) return;

    const debounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set("q", query);
        params.set("page", "1");
      } else {
        params.delete("q");
        if (!params.get("genre")) params.delete("page");
      }

      router.push(`/?${params.toString()}`);
    }, 500);

    return () => clearTimeout(debounce);
  }, [query, router, searchParams, initialQuery]);

  return (
    <div className="search-bar relative w-full max-w-md">
      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full h-12 pl-10 pr-4 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
