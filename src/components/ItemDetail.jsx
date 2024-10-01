import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters

export default function ItemDetail() {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/getUser/${id}`) // Adjust endpoint to match your backend
      .then(res => {
        setItem(res.data);
        setError(null);
      })
      .catch(err => {
        console.log(err);
        setError('Failed to fetch item details. Please try again later.');
      });
  }, [id]);

  if (error) return <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>;

  return (
    <div className="p-6">
      {item ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
          <img 
            src={item.image ? `http://localhost:3001/images/${item.image}` : 'https://via.placeholder.com/150'} 
            alt={item.title}
            className="w-full h-auto mb-4"
          />
          <p className="text-red-600 mb-4">{item.price} EGP</p>
          <p>{item.description}</p> {/* Adjust based on available data */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
