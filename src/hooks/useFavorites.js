import { useEffect, useState } from "react";

const KEY = "favorite_items";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(item) {
    setFavorites((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }

      return [...prev, item];
    });
  }

  function isFavorite(id) {
    return favorites.some((i) => i.id === id);
  }

  return { favorites, toggleFavorite, isFavorite };
}