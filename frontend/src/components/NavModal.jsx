import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from './../icons/LoginIcon';
import RegisterIcon from './../icons/RegisterIcon';
import MenuClose from './../icons/MenuClose';
import HomeIcon from './../icons/HomeIcon';
import Logout from './../icons/Logout';
import UserIcon from './../icons/UserIcon';
import BellIcon from './../icons/BellIcon';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const NavModal = ({ setShowModal }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

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
          {user ? (
            <>
              <li>
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center justify-center gap-2 text-xl font-semibold"
                >
                  <UserIcon />
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <Link to="/notifications" className="flex items-center justify-center gap-2 text-xl font-semibold">
                  <BellIcon />
                  <span>Notifications</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="flex items-center justify-center gap-2 px-5 py-2 text-base font-semibold text-white transition-all bg-gray-900 rounded-md hover:scale-95"
                >
                  <Logout />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavModal;
