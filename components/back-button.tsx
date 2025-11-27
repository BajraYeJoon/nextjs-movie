'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center h-10 w-10 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
    >
      <ArrowLeft size={20} />
    </button>
  );
}
