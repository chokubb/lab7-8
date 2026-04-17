import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InventoryForm from "../components/inventory/InventoryForm";
import { getInventoryById, updateInventory } from "../services/inventoryApi";

function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadItem() {
      try {
        setLoading(true);
        setLoadError("");
        const data = await getInventoryById(id);
        setItem(data);
      } catch (error) {
        setLoadError("Не вдалося завантажити дані для редагування.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  async function handleUpdate(data) {
    try {
      setSubmitError("");
      setIsSubmitting(true);

      await updateInventory(id, {
        inventory_name: data.inventory_name,
        description: data.description,
        photo: data.photo,
      });

      navigate("/admin");
    } catch (error) {
      setSubmitError("Не вдалося оновити позицію інвентарю.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="page">
        <div className="state-box">Завантаження...</div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="page">
        <div className="state-box error-box">{loadError}</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Edit</p>
          <h1>Редагування інвентарю</h1>
          <p className="page-text">
            Оновіть назву, опис або фото для вибраної позиції складу.
          </p>
        </div>
      </div>

      {submitError && <div className="state-box error-box">{submitError}</div>}

      <InventoryForm
        initialData={item}
        onSubmit={handleUpdate}
        submitLabel={isSubmitting ? "Оновлення..." : "Оновити"}
        disabled={isSubmitting}
      />
    </div>
  );
}

export default AdminInventoryEdit;