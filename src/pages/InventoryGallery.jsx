import { useEffect, useState } from "react";
import { getInventory } from "../services/inventoryApi";
import InventoryCard from "../components/gallery/InventoryCard";
import InventoryQuickView from "../components/gallery/InventoryQuickView";
import { useFavorites } from "../hooks/useFavorites";
import Navigation from "../components/Navigation";

function SkeletonCard() {
  return <div className="card skeleton"></div>;
}

function InventoryGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await getInventory();
        setItems(data);
      } catch {
        setError("Не вдалося завантажити інвентар.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="page">
      <Navigation />

      <div className="page-header">
        <div>
          <p className="eyebrow">Gallery</p>
          <h1>Користувацька галерея інвентарю</h1>
          <p className="page-text">
            Переглядайте всі позиції інвентарю, відкривайте деталі та додавайте
            улюблені товари.
          </p>
        </div>
      </div>

      {loading && (
        <div className="gallery">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && error && <div className="state-box error-box">{error}</div>}

      {!loading && !error && items.length === 0 && (
        <div className="state-box">Галерея інвентарю поки порожня.</div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="gallery">
          {items.map((item) => (
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

export default InventoryGallery;