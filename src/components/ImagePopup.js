import React from "react";

export default function ImagePopup(props) {
  const { isOpen, onClose, name, link } = props;

  return (
    <section className={`popup popup_image ${isOpen && "popup_opened"}`}>
      <div className="popup__image-content">
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image-link" src={link} alt={name} />
        <p className="popup__text">{name}</p>
      </div>
    </section>
  );
}
