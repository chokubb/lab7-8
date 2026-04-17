import { Link } from "react-router-dom";

function InventoryTable({ items, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Фото</th>
            <th>Назва інвентарю</th>
            <th>Опис</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <img className="thumb" src={item.photo} alt={item.inventory_name} />
              </td>
              <td>{item.inventory_name}</td>
              <td>{item.description}</td>
              <td className="actions-cell">
                <Link to={`/admin/details/${item.id}`} className="action-btn view-btn">
                  Переглянути
                </Link>
                <Link to={`/admin/edit/${item.id}`} className="action-btn edit-btn">
                  Редагувати
                </Link>
                <button
                  className="action-btn delete-btn"
                  onClick={() => onDelete(item)}
                >
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;