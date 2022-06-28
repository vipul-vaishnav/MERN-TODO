import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOne } from './../features/projects/projectSlice';
import Image1 from './../images/icons8-project-96.png';
import Image2 from './../images/icons8-category-96.png';
import Spinner from './Spinner';
import KeyIcon from './../icons/KeyIcon';
import SettingsIcon from './../icons/SettingsIcon';
import DashboardMain from './DashboardMain';

const DashboardDrawer = () => {
  const { project, isLoading, isError, isSuccess, message } = useSelector((state) => state.project);

  const params = useParams();
  const dispatch = useDispatch();
  const { projectID } = params;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      console.log(message);
    }

    dispatch(getOne(projectID));
  }, [isError, message, projectID, dispatch, isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="h-full bg-gray-100 drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col items-center justify-center overflow-x-auto overflow-y-auto drawer-content">
        {/* <!-- Page content here --> */}
        <DashboardMain />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="p-4 overflow-y-auto sm:w-76 w-72 lg:border-r-2 lg:border-gray-200 menu bg-base-100 text-base-content">
          <li className="mb-2 overflow-x-auto border-b border-gray-200">
            <span className="text-lg font-semibold">
              <img src={Image1} alt="project-icon" className="w-7" /> {project.title}
            </span>
          </li>
          <li className="mb-2 overflow-x-auto border-b border-gray-200">
            <span className="text-sm font-medium">
              <KeyIcon />
              {project.key}
            </span>
          </li>
          <li className="mb-2 overflow-x-auto border-b border-gray-200">
            <span className="text-sm font-medium">
              <img src={Image2} alt="project-icon" className="w-6" /> {project.category}
            </span>
          </li>
          <li className="mb-2 overflow-x-auto border-b border-gray-200">
            <span className="text-sm font-medium text-white bg-gray-900 btn">
              <SettingsIcon />
              Project Settings
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardDrawer;
