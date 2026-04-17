import { useFavorites } from "../hooks/useFavorites";
import InventoryCard from "../components/gallery/InventoryCard";

function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="gallery">
      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        favorites.map((item) => (
          <InventoryCard
            key={item.id}
            item={item}
            onClick={() => {}}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))
      )}
    </div>
  );
}

export default FavoritesPage;