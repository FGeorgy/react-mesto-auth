import React from "react";

function InfoTooltip(props) {
  return (
    <div
      id={props.name}
      className={`popup ${props.isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__wrapper">
        <img src={props.img} alt={props.text} className="popup__tooltip-img"/>
        <p className="popup__tooltip-caption">{props.text}</p>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
};

export default InfoTooltip;