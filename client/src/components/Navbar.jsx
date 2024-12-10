import React, { useContext, useState } from 'react';
import { LogIn, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Shield } from 'lucide-react';
import userContext from '../store/UserContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useContext(userContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar bg-primary text-textColor p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="navbar-brand flex items-center space-x-2 text-2xl font-bold">
          <span><Shield /></span>
          <span>Kavach</span>
        </div>
        <div className="navbar-toggler md:hidden">
          <button onClick={toggleMenu} className="text-textColor focus:outline-none">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <ul className={`navbar-menu md:flex space-x-6 absolute md:static bg-primary md:bg-transparent w-full left-0 md:w-auto px-4 py-2 md:py-0 md:px-0 transition-all duration-300 ease-in-out ${isOpen ? 'top-14' : '-top-full'}`}>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/passwords" className="navbar-item block py-2 md:py-0 md:inline hover:text-gray-400">Passwords</NavLink>
              </li>
              {/* <li>
                <NavLink to="/addPassword" className="navbar-item block py-2 md:py-0 md:inline hover:text-gray-400">Add password</NavLink>
              </li> */}
              <li>
                <NavLink to="/profile" className="navbar-item block py-2 md:py-0 md:inline hover:text-gray-400">Profile</NavLink>
              </li>

              <NavLink to="/logout" className="navbar-item flex items-center hover:text-gray-400">
                <button className="btn btn-danger">
                  Logout
                </button>
              </NavLink>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/" className="navbar-item block py-2 md:py-0 md:inline hover:text-gray-400">Home</NavLink>
              </li>
              <div className="hidden md:flex space-x-4">
                <NavLink to="/register">
                  <button className="btn btn-primary">
                    Register
                  </button>
                </NavLink>
                <NavLink to="/login">
                  <button className="btn">
                    Login
                  </button>
                </NavLink>
              </div>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;