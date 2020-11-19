import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    cards,
    onCardLike,
    onCardDislike,
    onCardDelete,
  } = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <img
          src={currentUser.avatar}
          alt="Avatar"
          className="profile__avatar"
        />
        <div className="profile__img-hover" onClick={onEditAvatar}></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-btn"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-btn"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDislike={onCardDislike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
