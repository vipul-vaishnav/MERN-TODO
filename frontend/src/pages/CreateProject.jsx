import React from 'react';
import Image from './../images/icons8-project-96.png';
import { useSelector } from 'react-redux';
import Footer from './../components/Footer';

const CreateProject = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="py-12 pb-0 sm:py-16 sm:pb-0">
        <h1 className="flex items-center justify-center gap-3 mb-8 sm:gap-5 sm:mb-12">
          <img src={Image} alt="project-icon" className="w-8 sm:w-12" />
          <span className="text-xl font-semibold sm:text-5xl">Create New Project</span>
        </h1>
        <p className="my-6 font-semibold text-center sm:text-xl sm:my-12">
          Please fill out the details of your project
        </p>
        <div className="my-12 sm:my-16">
          <form>
            <p className="my-3 text-gray-400">
              Fields marked with <span className="text-red-400">*</span> are required
            </p>
            <div className="my-3">
              <label htmlFor="title" className="block mb-2 font-medium cursor-pointer">
                Title<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter title for project"
                className="w-full input input-bordered"
                autoComplete="off"
              />
            </div>
            <div className="my-3">
              <label htmlFor="key" className="block mb-2 font-medium cursor-pointer">
                Key<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="key"
                name="key"
                placeholder="Enter a key for project"
                className="w-full input input-bordered"
                autoComplete="off"
              />
            </div>
            <div className="my-3">
              <label htmlFor="owner" className="block mb-2 font-medium cursor-pointer">
                Owner
              </label>
              <input
                type="text"
                id="owner"
                name="owner"
                value={user.name}
                placeholder="Type here"
                className="w-full input input-bordered focus:outline-none"
                autoComplete="off"
                readOnly
              />
            </div>
            <div className="my-3">
              <label htmlFor="category" className="block mb-2 font-medium cursor-pointer">
                Category<span className="text-red-400">*</span>
              </label>
              <select className="w-full font-normal select select-bordered" id="category" name="category">
                <option disabled>Choose a category for this project</option>
                <option value="software">Software</option>
                <option value="marketing">Marketing</option>
                <option value="business">Business</option>
                <option value="research & development">Research & Development (R/D)</option>
                <option value="educational">Educational</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="my-3">
              <label htmlFor="status" className="block mb-2 font-medium cursor-pointer">
                Status
              </label>
              <input
                type="text"
                id="status"
                name="status"
                value="New"
                className="w-full input input-bordered focus:outline-none"
                autoComplete="off"
                readOnly
              />
            </div>
            <div className="my-3">
              <label htmlFor="priority" className="block mb-2 font-medium cursor-pointer">
                Priority<span className="text-red-400">*</span>
              </label>
              <select className="w-full font-normal select select-bordered" id="priority" name="priority">
                <option disabled>Choose the priority of this project</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="my-3">
              <label htmlFor="startDate" className="block mb-2 font-medium cursor-pointer">
                Start Date & Time<span className="text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                className="w-full input input-bordered"
                autoComplete="off"
              />
            </div>
            <div className="my-3">
              <label htmlFor="endDate" className="block mb-2 font-medium cursor-pointer">
                End Date & Time<span className="text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                className="w-full input input-bordered"
                autoComplete="off"
              />
            </div>
            <div className="my-3">
              <label htmlFor="url" className="block mb-2 font-medium cursor-pointer">
                URL
              </label>
              <input
                type="datetime-url"
                id="url"
                name="url"
                className="w-full input input-bordered"
                placeholder="https://example.com"
                pattern="https://.*"
                autoComplete="off"
              />
            </div>
            <div className="my-3">
              <label htmlFor="description" className="block mb-2 font-medium cursor-pointer">
                Description<span className="text-red-400">*</span>
              </label>
              <textarea
                className="w-full h-48 textarea textarea-bordered"
                placeholder="Description"
                id="description"
                name="description"
              ></textarea>
            </div>
            {/* Buttons or call to actions */}
            <div className="w-full my-6 btn-group">
              <button
                type="submit"
                className="w-1/2 tracking-widest text-gray-900 bg-white border-2 border-gray-900 btn hover:bg-white"
              >
                Cancel
              </button>
              <button type="submit" className="w-1/2 tracking-widest text-white bg-gray-900 btn">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateProject;
