import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameUpdate(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="popup_profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__field popup__field_name"
        type="text"
        id="profile__input_name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        name="name"
        onChange={handleNameUpdate}
      ></input>
      <span className="popup__span-error" id="profile__input_name-error"></span>
      <input
        className="popup__field popup__field_about"
        type="text"
        name="job"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        id="profile__input_about"
        onChange={handleDescription}
      ></input>
      <span
        className="popup__span-error"
        id="profile__input_about-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
