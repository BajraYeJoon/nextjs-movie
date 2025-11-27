import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Movie - Discover Movies",
    template: "%s | Movie",
  },
  description: "Discover and explore thousands of movies.",
  keywords: ["movies", "films", "movie search"],
  authors: [{ name: "bajra" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Movie - Discover Movies",
    description: "Discover and explore thousands of movies",
    siteName: "Movi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Movie - Discover Movies",
    description: "Discover and explore thousands of movies",
  },
  alternates: {
    canonical: baseUrl,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
