import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from './../alerts/ErrorAlert';
import SuccessAlert from './../alerts/SuccessAlert';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from './../features/auth/authSlice';
import Spinner from './../components/Spinner';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_cnf, setPassword_cnf] = useState('');
  const [agree_tnc, setAgree_tnc] = useState(false);
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

      setName('');
      setEmail('');
      setPassword('');
      setPassword_cnf('');
      setAgree_tnc(false);
    }

    dispatch(reset());
  }, [isError, message, isSuccess, user, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setError({
        status: true,
        message: 'Please enter a name',
      });
      setTimeout(() => {
        setError({
          status: false,
          message: '',
        });
      }, 3000);
      return;
    }

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
        message: 'Password must be atleast 8 characters long',
      });
      setTimeout(() => {
        setError({
          status: false,
          message: '',
        });
      }, 3000);
      return;
    }

    if (password !== password_cnf) {
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

    if (!agree_tnc) {
      setError({
        status: true,
        message: 'You have not agreed to terms and conditions',
      });
      setTimeout(() => {
        setError({
          status: false,
          message: '',
        });
      }, 3000);
      return;
    }

    const formData = { name, email, password, password_cnf, agree_tnc };

    dispatch(register(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="py-12 pb-0 sm:py-16 sm:pb-0">
      <h1 className="text-5xl font-extrabold text-center md:text-8xl">
        <span>Register</span>
      </h1>
      <p className="my-8 font-semibold text-center sm:text-xl sm:my-12">Please create an account</p>
      <div className="my-12 sm:my-16">
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <label htmlFor="name" className="block mb-2 font-medium cursor-pointer">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type here"
              className="w-full input input-bordered"
              autoComplete="off"
            />
          </div>
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
          <div className="my-3">
            <label htmlFor="password_cnf" className="block mb-2 font-medium cursor-pointer">
              Confirm password
            </label>
            <input
              type="password"
              id="password_cnf"
              name="password_cnf"
              value={password_cnf}
              onChange={(e) => setPassword_cnf(e.target.value)}
              placeholder="Type here"
              className="w-full input input-bordered"
              autoComplete="off"
            />
          </div>
          <div className="my-3">
            <div className="form-control">
              <label className="font-medium cursor-pointer label" htmlFor="checkbox">
                <span className="font-semibold">
                  By signing up you are agreeing to our{' '}
                  <span className="text-gray-600 underline">Terms and Conditions</span>
                </span>
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={agree_tnc}
                  onChange={(e) => setAgree_tnc(e.target.checked)}
                  className="checkbox"
                />
              </label>
            </div>
          </div>
          {error.status && <ErrorAlert message={error.message} />}
          {success.status && <SuccessAlert message={success.message} />}
          <button type="submit" className="my-4 tracking-widest text-white bg-gray-900 btn btn-block">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
