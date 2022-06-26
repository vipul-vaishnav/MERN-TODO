import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from './../alerts/ErrorAlert';
import SuccessAlert from './../alerts/SuccessAlert';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from './../features/auth/authSlice';
import Spinner from './../components/Spinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [success, setSuccess] = useState({
    status: false,
    message: '',
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

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
    if (isSuccess || user) {
      setSuccess({
        status: true,
        message: user.message,
      });
      setTimeout(() => {
        setSuccess({
          status: false,
          message: '',
        });
        navigate('/');
      }, 3000);

      setEmail('');
      setPassword('');
    }

    dispatch(reset());
  }, [isError, message, isSuccess, user, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError({
        status: true,
        message: 'Not a valid email address',
      });
      setTimeout(() => {
        setError({
          status: false,
          message: '',
        });
      }, 3000);
      return;
    }

    if (!password || password.trim().length < 8) {
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

    const formData = { email, password };

    dispatch(login(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="py-12 pb-0 sm:py-16 sm:pb-0">
      <h1 className="text-5xl font-extrabold text-center md:text-8xl">
        <span>Login</span>
      </h1>
      <p className="my-8 font-semibold text-center sm:text-xl sm:my-12">Log in to your account to use Taskzap</p>
      <div className="my-12 sm:my-16">
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <label htmlFor="email" className="block mb-2 font-medium cursor-pointer">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type here"
              className="w-full input input-bordered"
              autoComplete="off"
            />
          </div>
          {error.status && <ErrorAlert message={error.message} />}
          {success.status && <SuccessAlert message={success.message} />}
          <button type="submit" className="my-4 tracking-widest text-white bg-gray-900 btn btn-block">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
