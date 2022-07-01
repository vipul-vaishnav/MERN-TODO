import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update } from './../features/projects/projectSlice';
import ErrorAlert from './../alerts/ErrorAlert';
import SuccessAlert from './../alerts/SuccessAlert';

const DashboardSettings = () => {
  const { project, isLoading, isError, isSuccess, message } = useSelector((state) => state.project);

  //   Alerts
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [success, setSuccess] = useState({
    status: false,
    message: '',
  });

  //   Date handling
  const SD = new Date(project?.startDate);
  const ED = new Date(project?.endDate);

  const sd_val = `${SD.getFullYear()}-${SD.getMonth() + 1 < 10 ? '0' + (SD.getMonth() + 1) : SD.getMonth() + 1}-${
    SD.getDate() < 10 ? '0' + SD.getDate() : SD.getDate()
  }T${SD.getHours() < 10 ? '0' + SD.getHours() : SD.getHours()}:${
    SD.getMinutes() < 10 ? '0' + SD.getMinutes() : SD.getMinutes()
  }`;

  const ed_val = `${ED.getFullYear()}-${ED.getMonth() + 1 < 10 ? '0' + (ED.getMonth() + 1) : ED.getMonth() + 1}-${
    ED.getDate() < 10 ? '0' + ED.getDate() : ED.getDate()
  }T${ED.getHours() < 10 ? '0' + ED.getHours() : ED.getHours()}:${
    ED.getMinutes() < 10 ? '0' + ED.getMinutes() : ED.getMinutes()
  }`;

  //   Handle Fields
  const [title, setTitle] = useState(project.title || '');
  const [key, setKey] = useState(project.key || '');
  const [category, setCategory] = useState(project.category || 'Software');
  const [priority, setPriority] = useState(project.priority || 'High');
  const [status, setStatus] = useState(project.status || 'New');
  const [startDate, setStartDate] = useState(sd_val || '');
  const [endDate, setEndDate] = useState(ed_val || '');
  const [url, setUrl] = useState(project.url || '');
  const [description, setDescription] = useState(project.description || '');
  const [close_project, setClose_project] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
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
      }, 3000);
    }
  }, [isError, isSuccess, message, dispatch]);

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

    if (status === 'Closed' && close_project !== `${project.owner}/${project.title}/${project.key}`) {
      setError({
        status: true,
        message: 'Incorrect Close String',
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
      owner: project.owner || '',
      category,
      status,
      priority,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      url,
      description,
      close_project,
    };

    dispatch(update({ id: project._id, data: formData }));
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <div className="w-full h-full px-4 py-2 overflow-auto">
      <div className="mb-4 text-sm sm:mb-2 breadcrumbs">
        <ul>
          <li>
            <Link to="/view-projects">All Projects</Link>
          </li>
          <li>
            <Link to={`/dashboard/${project._id}`}>{project.title}</Link>
          </li>
          <li>Settings</li>
        </ul>
      </div>
      <h1 className="text-2xl font-semibold">Settings</h1>
      {/* Settings FORM */}
      <div className="max-w-5xl py-2 mx-auto bg-transparent rounded-md sm:px-3">
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
            <label htmlFor="ID" className="block mb-2 font-medium cursor-pointer">
              ID
            </label>
            <input
              type="text"
              id="ID"
              name="ID"
              defaultValue={project._id || ''}
              placeholder="Type here"
              className="w-full cursor-not-allowed input input-bordered focus:outline-none"
              autoComplete="off"
              readOnly
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
              defaultValue={project.owner || ''}
              placeholder="Type here"
              className="w-full cursor-not-allowed input input-bordered focus:outline-none"
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
              Status<span className="text-red-400">*</span>
            </label>
            <select
              className="w-full font-normal select select-bordered"
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option disabled>Choose a status for this project</option>
              <option value="New">New</option>
              <option value="Active">Active</option>
              <option value="Proposed">Proposed</option>
              <option value="Approved">Approved</option>
              <option value="Unapproved">Unapproved</option>
              <option value="onHold">onHold</option>
              <option value="Closed">Closed</option>
            </select>
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
          {status === 'Closed' && (
            <>
              <div className="px-2 py-3 my-3 bg-red-100 rounded-md">
                <label htmlFor="close_project" className="block mb-2 font-medium cursor-pointer">
                  Close the project!
                  <br />
                  <span className="text-xs text-red-600">
                    System has noticed that you want to close this project. Once closed you will not be able to make any
                    changes to this project. Do you really want to close this project?
                    <br />
                    1. if yes, enter{' '}
                    <span className="font-semibold text-gray-900">{`${project.owner}/${project.title}/${project.key}`}</span>{' '}
                    this in the input field below.
                    <br />
                    2. if no, set the <span className="font-semibold text-gray-400">status</span> of the project to
                    something else.
                  </span>
                </label>
                <input
                  type="text"
                  id="close_project"
                  name="close_project"
                  value={close_project}
                  onChange={(e) => setClose_project(e.target.value)}
                  placeholder="Enter title for project"
                  className="w-full input input-bordered"
                  autoComplete="off"
                  required
                />
              </div>
            </>
          )}
          {/* Alert Blocks */}
          {error.status && <ErrorAlert message={error.message} />}
          {success.status && <SuccessAlert message={success.message} />}
          {/* Buttons or call to actions */}
          <div className="w-full my-6 btn-group">
            <button
              onClick={() => {
                navigate(`/dashboard/${project._id}`);
              }}
              type="reset"
              className="w-1/2 tracking-widest text-gray-900 bg-white border-2 border-gray-900 btn hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-1/2 tracking-widest text-white bg-gray-900 btn ${isLoading && 'loading'}`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardSettings;
