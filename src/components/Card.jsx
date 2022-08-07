import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? '' : 'element__delete-button_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
  )

  function handleClick() {
    props.onCardClick(props.card);
  };
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <article className="element">
      <img
        src={props.card.link}
        className="element__image"
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="element__title-wrapper">
        <h2 className="element__title">
          {props.card.name}
        </h2>
        <div className="element__like-wrapper">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-count">
            {props.card.likes.length}
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </article>
  )
}

export default Card