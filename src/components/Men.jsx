import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Men() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch items
  const fetchItems = async () => {
    try {
      // Correct the endpoints for local and production environments
      const endpoint = window.location.hostname === 'localhost'
        ? 'http://localhost:3001/getItems'
        : 'https://final-back-rho.vercel.app/getItems';

      const response = await axios.get(endpoint);
      console.log(response.data); // Log the data to check its structure
      setItems(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch items. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  
  useEffect(() => {
    fetchItems(); // Call the fetchItems function
  }, []);

  if (loading) {
    return <div className="text-center">Loading items...</div>; // Loading feedback
  }

  return (
    <div className="p-6">
      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {Array.isArray(items) && items.length > 0 ? (
          items.map(item => (
            <Link
              key={item._id}
              to={`/item/${item._id}`} // Link to the detail page
              className="overflow-hidden flex flex-col border border-gray-200"
            >
              {/* Image Section */}
              <div className="relative w-full aspect-w-16 aspect-h-9">
                {/* Display the first image URL from the imageUrls array */}
                <img 
                  src={Array.isArray(item.imageUrls) && item.imageUrls.length > 0 
                    ? item.imageUrls[0] 
                    : 'https://via.placeholder.com/150'} 
                  alt={item.title} // Use item.title for better accessibility
                  className="object-cover w-full h-[65vh]"
                />
              </div>
              
              {/* Description Section */}
              <div className="p-4 flex-grow text-left">
                <p className="mb-2">{item.title}</p>
                <p className="text-red-600 mb-1">{item.price} EGP</p>
              </div>
            </Link>
          ))
        ) : (
          <div>No items found.</div> // Show a message if items are not available
        )}
      </div>
    </div>
  );
}
