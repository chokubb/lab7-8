function ConfirmModal({ isOpen, title, text, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="modal-actions">
          <button className="delete-btn action-btn" onClick={onConfirm}>
            Підтвердити
          </button>
          <button className="view-btn action-btn" onClick={onCancel}>
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;