import React from 'react';

const Register = () => {
  const handleChange = (e) => console.log(e.currentTarget.checked);
  return (
    <section className="py-12 pb-0 sm:py-16 sm:pb-0">
      <h1 className="text-5xl font-extrabold text-center md:text-8xl">
        <span>Register</span>
      </h1>
      <p className="my-8 font-semibold text-center sm:text-xl sm:my-12">Please create an account</p>
      <div className="my-12 sm:my-16">
        <form>
          <div className="my-3">
            <label htmlFor="name" className="block mb-2 font-medium cursor-pointer">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
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
          <div className="my-3">
            <label htmlFor="password_cnf" className="block mb-2 font-medium cursor-pointer">
              Confirm password
            </label>
            <input
              type="password"
              id="password_cnf"
              name="password_cnf"
              placeholder="Type here"
              className="w-full input input-bordered"
              autoComplete="off"
            />
          </div>
          <div className="my-3">
            <div className="form-control">
              <label className="font-medium cursor-pointer label" htmlFor="agree_tnc">
                <span className="font-semibold">
                  By signing up you are agreeing to our{' '}
                  <span className="text-gray-600 underline">Terms and Conditions</span>
                </span>
                <input type="checkbox" checked={true} onChange={handleChange} className="checkbox" />
              </label>
            </div>
          </div>
          <button className="my-4 text-white bg-gray-900 btn btn-block">Register</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
