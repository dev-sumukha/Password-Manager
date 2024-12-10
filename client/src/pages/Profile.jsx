import React, { useEffect, useState, useContext } from 'react';
import userContext from '../store/UserContext';
import axios from 'axios';

function Profile() {
  const [showKey, setShowKey] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enteredKey, setEnteredKey] = useState('');
  const [decryptedKey, setDecryptedKey] = useState('');
  const { user, token } = useContext(userContext);

  const handleShowKey = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEnteredKey('');
  };

  const handleShowPassword = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/userAuth/showKey',
        { enteredKey },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 && enteredKey === res.data.decryptedUserKey) {
        setDecryptedKey(res.data.decryptedUserKey);
        setShowKey(true);
        setIsModalOpen(false);
      } else if (res.status === 401) {
        setShowKey(true);
        alert('User Key is incorrect');
      }
    } catch (error) {
      console.log('Error:', error.message);
      alert('An error occurred while fetching the key');
    }
  };

  useEffect(() => {
    if (user && user.user) {
      console.log('User ID:', user.user._id);
    } else {
      console.log('User data is not loaded yet');
    }
  }, [user]);

  if (!user || !user.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-1/4 bg-primary p-6">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-400 mb-4">
            {user.user.profilePicUrl?(
              <img src={user.user.profilePicUrl} alt="Profile Image" className="w-full h-full rounded-full object-cover"/>
            ):(
              <h5>{user.user.username}</h5>
            )}
          </div>
          <h2 className="text-white text-2xl font-bold">{user.user.username}</h2>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Profile Information</h1>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <p className="mt-1 text-gray-900">{user.user.username}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{user.user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <p className="mt-1 text-gray-900">{user.user.mobileNumber}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <p className="mt-1 text-gray-900">{user.user.gender}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Encryption Key</label>
              <div className="flex items-center mt-1">
                <p className="text-gray-900 mr-4">{showKey ? decryptedKey : '********'}</p>
                <button
                  onClick={handleShowKey}
                  className="bg-primary text-white py-1 px-3 rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                >
                  {showKey ? 'Hide Key' : 'Show Key'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Enter Key</h2>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter your key"
              value={enteredKey}
              onChange={(e) => setEnteredKey(e.target.value)}
            />
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700 py-1 px-4 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleShowPassword}
                className="bg-primary text-white py-1 px-4 rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
