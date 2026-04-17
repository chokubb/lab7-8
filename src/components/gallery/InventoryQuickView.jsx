function InventoryQuickView({ item, onClose, isFavorite, onToggleFavorite }) {
  if (!item) return null;

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-panel" onClick={(e) => e.stopPropagation()}>
        <div className="quickview-top">
          <h2>Деталі інвентарю</h2>
          <button className="close-quickview-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <img
          className="quickview-image"
          src={item.photo}
          alt={item.inventory_name}
        />

        <div className="quickview-content">
          <div className="quickview-header-row">
            <h3>{item.inventory_name}</h3>

            <button
              className="favorite-btn quickview-favorite"
              onClick={() => onToggleFavorite(item)}
              aria-label={
                isFavorite ? "Видалити з улюблених" : "Додати в улюблені"
              }
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>

          <p>{item.description}</p>
          <p className="item-id">ID: {item.id}</p>
        </div>
      </div>
    </div>
  );
}

export default InventoryQuickView;