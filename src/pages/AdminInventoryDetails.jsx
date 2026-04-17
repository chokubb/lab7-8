import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InventoryDetails from "../components/inventory/InventoryDetails";
import { getInventoryById } from "../services/inventoryApi";

function AdminInventoryDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItem() {
      try {
        setLoading(true);
        const data = await getInventoryById(id);
        setItem(data);
      } catch {
        setError("Не вдалося завантажити інформацію про товар.");
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Details</p>
          <h1>Деталі інвентарю</h1>
        </div>
      </div>

      {loading && <div className="state-box">Завантаження...</div>}
      {error && <div className="state-box error-box">{error}</div>}
      {!loading && item && <InventoryDetails item={item} />}
    </div>
  );
}

export default AdminInventoryDetails;