import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Image from './../images/icons8-group-of-projects-96.png';
import ChevronDown from './../icons/ChevronDown';
import HomeIcon from './../icons/HomeIcon';
import UserIcon from './../icons/UserIcon';
import Logout from './../icons/Logout';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const DashboardHeader = ({ windowWidth }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div className="shadow-md navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <button
          onClick={() => navigate('/')}
          className="text-xl font-bold tracking-wider normal-case sm:tracking-widest btn btn-ghost"
        >
          Taskzap
        </button>
        <button className="flex items-center justify-center gap-2 text-base font-medium normal-case btn btn-ghost">
          {windowWidth <= 640 && <img src={Image} className="w-6" alt="group-of-projects" />}
          {windowWidth > 640 && <span>Projects</span>}
          <ChevronDown />
        </button>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost rounded-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </label>
          <ul tabIndex="0" className="p-3 mt-4 shadow-md w-52 menu dropdown-content bg-base-100 rounded-box">
            <li>
              <Link to="/" className="flex items-center justify-center gap-2 text-xl font-semibold">
                <HomeIcon />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center justify-center gap-2 mt-2 text-xl font-semibold"
              >
                <UserIcon />
                <span>Profile</span>
              </button>
            </li>
            <li>
              <button
                onClick={onLogout}
                className="flex items-center justify-center gap-2 mt-2 text-base font-semibold text-white transition-all bg-gray-900 rounded-md hover:scale-95"
              >
                <Logout />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
