import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';
import axios from 'axios';

function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({});
  let isLoggedIn = !!token;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem('token', serverToken);
  };

  const LogoutUser = () => {
    setUser('');
    setToken('');
    localStorage.removeItem('token');
  };

  const userAuthentication = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/userAuth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res) {
        const data = await res.data;
        setUser(data);
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
      console.log('Something went wrong', error.message);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ storeTokenInLS, user, token, isLoggedIn, LogoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
