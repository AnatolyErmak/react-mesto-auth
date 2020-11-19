import React from "react";

function PopupWithForm({
  name,
  isOpen,
  title,
  handler,
  onClose,
  children,
  onSubmit,
}) {
  return (
    <div className={isOpen ? `popup ${name} popup_opened` : `popup ${name}`}>
      <form className="popup__content " onSubmit={onSubmit} noValidate>
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        {children}
        <button
          className="popup__button popup__button_form"
          type="submit"
          aria-label="Сохранить"
          onClick={handler}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
