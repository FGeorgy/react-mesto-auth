// import './App.css';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import success from '../images/Union.svg';
import unSucces from '../images/Union-2.svg';
import * as auth from '../utils/Auth.js';

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] =React.useState(false);
  const [message, setMessage] = React.useState( {img: '', text: ''} );
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopup() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setConfirmDeletePopupOpen(false);
    setInfoTooltipOpen(false);
  };

  function handleUpdateUser(userData) {
    Api.setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
  };

  function handleUpdateAvatar(userData) {
    Api.setUserAvatar(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  };

  function handleCardDelete(card) {
    Api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card))
      })
      .catch((err) => console.log(err))
  };

  function handleAddPlaceSubmit(card) {
    Api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  };

  function handleRegistration(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setMessage({ img: success, text: 'Вы успешно зарегистрировались!' });
          navigate("/sign-in", { replace: true });
        } else {
          setMessage({ img: unSucces, text: 'Что-то пошло не так! Попробуйте ещё раз.' });
        }
      })
      .finally(() => setInfoTooltipOpen(true));
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(email);
          navigate("/", { replace: true });
        } else {
          setMessage({ img: unSucces, text: 'Что-то пошло не так! Попробуйте ещё раз.' });
          setInfoTooltipOpen(true);
        }
      })
  }

  function handleExit() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  React.useEffect(() => {
    Api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, [setCurrentUser]);

  React.useEffect(() => {
    Api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, [setCards]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      auth.getContent(token)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err))
    }
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          email={email}
          handleExit={handleExit}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                exact path="/"
                loggedIn={loggedIn}
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login
              onLogin={handleLogin}
            />}
          />
          <Route
            path="/sign-up"
            element={<Register
              onRegister={handleRegistration}
            />}
          />
        </Routes>
        <Footer />
      </div>
      
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopup}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopup}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopup}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <PopupWithForm
        name="delete-element"
        title="Вы уверены?"
        buttonTitle="Да"
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopup}
      ></PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopup}
      />

      <InfoTooltip
        name="info-tooltip"
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopup}
        text={message.text}
        img={message.img}
      />
    </ CurrentUserContext.Provider>
  );
}

export default App;
