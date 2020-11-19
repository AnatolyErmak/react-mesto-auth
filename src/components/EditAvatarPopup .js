import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const inputAvatar = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputAvatar.current.value,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="popup_avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__field"
        name="avatar"
        type="url"
        placeholder="Введите url"
        required
        ref={inputAvatar}
      ></input>
      <span className="popup__span-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
