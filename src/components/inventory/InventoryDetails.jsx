function InventoryDetails({ item }) {
  return (
    <div className="details-card">
      <img className="details-image" src={item.photo} alt={item.inventory_name} />
      <div className="details-content">
        <h2>{item.inventory_name}</h2>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default InventoryDetails;