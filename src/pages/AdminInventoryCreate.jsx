import { useNavigate } from "react-router-dom";
import InventoryForm from "../components/inventory/InventoryForm";
import { createInventory } from "../services/inventoryApi";

function AdminInventoryCreate() {
  const navigate = useNavigate();

  async function handleCreate(data) {
    await createInventory(data);
    navigate("/admin");
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Create</p>
          <h1>Додати позицію інвентарю</h1>
        </div>
      </div>

      <InventoryForm
        initialData={{ inventory_name: "", description: "", photo: "" }}
        onSubmit={handleCreate}
        submitLabel="Зберегти"
      />
    </div>
  );
}

export default AdminInventoryCreate;