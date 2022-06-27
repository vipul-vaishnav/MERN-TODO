import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Image from './../images/icons8-group-of-projects-96.png';
import SearchIcon from './../icons/SearchIcon';
import MoreIcon from './../icons/MoreIcon';
import Footer from './../components/Footer';
import Spinner from './../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { reset, get } from './../features/projects/projectSlice';

const ViewProjects = () => {
  const { projects, isLoading, isSuccess } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(get());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="py-12 pb-0 sm:py-16 sm:pb-0">
        <h1 className="flex items-center justify-center gap-3 mb-8 sm:gap-5 sm:mb-12">
          <img src={Image} alt="project-icon" className="w-8 sm:w-12" />
          <span className="text-xl font-semibold sm:text-5xl">Your Projects</span>
        </h1>
        <p className="my-6 font-semibold text-center sm:text-xl sm:my-12">Here is the list of all your projects</p>
        <p className="my-3 text-gray-400">Search for a project</p>
        <div className="my-3">
          <form className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter title for project"
              className="w-full input input-bordered"
              autoComplete="off"
            />
            <button className="w-full gap-2 bg-gray-900 sm:w-48 sm:gap-0 btn">
              <SearchIcon />
              Search
            </button>
          </form>
        </div>
        <div className="my-8 overflow-x-auto shadow-lg">
          <table className="table w-full table-zebra">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>KEY</th>
                <th>Category</th>
                <th>Owner</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects &&
                projects.length > 0 &&
                projects.map((project, idx) => {
                  return (
                    <tr key={idx}>
                      <th>{idx + 1}</th>
                      <td>{project.title}</td>
                      <td>{project.key}</td>
                      <td>{project.category}</td>
                      <td>{project.owner}</td>
                      <td>{project.status}</td>
                      <td>
                        <div className="tooltip" data-tip="More">
                          <button>
                            <MoreIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewProjects;
