import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [error, setError] = useState(null);
    const username = localStorage.getItem('username'); // Fetch username from local storage

    const wishlistBaseUrl = process.env.NODE_ENV === 'production'
        ? 'https://final-back-rho.vercel.app/api/wishlist'
        : 'http://localhost:3001/api/wishlist';

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`${wishlistBaseUrl}/${username}`);
                setWishlistItems(response.data.items); // Ensure 'items' exists in the response
            } catch (err) {
                setError('Failed to load wishlist items');
                console.error(err);
            }
        };

        fetchWishlist();
    }, [username]);

    // Function to remove an item from the wishlist
    const removeFromWishlist = async (itemId) => {
        try {
            await axios.delete(`${wishlistBaseUrl}/remove`, { 
                data: { username, itemId } 
            });
            // Update state to remove the item locally
            setWishlistItems(prevItems => prevItems.filter(item => item._id !== itemId));
        } catch (err) {
            console.error('Error removing item:', err);
            alert('Failed to remove item from wishlist');
        }
    };

    if (error) return <div className="text-red-500">{error}</div>;
    if (wishlistItems.length === 0) return <div>No items in your wishlist.</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Your Wishlist</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {wishlistItems.map((item) => (
                    <div key={item._id} className="overflow-hidden flex flex-col border border-gray-200 relative max-w-[260px]">
                        <div className="relative w-full aspect-w-16 aspect-h-9">
                            <img
                                src={item.imageUrls.length > 0 ? item.imageUrls[0] : 'https://via.placeholder.com/600'}
                                alt={item.title}
                                className="object-cover w-full h-[35vh]"
                                loading="lazy"
                            />
                        </div>
                        <a href={`/item/${item._id}`} className="p-2 flex-grow text-left">
                            <p className="mb-1">{item.title}</p>
                            <p className="text-red-600 mb-1">{item.price} EGP</p>
                        </a>
                        <button 
                            onClick={() => removeFromWishlist(item._id)}
                            className="bg-black text-white py-2 px-4 hover:bg-red-600 transition-colors mt-2"
                        >
                            Remove from Wishlist
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
