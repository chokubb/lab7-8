function InventoryQuickView({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-panel" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        <img src={item.photo} alt={item.inventory_name} />
        <h2>{item.inventory_name}</h2>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default InventoryQuickView;