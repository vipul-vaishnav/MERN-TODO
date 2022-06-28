import React, { useState, useEffect, useCallback } from 'react';
import Image from './../images/icons8-project-96.png';
import Footer from './../components/Footer';
import ErrorAlert from './../alerts/ErrorAlert';
import SuccessAlert from './../alerts/SuccessAlert';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset, create } from './../features/projects/projectSlice';
import Spinner from './../components/Spinner';

const CreateProject = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Alert
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [success, setSuccess] = useState({
    status: false,
    message: '',
  });

  // Readonly fields
  const owner = user.name || '';
  const status = 'New';

  // Handle Form Fields
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');
  const [category, setCategory] = useState('Software');
  const [priority, setPriority] = useState('High');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  // Reset Form
  const resetForm = useCallback(() => {
    setTitle('');
    setKey('');
    setCategory('Software');
    setPriority('High');
    setStartDate('');
    setEndDate('');
    setUrl('');
    setDescription('');
  }, []);

  useEffect(() => {
    // Error case
    if (isError) {
      setError({
        status: true,
        message: message,
      });
      setTimeout(() => {
        setError({
          status: false,
          message: '',
        });
      }, 3000);
    }

    // Success case
    if (isSuccess) {
      setSuccess({
        status: true,
        message: message,
      });
      setTimeout(() => {
        setSuccess({
          status: false,
          message: '',
        });
        navigate('/view-projects');
      }, 3000);

      // Resetting the form if project created successfully
      resetForm();
    }

    dispatch(reset());
  }, [isError, message, isSuccess, navigate, dispatch, resetForm]);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const date_diff = new Date(startDate).valueOf() - new Date(endDate).valueOf();

    if (date_diff >= 0) {
      setError({
        status: true,
        message: 'End date must be greater than start date',
      });
      setTimeout(() => {
        setError({
          status: false,
          message: '',
        });
      }, 3000);
      return;
    }

    const formData = {
      title,
      key,
      owner,
      category,
      status,
      priority,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      url,
      description,
    };

    dispatch(create(formData));
  };

  // Check loadingstatus
  if (isLoading) {
    return <Spinner />;
  }

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
          <form onSubmit={handleSubmit}>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title for project"
                className="w-full input input-bordered"
                autoComplete="off"
                required
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
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter a key for project"
                className="w-full input input-bordered"
                autoComplete="off"
                required
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
                defaultValue={owner}
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
              <select
                className="w-full font-normal select select-bordered"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option disabled>Choose a category for this project</option>
                <option value="Software">Software</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
                <option value="Research & Development (R/D)">Research & Development (R/D)</option>
                <option value="Educational">Educational</option>
                <option value="Other">Other</option>
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
                defaultValue={status}
                className="w-full input input-bordered focus:outline-none"
                autoComplete="off"
                readOnly
              />
            </div>
            <div className="my-3">
              <label htmlFor="priority" className="block mb-2 font-medium cursor-pointer">
                Priority<span className="text-red-400">*</span>
              </label>
              <select
                className="w-full font-normal select select-bordered"
                id="priority"
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option disabled>Choose the priority of this project</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
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
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full input input-bordered"
                autoComplete="off"
                required
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
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full input input-bordered"
                autoComplete="off"
                required
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
                value={url}
                onChange={(e) => setUrl(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                autoComplete="off"
              ></textarea>
            </div>
            {/* Alert Blocks */}
            {error.status && <ErrorAlert message={error.message} />}
            {success.status && <SuccessAlert message={success.message} />}
            {/* Buttons or call to actions */}
            <div className="w-full my-6 btn-group">
              <button
                type="reset"
                onClick={() => {
                  resetForm();
                  navigate('/');
                }}
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
