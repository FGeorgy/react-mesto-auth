import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  };

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="url"
          id="popup__input-avatar"
          name="avatar"
          className="popup__input"
          placeholder="Ссылка на аватар"
          required
          ref={avatarRef}
        />
        <span
          className="popup__input-error popup__input-avatar-error"
        ></span>
      </label>
    </PopupWithForm>
  )
};

export default EditAvatarPopup;