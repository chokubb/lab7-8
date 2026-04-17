import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InventoryForm from "../components/inventory/InventoryForm";
import { createInventory } from "../services/inventoryApi";

function AdminInventoryCreate() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreate(data) {
    try {
      setSubmitError("");
      setIsSubmitting(true);
      await createInventory(data);
      navigate("/admin");
    } catch (error) {
      setSubmitError("Не вдалося створити нову позицію інвентарю.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Create</p>
          <h1>Додати позицію інвентарю</h1>
          <p className="page-text">
            Заповніть основні дані про нову позицію складу та додайте зображення.
          </p>
        </div>
      </div>

      {submitError && <div className="state-box error-box">{submitError}</div>}

      <InventoryForm
        initialData={{ inventory_name: "", description: "", photo: "" }}
        onSubmit={handleCreate}
        submitLabel={isSubmitting ? "Збереження..." : "Зберегти"}
        disabled={isSubmitting}
      />
    </div>
  );
}

export default AdminInventoryCreate;