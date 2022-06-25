import React from 'react';
import MenuOpen from './../icons/MenuOpen';

const NavMobile = ({ setShowModal }) => {
  return (
    <button onClick={() => setShowModal(true)}>
      <MenuOpen />
    </button>
  );
};

export default NavMobile;
