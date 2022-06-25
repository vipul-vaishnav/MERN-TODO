import React from 'react';

const Login = () => {
  return (
    <section className="py-12 pb-0 sm:py-16 sm:pb-0">
      <h1 className="text-5xl font-extrabold text-center md:text-8xl">
        <span>Login</span>
      </h1>
      <p className="my-8 font-semibold text-center sm:text-xl sm:my-12">Log in to your account to use Taskzap</p>
      <div className="my-12 sm:my-16">
        <form>
          <div className="my-3">
            <label htmlFor="email" className="block mb-2 font-medium cursor-pointer">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
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
              placeholder="Type here"
              className="w-full input input-bordered"
              autoComplete="off"
            />
          </div>
          <button className="my-4 text-white bg-gray-900 btn btn-block">Register</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
