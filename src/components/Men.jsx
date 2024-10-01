import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Men() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch items
  const fetchItems = async () => {
    try {
      const response = await axios.get('https://final-back-rho.vercel.app/getItems'); // Change the endpoint to fetch items
      setItems(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch items. Please try again later.');
    }
  };

  useEffect(() => {
    fetchItems();

    const interval = setInterval(fetchItems, 9000); // Poll every 9 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <div className="p-6">
      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {items.map(item => (
          <Link
            key={item._id}
            to={`/item/${item._id}`} // Link to the detail page
            className="overflow-hidden flex flex-col border border-gray-200"
          >
            {/* Image Section */}
            <div className="relative w-full aspect-w-16 aspect-h-9">
              <img 
                src={item.image ? `https://final-back-rho.vercel.app/images/${item.image}` : 'https://via.placeholder.com/150'} 
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
        ))}
      </div>
    </div>
  );
}
