import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si'; // Threads icon from react-icons
// import './Home.css'; // Assuming you want to style the footer in your CSS

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Dynamically get current year

  return (
    <footer className="text-black py-6">
      <div className="container mx-auto text-center">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl hover:text-blue-600 transition-colors duration-300" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-pink-500 transition-colors duration-300" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-blue-400 transition-colors duration-300" />
          </a>
          <a href="https://www.threads.net" target="_blank" rel="noopener noreferrer">
            <SiThreads className="text-2xl hover:text-black transition-colors duration-300" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm">&copy; {currentYear} Clothes. All rights reserved.</p>
      </div>
    </footer>
  );
}
