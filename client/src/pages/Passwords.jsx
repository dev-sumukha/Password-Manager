import React, { useEffect, useState, useContext } from 'react';
import Card from '../components/Card';
import userContext from '../store/UserContext';
import axios from 'axios';

function Passwords() {
  const [modalOpen, setModalOpen] = useState(false);
  const [key, setKey] = useState('');
  const [passwords, setPasswords] = useState([]);

  const [newPassword, setNewPassword] = useState({
    website: '',
    password: '',
  });
  const { token } = useContext(userContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  };

  const handleAddPassword = () => {
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.log('Token is undefined');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/password/addPassword', newPassword, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      // console.log(res.data);
      getUserPasswords();
      setModalOpen(false);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const getUserPasswords = async () => {
    if (!token) {
      console.log('Token is undefined');
      return;
    }

    try {
      const res = await axios.get('http://localhost:3000/api/password/getPasswords', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPasswords(res.data.passwordList.passwords);
      // console.log(res.data.passwordList.passwords);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };
  const set = ()=>{
    setPasswords()
  }

  const handleShowPassword = async () => {
    if(!key){
      alert("Please enter the key");
    }

    if (!token) {
      alert('Unauthorized user');
      console.log('Unauthorized user');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/password/showPasswords', { key }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(res);
      setPasswords(res.data.decryptedPasswords)

      setTimeout(() => {
        window.location.reload();
      }, 10000);

    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserPasswords();
    }
  }, [token]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div>
        <div className="w-full flex justify-between mb-6">
          <button
            className="bg-primary ml-12 px-8 py-2 text-textColor rounded-md"
            onClick={handleAddPassword}
          >
            Add Password
          </button>

          <div>
            <input
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              type="password"
              placeholder="Enter decryption key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <button
              className="bg-primary text-white mr-12 px-8 py-2 ml-4 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300"
              onClick={handleShowPassword}
            >
              Show
            </button>
          </div>
        </div>
        </div>
        <div className="grid gap-6 mt-6">
          {passwords.map((password, index) => (
            <Card key={index} password={password} />
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Store Your Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="website">
                  Website Name
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  type="text"
                  id="website"
                  name="website"
                  value={newPassword.website}
                  onChange={handleInputChange}
                  placeholder="example.com"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  type="password"
                  id="password"
                  name="password"
                  value={newPassword.password}
                  onChange={handleInputChange}
                  placeholder="********"
                />
              </div>

              <div className="flex flex-col gap-2">
                <button
                  className="w-full bg-primary text-white py-2 px-4 rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  type="submit"
                >
                  Save Password
                </button>
                <button
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  type="button"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Passwords;
