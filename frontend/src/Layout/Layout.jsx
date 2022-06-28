import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './../components/Header';
import NavModal from './../components/NavModal';

const Layout = ({ windowWidth, setShowModal, showModal }) => {
  return (
    <div className="max-w-6xl px-5 mx-auto text-base font-normal text-gray-900 bg-white sm:px-12 md:px-24 font-poppins">
      <Header windowWidth={windowWidth} setShowModal={setShowModal} />
      {windowWidth < 640 && showModal && <NavModal setShowModal={setShowModal} />}
      <Outlet />
    </div>
  );
};

export default Layout;
