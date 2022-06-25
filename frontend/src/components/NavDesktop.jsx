import React from 'react';
import { Link } from 'react-router-dom';
import LoginIcon from './../icons/LoginIcon';
import RegisterIcon from './../icons/RegisterIcon';
import HomeIcon from './../icons/HomeIcon';

const NavDesktop = () => {
  return (
    <nav>
      <ul className="flex items-center justify-center gap-8">
        <li>
          <Link to="/" className="flex items-center justify-center gap-1 text-lg font-semibold">
            <HomeIcon />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/login" className="flex items-center justify-center gap-1 text-lg font-semibold">
            <LoginIcon />
            <span>Login</span>
          </Link>
        </li>
        <li>
          <Link to="/register" className="flex items-center justify-center gap-1 text-lg font-semibold">
            <RegisterIcon />
            <span>Register</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavDesktop;
