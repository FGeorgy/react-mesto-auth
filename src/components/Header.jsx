import logo from '../images/Logo_mesto.svg';
import { useLocation, Link } from 'react-router-dom';

function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo"/>
      <div className="header__container">
        {
          props.loggedIn ?
          (<>
            <p className='header__email'>{props.email}</p>
            <button className='header__button' onClick={props.handleExit}>Выйти</button>
          </>) :
          (<>
            {
            location.pathname === '/sign-in' ?
              <Link className="header__link" to="/sign-up">Регистрация</Link> :
              <Link className="header__link" to="/sign-in">Войти</Link>
          }
          </>)
        }
      </div>
    </header>
  )
}

export default Header;