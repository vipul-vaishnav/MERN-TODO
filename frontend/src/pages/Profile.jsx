import React, { useState, useEffect } from 'react';
import Image from './../images/icons8-male-user-96.png';
import { useSelector, useDispatch } from 'react-redux';
import MenuClose from './../icons/MenuClose';
import ErrorAlert from './../alerts/ErrorAlert';
import SuccessAlert from './../alerts/SuccessAlert';
import Spinner from './../components/Spinner';
import { changePassword, reset } from './../features/auth/authSlice';

const Profile = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const [curr_password, setCurrPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [new_password_cnf, setNewPassword_cnf] = useState('');
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [success, setSuccess] = useState({
    status: false,
    message: '',
  });

  const dispatch = useDispatch();

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
      }, 3000);

      setNewPassword('');
      setNewPassword_cnf('');
      setCurrPassword('');
    }

    dispatch(reset());
  }, [isError, message, isSuccess, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!curr_password || curr_password.trim().length < 8) {
      setError({
        status: true,
        message: 'Current password is invalid',
      });
      setTimeout(() => {
        setError({
          status: false,
          message: '',
        });
      }, 3000);
      return;
    }

    if (!new_password || new_password.trim().length < 8) {
      setError({
        status: true,
        message: 'Password must be at least 8 characters',
      });
      setTimeout(() => {
        setError({
          status: false,
          message: '',
        });
      }, 3000);
      return;
    }

    if (new_password !== new_password_cnf) {
      setError({
        status: true,
        message: 'Passwords do not match',
      });
      setTimeout(() => {
        setError({
          status: false,
          message: '',
        });
      }, 3000);
      return;
    }

    const formData = { curr_password, new_password, new_password_cnf };

    dispatch(changePassword(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="py-12 sm:py-16">
      <h1 className="flex items-center justify-center gap-5 mb-8 sm:mb-12">
        <img src={Image} alt="profile-icon" className="w-8 sm:w-12" />
        <span className="text-3xl font-semibold sm:text-5xl">Profile</span>
      </h1>
      <div className="flex items-center justify-start gap-4 mb-8">
        <div className="static avatar placeholder">
          <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
            <span className="text-xl">{user.name[0].toUpperCase()}</span>
          </div>
        </div>
        <p className="text-2xl font-semibold">
          Welcome! <span className="text-gray-400">{user.name}</span>
        </p>
      </div>
      <div>
        <div className="my-3">
          <label htmlFor="userid" className="block mb-2 font-medium">
            User ID
          </label>
          <input
            type="text"
            id="userid"
            name="userid"
            value={user._id}
            className="w-full input input-bordered focus:outline-none"
            readOnly={true}
          />
        </div>
        <div className="my-3">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            className="w-full input input-bordered focus:outline-none"
            readOnly={true}
          />
        </div>
      </div>
      {error.status && <ErrorAlert message={error.message} />}
      {success.status && <SuccessAlert message={success.message} />}

      {/* ============ MODAL ================ */}
      <label htmlFor="my-modal-6" className="my-3 bg-gray-900 btn btn-block modal-button">
        Change Password
      </label>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Reset your password</h3>
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="curr_password" className="block mb-2 font-medium cursor-pointer">
                Current Password
              </label>
              <input
                type="password"
                id="curr_password"
                name="curr_password"
                value={curr_password}
                onChange={(e) => setCurrPassword(e.target.value)}
                placeholder="Type here"
                className="w-full input input-bordered"
                autoComplete="off"
              />
            </div>
            <div className="my-3">
              <label htmlFor="password" className="block mb-2 font-medium cursor-pointer">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={new_password}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Type here"
                className="w-full input input-bordered"
                autoComplete="off"
              />
            </div>
            <div className="my-3">
              <label htmlFor="password_cnf" className="block mb-2 font-medium cursor-pointer">
                Confirm password
              </label>
              <input
                type="password"
                id="password_cnf"
                name="password_cnf"
                value={new_password_cnf}
                onChange={(e) => setNewPassword_cnf(e.target.value)}
                placeholder="Type here"
                className="w-full input input-bordered"
                autoComplete="off"
              />
            </div>
            {error.status && <ErrorAlert message={error.message} />}
            {success.status && <SuccessAlert message={success.message} />}
            <button type="submit" className="my-4 bg-gray-900 btn btn-block">
              Reset Password
            </button>
          </form>
          <div className="modal-action">
            <label
              htmlFor="my-modal-6"
              className="bg-gray-900 btn"
              onClick={() => {
                setNewPassword('');
                setNewPassword_cnf('');
              }}
            >
              <MenuClose />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
