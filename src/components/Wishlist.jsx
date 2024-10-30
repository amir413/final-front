import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Wishlist({ userId }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`/api/wishlist/${userId}`);
        
        // Check if the response is okay (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setWishlist(data.items); // Assuming 'items' is the list of items in the wishlist
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userId]);

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        <ul>
          {wishlist.map((item) => (
            <li key={item._id}>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <img src={item.imageUrls[0]} alt={item.title} style={{ width: '100px' }} />
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// PropTypes validation
Wishlist.propTypes = {
  userId: PropTypes.string.isRequired,
};
