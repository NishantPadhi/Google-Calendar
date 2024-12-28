import React from "react";
import "./styles.css";

const Modal = ({ isOpen, onClose, modalContent }) => {
  const onOutsideClick = (e) => {
    if (e?.target?.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div className={`modal ${isOpen ? "" : "hidden"}`} onClick={onOutsideClick}>
      <div
        style={{
          color: "white",
          display: "flex",
          justifyContent: "right",
          cursor: "pointer",
          marginRight: "28px",
        }}
        onClick={onClose}
      >
        X
      </div>
      {modalContent}
    </div>
  );
};

export default Modal;
