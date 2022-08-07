import React from 'react';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    const {value} = e.target;
    setEmail(value);
  }
  function handleChangePassword(e) {
    const {value} = e.target;
    setPassword(value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <>
      <div className="entry">
        <form
          name="form-entry"
          id="form-entry"
          className="entry__form"
          onSubmit={handleSubmit}
        >
          <h2 className="entry__title">Вход</h2>
          <label className="entry__label">
            <input
              type="email"
              id="entry__input-email"
              name="email"
              className="entry__input"
              placeholder="Email"
              required
              onChange={handleChangeEmail}
            />
            <span
              className="entry__input-error entry__input-email-error"
            ></span>
          </label>
          <label className="entry__label">
            <input
              type="password"
              id="entry__input-password"
              name="password"
              className="entry__input"
              placeholder="Пароль"
              required
              onChange={handleChangePassword}
            />
            <span
              className="entry__input-error entry__input-password-error"
            ></span>
          </label>
          <button
            type="submit"
            name="entry__button"
            className="entry__button"
          >Войти</button>
        </form>
      </div>
    </>
  );
};

export default Login;