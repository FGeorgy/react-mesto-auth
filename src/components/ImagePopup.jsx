function ImagePopup(props) {
  return (
    <div id="zoom-image" className={`popup popup_darker-background ${props.card._id ? 'popup_opened' : ''}`}>
      <figure className="popup__figure">
        <img
          src={props.card.link}
          className="popup__image"
          alt={props.card.name}
        />
        <figcaption className="popup__caption">
          {props.card.name}
        </figcaption>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
      </figure>
    </div>
  )
};

export default ImagePopup;