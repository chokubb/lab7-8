function InventoryCard({ item, onClick, isFavorite, onToggleFavorite }) {
  return (
    <div className="card" onClick={() => onClick(item)}>
      <img src={item.photo} alt={item.inventory_name} />

      <div className="card-body">
        <h3>{item.inventory_name}</h3>
      </div>

      <button
        className="favorite-btn"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(item);
        }}
        aria-label={isFavorite ? "Видалити з улюблених" : "Додати в улюблені"}
        title={isFavorite ? "Видалити з улюблених" : "Додати в улюблені"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default InventoryCard;