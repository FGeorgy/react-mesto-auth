import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__ellipse">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__avatar"
          />
          <button
            type="button"
            className="profile__avatar-edit-button"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <button
            type="button"
            className="profile__edit-button"
            name="button-edit-profile"
            onClick={props.onEditProfile}
          ></button>
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          name="button-add-element"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {props.cards.map(item => 
          <Card
            key={item._id}
            card={item}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
          />
        )}
      </section>
    </main>
  )
}

export default Main;