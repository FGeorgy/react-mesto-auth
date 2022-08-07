import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  };
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description
    });
  };

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <>
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <label className="popup__label">
          <input
            type="text"
            id="popup__input-name"
            name="name"
            className="popup__input"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            value={name || ''}
            onChange={handleNameChange}
          />
          <span
            className="popup__input-error popup__input-name-error"
          ></span>
        </label>
        <label className="popup__label">
          <input
            type="text"
            id="popup__input-about"
            name="about"
            className="popup__input"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
            value={description || ''}
            onChange={handleDescriptionChange}
          />
          <span
            className="popup__input-error popup__input-about-error"
          ></span>
        </label>
      </ PopupWithForm>
    </>
  )
};

export default EditProfilePopup;