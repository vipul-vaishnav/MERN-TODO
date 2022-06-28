import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStatus } from './../hooks/useAuthStatus';
import Spinner from './Spinner';
import Profile from './../pages/Profile';
import ViewProjects from './../pages/ViewProjects';
import CreateProject from './../pages/CreateProject';
import Notifications from './../pages/Notifications';

const PrivateRoute = () => {
  const [loggedIn, checkingStatus] = useAuthStatus();
  const { pathname } = useLocation();

  if (checkingStatus) {
    return <Spinner />;
  }

  if (pathname === '/profile') {
    return loggedIn ? <Profile /> : <Navigate to="/login" />;
  }

  if (pathname === '/create-project') {
    return loggedIn ? <CreateProject /> : <Navigate to="/login" />;
  }

  if (pathname === '/view-projects') {
    return loggedIn ? <ViewProjects /> : <Navigate to="/login" />;
  }

  if (pathname === '/notifications') {
    return loggedIn ? <Notifications /> : <Navigate to="/login" />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
