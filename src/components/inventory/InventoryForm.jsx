import { useState } from "react";

function InventoryForm({ initialData, onSubmit, submitLabel }) {
  const [inventoryName, setInventoryName] = useState(initialData.inventory_name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [photo, setPhoto] = useState(initialData.photo || "");
  const [error, setError] = useState("");

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!inventoryName.trim()) {
      setError("Поле назви інвентарю є обов’язковим.");
      return;
    }

    setError("");

    await onSubmit({
      inventory_name: inventoryName,
      description,
      photo,
    });
  }

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <label>
        Назва інвентарю *
        <input
          type="text"
          value={inventoryName}
          onChange={(e) => setInventoryName(e.target.value)}
        />
      </label>

      <label>
        Опис
        <textarea
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        Фото
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>

      {photo && <img className="preview-image" src={photo} alt="preview" />}

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="primary-btn">
        {submitLabel}
      </button>
    </form>
  );
}

export default InventoryForm;