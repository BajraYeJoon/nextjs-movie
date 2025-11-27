import BackButton from "@/components/back-button";
import FavoritesList from "@/components/favorite/favorites-list";

export default function FavoritesPage() {
  return (
    <div className="px-6 py-6 max-w-[1620px] mx-auto min-h-screen bg-background">
      <div className="flex items-center gap-4 mb-8">
        <BackButton />
        <h1 className="text-3xl font-bold text-foreground">My Favorites</h1>
      </div>
      <FavoritesList />
    </div>
  );
}
