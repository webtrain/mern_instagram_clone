import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes';
import Avatar from '../Avatar';

const Menu = () => {
  const navLinks = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Message', icon: 'near_me', path: '/message' },
    { label: 'Discover', icon: 'explore', path: '/discover' },
    { label: 'Notify', icon: 'favorite', path: '/notify' },
  ];

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return 'active';
  };

  return (
    <div className="menu" id="navbarSupportedContent">
      <ul className="navbar-nav flex-row">
        {navLinks.map((link, i) => (
          <li className={`nav-item px-2 ${isActive(link.path)}`} key={i}>
            <Link to={link.path} className="nav-link">
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Avatar size="medium-avatar" src={auth.user.avatar} />
          </span>

          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
              Profile
            </Link>
            <label
              htmlFor="theme"
              className="dropdown-item"
              onClick={() => dispatch({ type: GLOBAL_TYPES.THEME, payload: !theme })}
            >
              {theme ? 'Light Mode' : 'Dark Mode'}
            </label>

            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to={`/`} onClick={() => dispatch(logout())}>
              Logout
            </Link>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
