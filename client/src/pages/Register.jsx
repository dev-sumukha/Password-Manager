import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [user, setUser] = useState({
    username: '', 
    email: '',
    key: '',
    mobileNumber: '', 
    profilePicUrl: null, // Assuming this is a URL or base64 string after upload
    gender: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prevUser) => ({
        ...prevUser,
        profilePicUrl: file, 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creating FormData to handle file uploads
    const formData = new FormData();
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    try {
      const res = await axios.post('http://localhost:3000/api/userAuth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      if (res.data.message === 'user exists') {
        alert('User already exists');
      } else {
        alert('User registered successfully');
      }
    } catch (error) {
      console.error('Error ', error.message);
      alert('Something went wrong');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 items-center justify-center bg-primary h-full w-2/4">
        <h1 className="text-textColor text-5xl font-medium">Register</h1>
      </div>
      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                type="text"
                id="username"
                name="username"
                placeholder="rocky-ramdev"
                value={user.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="key">Key</label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                type="password"
                id="key"
                name="key"
                placeholder="Enter key to encrypt the password"
                value={user.key}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="mobileNumber">Mobile Number</label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                type="number"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="9876543210"
                value={user.mobileNumber}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="profilePicture">Profile Picture</label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                type="file"
                id="profilePicture"
                name="profilePicUrl"
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={user.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
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
              className="w-full bg-primary text-white py-2 px-4 rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              type="submit"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account? <NavLink to="/login" className="text-primary hover:underline">Sign in</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
