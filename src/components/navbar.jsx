import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false); // State for burger menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for user dropdown menu
  const dropdownRef = useRef(null); // Reference for the dropdown

  // Close dropdown when clicking outside
  useEffect(() => {
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

  // Toggle the user dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative z-50"> {/* Add z-index to keep it above video */}
      {/* Navbar */}
      <nav className="w-full">
        <div className="relative">
          <div className="flex justify-between items-center max-w-screen-lg mx-auto">
            {/* Logo */}
            <div className="text-2xl mb-5 pt-4 pb-4">
              <Link to="/" className="hover:none m-4">CLOTHES</Link>
            </div>

            {/* Burger Button */}
            <div className="md:hidden m-5">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative text-3xl focus:outline-none"
              >
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

            {/* Desktop Menu */}
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
              {user ? (
                <li className="relative cursor-pointer mb-5" ref={dropdownRef}>
                  <span onClick={toggleDropdown} className="relative z-50">
                    Welcome, {user.name}!
                  </span> {/* Dropdown Trigger */}
                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg"
                      style={{ zIndex: 999 }} // Ensure dropdown is above other elements
                    >
                      <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-200">
                          <Link to="/profile">Profile</Link>
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false); // Close dropdown on logout
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
                    <Link to="/signin">Login</Link> {/* Link to Login */}
                  </li>
                  <li className="cursor-pointer mb-5">
                    <Link to="/register">Register</Link> {/* Link to Register */}
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Border Line */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg border-b border-gray-300"></div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-10 z-50 transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden backdrop-blur-md`}
      >
        <ul className="flex flex-col mt-16 space-y-4 text-white">
          <li className="cursor-pointer pb-4" onClick={() => setIsOpen(false)}>
            <Link to="/women">WOMEN</Link>
          </li>
          <li className="cursor-pointer pb-4" onClick={() => setIsOpen(false)}>
            <Link to="/men">MEN</Link>
          </li>
          <li className="cursor-pointer pb-4" onClick={() => setIsOpen(false)}>
            <Link to="/children">KIDS</Link>
          </li>
          {user ? (
            <li className="cursor-pointer pb-4" ref={dropdownRef}>
              <span onClick={toggleDropdown}>Welcome, {user.name}!</span>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false); // Close menu on logout
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
              <li className="cursor-pointer pb-4" onClick={() => setIsOpen(false)}>
                <Link to="/signin">Login</Link> {/* Link to Login */}
              </li>
              <li className="cursor-pointer pb-4" onClick={() => setIsOpen(false)}>
                <Link to="/register">Register</Link> {/* Link to Register */}
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
