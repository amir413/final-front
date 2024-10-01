import React, { useState } from 'react';
import WomanVideo from './Woman.mp4'; // Replace with your actual video path
import MenVideo from './Men.mp4'; // Replace with your actual video path
import ChildVideo from './Child.mp4'; // Replace with your actual video path
import './Home.css'; // Import the custom CSS for animations
import { Link } from 'react-router-dom'; // Import Link for navigation


export default function Home() {
  const [isOpen, setIsOpen] = useState(false); // Initialize state for the burger menu

  const handleImageClick = (category) => {
    // Handle the click event, e.g., navigate to a specific page or open a modal
    console.log(`Clicked on ${category}`);
  };

  return (
    <>
      {/* Main Content */}
      <div className="w-full h-full">
        {/* Modify the grid layout here */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Card for Women */}
          <Link to="/women">
          <div className="relative w-full h-[100vh]">
            <video 
              src={WomanVideo}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:blur-sm"
            />
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 text-white text-xl font-bold hover:bg-opacity-50 transition-colors duration-300 ease-in-out "
            >
              <span className='text-5xl font-thin'>Women</span>
            </div>
          </div>
          </Link>

          {/* Card for Children */}
          <Link to="/children">
          <div className="relative w-full h-[100vh]">
            <video 
              src={ChildVideo}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:blur-sm"
            />
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 text-white text-xl font-bold hover:bg-opacity-50 transition-colors duration-300 ease-in-out"
            >
              <span className='text-5xl font-thin'>Children</span>
            </div>
          </div>
          </Link>
          {/* Card for Men */}
          <Link to="/men">
          <div className="relative w-full h-[100vh]">
            <video 
              src={MenVideo}
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:bg-opacity-50"
            />
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 text-white text-xl font-bold hover:bg-opacity-50 transition-colors duration-300 ease-in-out"
            >
              <span className='text-5xl font-thin'>Men</span>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </>
  );
}
