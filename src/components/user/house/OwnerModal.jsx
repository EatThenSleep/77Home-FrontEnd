import React from "react";
import "../../../styles/OwnerModal.scss";

const OwnerModal = ({ isOpen, onClose, owner }) => {
  if (!isOpen) return null; // Nếu modal không mở, không hiển thị gì

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-x" onClick={onClose}><i className="fas fa-times"></i></button>
     
        <h2>Thông tin chủ nhà</h2>
        <hr/>
        <ul>
          <li><strong>Tên:</strong> {owner.fullName}</li>
          <li><strong>Số điện thoại:</strong> {owner.phone}</li>
          <li><strong>Email:</strong> {owner.email}</li>
        </ul>
        <button className="close-btn" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default OwnerModal;
