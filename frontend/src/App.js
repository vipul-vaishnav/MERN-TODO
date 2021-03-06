import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error404';
import Layout from './Layout/Layout';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener('resize', setWindowWidth(window.innerWidth));
    };
  }, []);

  // DOCUMENT TITLE CHANGE
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/create-project') {
      document.title = 'Taskzap | Create Project';
    } else if (pathname === '/view-projects') {
      document.title = 'Taskzap | Your Projects';
    } else if (pathname === '/login') {
      document.title = 'Taskzap | Login';
    } else if (pathname === '/register') {
      document.title = 'Taskzap | Register';
    } else if (pathname === '/profile') {
      document.title = 'Taskzap | Profile';
    } else if (pathname === '/dashboard') {
      document.title = 'Taskzap | Dashboard';
    } else {
      document.title = 'Taskzap project management app';
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout windowWidth={windowWidth} showModal={showModal} setShowModal={setShowModal} />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<PrivateRoute />} />
        <Route path="view-projects" element={<PrivateRoute />} />
        <Route path="create-project" element={<PrivateRoute />} />
        <Route path="notifications" element={<PrivateRoute />} />
      </Route>
      <Route path="/dashboard/:projectID" element={<PrivateRoute />}>
        <Route path="/dashboard/:projectID" element={<Dashboard windowWidth={windowWidth} />} />
        <Route path="/dashboard/:projectID/settings" element={<Dashboard windowWidth={windowWidth} />} />
      </Route>
      <Route
        path="*"
        element={<Error404 windowWidth={windowWidth} showModal={showModal} setShowModal={setShowModal} />}
      />
    </Routes>
  );
};

export default App;
