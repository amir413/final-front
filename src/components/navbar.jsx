import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    console.log("Logout function executed!"); // Debugging line
    localStorage.removeItem('username');
    setUsername(null);
    window.location.reload();
  };

  useEffect(() => {
    console.log("Navbar component rendered!"); // Debugging line
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <div className="relative z-50">
      <nav className="w-full">
        <div className="relative">
          <div className="flex justify-between items-center max-w-screen-lg mx-auto">
            <div className="text-2xl mb-5 pt-4 pb-4">
              <Link to="/" className="hover:none m-4">CLOTHES</Link>
            </div>

            <div className="md:hidden m-5">
              <button onClick={() => setIsOpen(!isOpen)} className="relative text-3xl focus:outline-none">
                {isOpen ? (
                  <span className="block w-6 h-6 relative">
                    <span className="absolute inset-0 bg-black block h-1 w-6 transform rotate-45"></span>
                    <span className="absolute inset-0 bg-black block h-1 w-6 transform -rotate-45"></span>
                  </span>
                ) : (
                  <span>&#9776;</span>
                )}
              </button>
            </div>

            <ul className="hidden md:flex space-x-6 m-4">
              <li className="cursor-pointer mb-5">
                <Link to="/women">Women</Link>
              </li>
              <li className="cursor-pointer mb-5">
                <Link to="/children">Children</Link>
              </li>
              <li className="cursor-pointer mb-5">
                <Link to="/men">Men</Link>
              </li>
              {username ? (
                <li className="relative cursor-pointer mb-5" ref={dropdownRef}>
                  <span onClick={toggleDropdown} className="relative z-50">
                    Hello, {username}!
                  </span>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                      <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-200">
                          <Link to="/profile">Profile</Link>
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation(); // Prevent click bubbling
                            console.log("Logout button clicked"); // Debugging line
                            handleLogout();
                            setDropdownOpen(false);
                          }}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <>
                  <li className="cursor-pointer mb-5">
                    <Link to="/signin">Login</Link>
                  </li>
                  <li className="cursor-pointer mb-5">
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
