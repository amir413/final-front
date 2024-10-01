import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Initialize state for burger menu

  return (
    <div>
      {/* Navbar */}
      <nav className="w-full">
        <div className="relative">
          <div className="flex justify-between items-center max-w-screen-lg mx-auto">
            {/* Logo */}
            <div className="text-2xl mb-5 pt-4 pb-4">
              <Link to="/" className="hover:none m-4">CLOTHES</Link> {/* Use Link for home */}
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
                  <span>&#9776;</span> /* Unicode for burger menu icon */
                )}
              </button>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 m-4">
              <li className="cursor-pointer mb-5">
                <Link to="/women">Women</Link> {/* Use Link for Women */}
              </li>
              <li className="cursor-pointer mb-5">
                <Link to="/children">Children</Link> {/* Use Link for Children */}
              </li>
              <li className="cursor-pointer mb-5">
                <Link to="/men">Men</Link> {/* Use Link for Men */}
              </li>
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
            <Link to="/women">WOMAN</Link> {/* Use Link for Woman */}
          </li>
          <li className="cursor-pointer pb-4" onClick={() => setIsOpen(false)}>
            <Link to="/men">MAN</Link> {/* Use Link for Man */}
          </li>
          <li className="cursor-pointer pb-4" onClick={() => setIsOpen(false)}>
            <Link to="/children">KIDS</Link> {/* Use Link for Kids */}
          </li>
        </ul>
      </div>
    </div>
  );
}
