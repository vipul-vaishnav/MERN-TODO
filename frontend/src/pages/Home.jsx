import React from 'react';
import ProjectsIcon from './../icons/ProjectsIcon';
import CreateNewIcon from './../icons/CreateNewIcon';

const Home = () => {
  return (
    <div className="py-16">
      <h1 className="text-5xl font-extrabold text-center md:text-8xl">
        Welcome to <span className="text-gray-400">Taskzap</span>
      </h1>
      <p className="my-8 font-semibold text-center sm:text-xl sm:my-12">
        a workplace where you manage workflows and tasks
      </p>

      <div>
        <button className="flex items-center justify-center w-full h-12 gap-4 my-5 font-bold text-gray-900 transition-all bg-white border-2 border-gray-900 rounded-md hover:scale-95">
          <CreateNewIcon />
          <span>Create a new project</span>
        </button>
        <button className="flex items-center justify-center w-full h-12 gap-4 my-5 font-bold text-white transition-all bg-gray-900 rounded-md hover:scale-95">
          <ProjectsIcon />
          <span>View My Projects</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
