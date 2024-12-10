import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import userContext from '../store/UserContext'; // Correct import path

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { storeTokenInLS } = useContext(userContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/userAuth/login', user);
      
      if (res) {
        storeTokenInLS(res.data.token);
        console.log(res);
        // Clear input fields
        setUser({
          email: '',
          password: ''
        });
        setError(''); // Clear any existing errors
        navigate('/profile');
      } 
    } catch (error) {
      setError('Failed to log in. Please check your credentials and try again.');
      console.log('Error ', error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 items-center justify-center bg-primary h-full w-2/4">
        <h1 className="text-textColor text-5xl font-medium">Login</h1>
      </div>
      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Username/Email
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                type="text"
                id="email"
                name="email"
                placeholder="Sumukha Sureban"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={user.password}
                onChange={handleChange}
              />
            </div>

            <button
              className="w-full bg-primary text-white py-2 px-4 rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 hover:bg-gray-800"
              type="submit"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <NavLink to="/register" className="text-primary hover:underline">
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
