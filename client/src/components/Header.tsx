import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { actions } from "../redux/auth-reducer";
import { selectIsAuth } from "../redux/auth-selectors";
import "../scss/Header.scss";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onLogout = () => {
    localStorage.clear();
    dispatch(actions.isAuthChanged(false));
  };

  return (
    <header className="header">
      <div className="logo">
        <NavLink className="logo__link" to="/todo">
          TODOshka
        </NavLink>
      </div>
      <nav className="nav">
        <ul className="nav__list">
          {!isAuth ? (
            <>
              <li className="nav__item">
                <NavLink className="nav__link" to="/auth/login">
                  login
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink className="nav__link" to="/auth/register">
                  register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav__item">
                <NavLink className="nav__link" to="/statistics">
                  statistics
                </NavLink>
              </li>
              <li className="nav__item">
                <span className="header__auth-logout" onClick={onLogout}>
                  logout
                </span>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
