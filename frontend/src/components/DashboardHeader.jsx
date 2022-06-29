import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Image from './../images/icons8-group-of-projects-96.png';
import ChevronDown from './../icons/ChevronDown';
import HomeIcon from './../icons/HomeIcon';
import UserIcon from './../icons/UserIcon';
import Logout from './../icons/Logout';
import PlusIcon from './../icons/PlusIcon';
import BellIcon from './../icons/BellIcon';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { get } from './../features/projects/projectSlice';
import Spinner from './Spinner';

const DashboardHeader = ({ windowWidth }) => {
  const { projects, isSuccess, isLoading } = useSelector((state) => state.project);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(get());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="border shadow-md navbar bg-base-100 border-b-gray-200">
      <div className="flex-none">
        <label
          htmlFor="my-drawer-2"
          className={`${windowWidth > 1024 && 'cursor-not-allowed'} btn btn-square btn-ghost`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <button
          onClick={() => navigate('/')}
          className="text-xl font-bold tracking-wider normal-case sm:tracking-widest btn btn-ghost"
        >
          Taskzap
          {windowWidth > 768 && (
            <span className="py-1 ml-2 text-lg font-medium tracking-wide text-gray-600">Project Management</span>
          )}
        </button>
        <div className="flex-none">
          <ul className="p-0 menu menu-horizontal">
            <li tabIndex="0">
              <button className="flex items-center justify-center gap-2 text-base font-medium normal-case btn btn-ghost">
                {windowWidth <= 640 && <img src={Image} className="w-6" alt="group-of-projects" />}
                {windowWidth > 640 && <span>Projects</span>}
                <ChevronDown />
              </button>
              <ul className="z-50 p-2 -ml-24 overflow-x-hidden overflow-y-auto shadow-2xl sm:-ml-5 bg-base-100 max-h-90vh">
                {projects && projects.length > 0 && projects.length <= 10
                  ? projects.map((project, idx) => {
                      return (
                        <li key={idx}>
                          <Link to={`/dashboard/${project._id}`} className="hover:underline">
                            <span className="font-semibold">{idx + 1}</span> {project.title}
                          </Link>
                        </li>
                      );
                    })
                  : projects.map((project, idx) => {
                      if (idx < 10) {
                        return (
                          <li key={idx}>
                            <Link to={`/dashboard/${project._id}`} className="hover:underline">
                              <span className="font-semibold">{idx + 1}</span> {project.title}
                            </Link>
                          </li>
                        );
                      }
                      return null;
                    })}
                {projects && projects.length > 10 && (
                  <>
                    <p>...</p>
                    <hr />
                    <li>
                      <Link
                        to="/view-projects"
                        className="flex items-center justify-center h-10 gap-2 mt-1 text-sm font-medium text-white transition-all bg-gray-900 rounded-md hover:scale-95"
                      >
                        View All Projects
                      </Link>
                    </li>
                  </>
                )}
                <hr />
                <li>
                  <Link
                    to="/create-project"
                    className="flex items-center justify-center h-10 gap-1 mt-1 text-sm font-medium text-gray-900 transition-all bg-white border-2 border-gray-900 rounded-md hover:scale-95"
                  >
                    <PlusIcon />
                    Create Project
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
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
              <Link to="/notifications" className="flex items-center justify-center gap-2 text-xl font-semibold">
                <BellIcon />
                <span>Notifications</span>
              </Link>
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
