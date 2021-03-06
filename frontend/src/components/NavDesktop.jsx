import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from './../icons/LoginIcon';
import RegisterIcon from './../icons/RegisterIcon';
import HomeIcon from './../icons/HomeIcon';
import UserIcon from './../icons/UserIcon';
import Logout from './../icons/Logout';
import BellIcon from './../icons/BellIcon';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const NavDesktop = ({ windowWidth }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav>
      <ul className="flex items-center justify-center gap-8">
        <li>
          <Link to="/" className="flex items-center justify-center gap-1 text-lg font-semibold">
            <HomeIcon />
            <span>Home</span>
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center justify-center gap-1 text-lg font-semibold"
              >
                <UserIcon />
                <span>Profile</span>
              </button>
            </li>
            <li>
              <Link to="/notifications" className="flex items-center justify-center gap-1 text-lg font-semibold">
                <BellIcon />
                {/* <span>Notifications</span> */}
                {windowWidth > 868 && <span>Notifications</span>}
              </Link>
            </li>
            <li>
              <button
                onClick={onLogout}
                className="flex items-center justify-center gap-1 px-5 py-2 text-base font-semibold text-white transition-all bg-gray-900 rounded-md hover:scale-95"
              >
                <Logout />
                <span>Logout</span>
              </button>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavDesktop;
