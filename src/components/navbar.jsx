import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const Navbar = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
    window.location.reload();
  };

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

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollY) {
        setShowNavbar(false); // Hide navbar on scroll down
      } else {
        setShowNavbar(true); // Show navbar on scroll up
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`fixed top-0 w-full z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="w-full bg-white shadow">
        <div className="flex justify-between items-center max-w-screen-lg mx-auto py-4 px-5">
          <div className="text-2xl">
            <Link to="/" className="hover:none m-4">CLOTHES</Link>
          </div>

          {/* Burger menu button with animation */}
          <div className="md:hidden m-1">
            <button onClick={() => setIsOpen(!isOpen)} className="relative w-8 h-8 focus:outline-none">
              <div className="absolute inset-2 flex flex-col justify-between items-center transition-transform duration-500">
                {/* Top Line */}
                <span
                  className={`block h-0.5 w-8 bg-black transition-all duration-300 transform ${
                    isOpen ? 'rotate-45 translate-y-2' : 'rotate-0'
                  }`}
                ></span>
                {/* Middle Line */}
                <span
                  className={`block h-0.5 w-8 bg-black transition-all duration-300 transform ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                {/* Bottom Line */}
                <span
                  className={`block h-0.5 w-8 bg-black transition-all duration-300 transform ${
                    isOpen ? '-rotate-45 -translate-y-1.5' : 'rotate-0'
                  }`}
                ></span>
              </div>
            </button>
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6 m-2 items-center">
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/children">Children</Link></li>
            <li><Link to="/men">Men</Link></li>
            {username ? (
              <li className="relative cursor-pointer" ref={dropdownRef}>
                <span onClick={toggleDropdown}>Hello, {username}!</span>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-200"><Link to="/profile">Profile</Link></li>
                      <li
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
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
                <li><Link to="/signin">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
            <li><Link to="/cart"><FaShoppingCart size={24} /></Link></li>
            <li><Link to="/wishlist"><FaHeart size={24} /></Link></li>
          </ul>
        </div>

        {/* Mobile dropdown menu with slide-in animation */}
        <div
          className={`md:hidden bg-white transition-transform duration-300 ${
            isOpen ? 'transform translate-y-0' : 'transform -translate-y-full'
          }`}
        >
          {isOpen && (
            <ul className="flex flex-col space-y-4 p-4 border-t border-gray-300">
              <li><Link to="/women" onClick={() => setIsOpen(false)}>Women</Link></li>
              <li><Link to="/children" onClick={() => setIsOpen(false)}>Children</Link></li>
              <li><Link to="/men" onClick={() => setIsOpen(false)}>Men</Link></li>
              {username ? (
                <>
                  <li><Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
                  <li onClick={handleLogout}>Logout</li>
                </>
              ) : (
                <>
                  <li><Link to="/signin" onClick={() => setIsOpen(false)}>Login</Link></li>
                  <li><Link to="/register" onClick={() => setIsOpen(false)}>Register</Link></li>
                </>
              )}
              <li><Link to="/cart" onClick={() => setIsOpen(false)}><FaShoppingCart size={24} /></Link></li>
              <li><Link to="/wishlist" onClick={() => setIsOpen(false)}><FaHeart size={24} /></Link></li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
