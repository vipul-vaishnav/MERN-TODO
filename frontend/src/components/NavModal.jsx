import React from 'react';
import { Link } from 'react-router-dom';
import LoginIcon from './../icons/LoginIcon';
import RegisterIcon from './../icons/RegisterIcon';
import MenuClose from './../icons/MenuClose';
import HomeIcon from './../icons/HomeIcon';

const NavModal = ({ setShowModal }) => {
  return (
    <div className="fixed top-0 left-0 w-full px-5 py-4 pb-0 text-right bg-white shadow-lg rounded-b-md">
      <button className="mb-4" onClick={() => setShowModal(false)}>
        <MenuClose />
      </button>
      <hr />
      <nav className="py-8">
        <ul className="flex flex-col items-center justify-center gap-6">
          <li>
            <Link to="/" className="flex items-center justify-center gap-2 text-xl font-semibold">
              <HomeIcon />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/login" className="flex items-center justify-center gap-2 text-xl font-semibold">
              <LoginIcon />
              <span>Login</span>
            </Link>
          </li>
          <li>
            <Link to="/register" className="flex items-center justify-center gap-2 text-xl font-semibold">
              <RegisterIcon />
              <span>Register</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavModal;
