import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InventoryForm from "../components/inventory/InventoryForm";
import { getInventoryById, updateInventory } from "../services/inventoryApi";

function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItem() {
      const data = await getInventoryById(id);
      setItem(data);
      setLoading(false);
    }

    loadItem();
  }, [id]);

  async function handleUpdate(data) {
    await updateInventory(id, {
      inventory_name: data.inventory_name,
      description: data.description,
      photo: data.photo,
    });
    navigate("/admin");
  }

  if (loading) {
    return <div className="page"><div className="state-box">Завантаження...</div></div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Edit</p>
          <h1>Редагування інвентарю</h1>
        </div>
      </div>

      <InventoryForm
        initialData={item}
        onSubmit={handleUpdate}
        submitLabel="Оновити"
      />
    </div>
  );
}

export default AdminInventoryEdit;