import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;

  // __________ refs name, link

  const inputName = React.useRef("");
  const inputLink = React.useRef("");

  // отправка данных карточки

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: inputName.current.value,
      link: inputLink.current.value,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="popup_card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputName}
        className="popup__field popup__field_name"
        id="cardName"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="1"
        maxLength="30"
      ></input>
      <span className="popup__span-error" id="cardName-error"></span>
      <input
        ref={inputLink}
        className="popup__field popup__field_about"
        id="cardUrl"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
      ></input>
      <span className="popup__span-error" id="cardUrl-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
