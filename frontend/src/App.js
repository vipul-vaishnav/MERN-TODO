import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NavModal from './components/NavModal';

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

  return (
    <div className="max-w-6xl px-5 mx-auto text-base font-normal text-gray-900 bg-white font-poppins sm:px-12 md:px-24">
      <Header windowWidth={windowWidth} setShowModal={setShowModal} />
      {windowWidth < 640 && showModal && <NavModal setShowModal={setShowModal} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
