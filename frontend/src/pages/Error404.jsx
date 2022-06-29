import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './../components/Header';
import NavModal from './../components/NavModal';
import BackIcon from './../icons/BackIcon';

const Error404 = ({ windowWidth, setShowModal, showModal }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl px-5 mx-auto text-base font-normal text-gray-900 bg-white sm:px-12 md:px-24 font-poppins">
      <Header windowWidth={windowWidth} setShowModal={setShowModal} />
      {windowWidth < 640 && showModal && <NavModal setShowModal={setShowModal} />}
      <div className="py-16">
        <h1 className="text-5xl font-extrabold text-center sm:text-7xl md:text-8xl">
          Error! <span className="text-gray-400">404</span>
        </h1>
        <p className="my-8 font-semibold text-center sm:text-xl sm:my-12">Oops! page not found</p>
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-full h-12 gap-4 my-5 font-bold text-gray-900 transition-all bg-white border-2 border-gray-900 rounded-md hover:scale-95"
          >
            <BackIcon />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
