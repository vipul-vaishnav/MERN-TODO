import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavModal from './components/NavModal';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ViewProjects from './pages/ViewProjects';
import CreateProject from './pages/CreateProject';
import { useLocation } from 'react-router-dom';

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
    } else {
      document.title = 'Taskzap project management app';
    }
  }, [pathname]);

  return (
    <div className="max-w-6xl px-5 mx-auto text-base font-normal text-gray-900 bg-white font-poppins sm:px-12 md:px-24">
      <Header windowWidth={windowWidth} setShowModal={setShowModal} />
      {windowWidth < 640 && showModal && <NavModal setShowModal={setShowModal} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/view-projects" element={<PrivateRoute />}>
          <Route path="/view-projects" element={<ViewProjects />} />
        </Route>
        <Route path="/create-project" element={<PrivateRoute />}>
          <Route path="/create-project" element={<CreateProject />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
