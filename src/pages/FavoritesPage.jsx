import { useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import InventoryCard from "../components/gallery/InventoryCard";
import InventoryQuickView from "../components/gallery/InventoryQuickView";
import Navigation from "../components/Navigation";

function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selected, setSelected] = useState(null);

  return (
    <div className="page">
      <Navigation />

      <div className="page-header">
        <div>
          <p className="eyebrow">Favorites</p>
          <h1>Улюблені товари</h1>
          <p className="page-text">
            Тут відображаються позиції інвентарю, які були додані до улюблених.
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="state-box">У вас поки немає улюблених товарів.</div>
      ) : (
        <div className="gallery">
          {favorites.map((item) => (
            <InventoryCard
              key={item.id}
              item={item}
              onClick={setSelected}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      <InventoryQuickView
        item={selected}
        onClose={() => setSelected(null)}
        isFavorite={selected ? isFavorite(selected.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default FavoritesPage;