import React from 'react';
import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';

const Header = ({ windowWidth, setShowModal }) => {
  return (
    <header className="flex items-center justify-between py-4 border-b-2 border-gray-200">
      <h1 className="text-lg font-extrabold tracking-wider sm:text-2xl sm:tracking-widest">Taskzap</h1>
      {windowWidth < 640 ? <NavMobile setShowModal={setShowModal} /> : <NavDesktop windowWidth={windowWidth} />}
    </header>
  );
};

export default Header;
