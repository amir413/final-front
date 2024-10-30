import React, { useState } from 'react';

const AddToWishlist = () => {
    const [itemId, setItemId] = useState(''); // State for the item ID input
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleAddToWishlist = async () => {
        const username = localStorage.getItem('username'); // Retrieve username from local storage

        if (!username) {
            setError('User is not logged in');
            return;
        }

        const payload = {
            itemId,
            username, // Include the username in the payload
        };

        try {
            const response = await fetch('/api/wishlist/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to wishlist');
            }

            setSuccess('Item added to wishlist successfully');
            setError(null); // Clear any previous errors
            setItemId(''); // Clear the input after successful addition
        } catch (err) {
            setError(err.message);
            setSuccess(null); // Clear any previous success messages
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={itemId} 
                onChange={(e) => setItemId(e.target.value)} 
                placeholder="Enter Item ID" 
            />
            <button onClick={handleAddToWishlist}>Add to Wishlist</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default AddToWishlist;
