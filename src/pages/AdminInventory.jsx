import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InventoryTable from "../components/inventory/InventoryTable";
import { getInventory } from "../services/inventoryApi";

function AdminInventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getInventory();
        setItems(data);
      } catch {
        setError("Не вдалося завантажити список інвентарю.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Lab 7</p>
          <h1>Адмін-панель складу</h1>
          <p className="page-text">
            Керування інвентарем: перегляд, створення, редагування та видалення позицій.
          </p>
        </div>

        <Link to="/admin/create" className="primary-btn">
          Додати позицію
        </Link>
      </div>

      {loading && <div className="state-box">Завантаження...</div>}
      {error && <div className="state-box error-box">{error}</div>}
      {!loading && !error && items.length === 0 && (
        <div className="state-box">Список інвентарю порожній.</div>
      )}

      {!loading && !error && items.length > 0 && (
        <InventoryTable items={items} onDelete={() => {}} />
      )}
    </div>
  );
}

export default AdminInventory;