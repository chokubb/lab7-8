import { useEffect, useState } from "react";
import { getInventory } from "../services/inventoryApi";
import InventoryCard from "../components/gallery/InventoryCard";
import InventoryQuickView from "../components/gallery/InventoryQuickView";
import { useFavorites } from "../hooks/useFavorites";

function InventoryGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function load() {
      const data = await getInventory();
      setItems(data);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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

      <InventoryQuickView
        item={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

export default InventoryGallery;