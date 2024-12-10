import React from 'react';

function AddPassword() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-1 items-center justify-center bg-primary h-full w-2/4">
        <h1 className="text-textColor text-5xl font-medium">Add Password</h1>
      </div>
      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Store Your Password</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="website">Website Name</label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                type="text"
                id="website"
                name="website"
                placeholder="example.com"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                type="password"
                id="password"
                name="password"
                placeholder="********"
              />
            </div>

            <button
              className="w-full bg-primary text-white py-2 px-4 rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 hover:bg-gray-800"
              type="submit"
            >
              Save Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPassword;
