import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Loader2 className="size-10 animate-spin text-primary" />
    </div>
  );
}
