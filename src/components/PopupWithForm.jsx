function PopupWithForm(props) {
  return (
    <div
      id={props.name}
      className={`popup ${props.isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__wrapper">
        <form
          name={`form-${props.name}`}
          id={`form-${props.name}`}
          className="popup__form"
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            name="popup__save-button"
            className="popup__button"
          >{props.buttonTitle ? props.buttonTitle : 'Сохранить'}</button>
          <button
            type="button"
            className="popup__close-button"
            onClick={props.onClose}
          ></button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;