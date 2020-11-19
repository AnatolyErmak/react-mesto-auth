import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup ";
import Login from './Login';

function App() {
  // переменные состояния
  const [currentUser, setCurrenUser] = React.useState({});
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = React.useState(false); // попап аватара
  const [isAddCardOpen, setIsAddCardOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isImageOpen: false, // попап картинки
    link: "",
    name: "",
  });

  // функция закрытия попапов
  function closeAllPopups() {
    setIsProfileOpen(false);
    setIsAddCardOpen(false);
    setIsAvatarOpen(false);
    setSelectedCard({
      isImageOpen: false,
      link: "",
      name: "",
    });
  }

  // Хэндлеры для открытия попапов
  function handleEditProfileClick() {
    setIsProfileOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddCardOpen(true);
  }
  function handleEditAvatarClick() {
    setIsAvatarOpen(true);
  }
  function handleCardClick(cardData) {
    const { link, name } = cardData;
    setSelectedCard({ isImageOpen: true, link: link, name: name });
  }
  // _______________________________________cards

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrenUser(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }, []);

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrenUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    console.log(data);
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrenUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }, []);

  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  // ___________________________________ лайки

  function handleCardLike(card) {
    api
      .putLike(card._id)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  function handleCardDislike(card) {
    api
      .deleteLike(card._id)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }
  return (
    // создаем контекст
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onCardDelete={handleCardDelete}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDislike={handleCardDislike}
          cards={cards}
        />
        <Login/>
        <Footer />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isAvatarOpen}
          onClose={closeAllPopups}
        ></EditAvatarPopup>

        <EditProfilePopup
          isOpen={isProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>

        <AddPlacePopup
          isOpen={isAddCardOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>

        <ImagePopup
          isOpen={selectedCard.isImageOpen}
          onClose={closeAllPopups}
          name={selectedCard.name}
          link={selectedCard.link}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
