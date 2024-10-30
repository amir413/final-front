// Import required hooks and packages
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ItemDetail() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInWishlist, setIsInWishlist] = useState(false);
    
    // Fetch username from local storage or context
    const username = localStorage.getItem('username'); // Adjust based on how you store username

    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://final-back-rho.vercel.app/api/items'
        : 'http://localhost:3001/api/items';

    const wishlistBaseUrl = process.env.NODE_ENV === 'production'
        ? 'https://final-back-rho.vercel.app/api/wishlist'
        : 'http://localhost:3001/api/wishlist';

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`${baseUrl}/${id}`);
                setItem(response.data);
                await checkWishlist(response.data._id); // Check if the item is in the wishlist
            } catch (err) {
                setError('Item not found or server error');
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    const checkWishlist = async (itemId) => {
        try {
            const response = await axios.get(`${wishlistBaseUrl}/${username}`);
            const wishlistItems = response.data.items;
            setIsInWishlist(wishlistItems.some((wishlistItem) => wishlistItem.productId === itemId));
        } catch (err) {
            console.error('Error checking wishlist:', err);
        }
    };

    const toggleWishlist = async () => {
        try {
            // Optimistically update the UI
            setIsInWishlist(!isInWishlist);
            if (isInWishlist) {
                // Remove item from wishlist
                await axios.delete(`${wishlistBaseUrl}/remove`, {
                    data: { username, itemId: item._id } // Use itemId instead of productId
                });
                alert('Item removed from wishlist!');
            } else {
                // Add item to wishlist
                await axios.post(`${wishlistBaseUrl}/add`, {
                    username, // Now using username
                    itemId: item._id  // Use itemId instead of productId
                });
                alert('Item added to wishlist!');
            }
        } catch (err) {
            console.error('Error toggling wishlist:', err);
            alert('Error updating wishlist');
            // Revert the optimistic update in case of error
            setIsInWishlist(!isInWishlist);
        }
    };

    const addToCart = () => {
        alert('Add to cart functionality not implemented yet.');
    };

    if (loading) return <div className="text-center">Loading item details...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="flex flex-col md:flex-row p-6 max-w-4xl mx-auto bg-white text-black">
            <div className="w-full md:w-1/2 p-4">
                <img
                    src={item.imageUrls.length > 0 ? item.imageUrls[0] : 'https://via.placeholder.com/600'}
                    alt={item.title}
                    className="object-cover w-full h-full rounded"
                />
            </div>
            <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-semibold mb-2">{item.title}</h1>
                    <p className="text-lg text-gray-700 mb-4">{item.description}</p>
                    <p className="text-red-600 text-xl mb-4">{item.price} EGP</p>
                </div>
                <div className="flex space-x-4">
                    <button onClick={addToCart} className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
                        Add to Cart
                    </button>
                    <button 
                        onClick={toggleWishlist} 
                        className={`py-2 px-4 rounded transition-colors ${
                            isInWishlist ? 'bg-red-500 text-white' : 'bg-white border border-black text-black hover:bg-gray-200'
                        }`}
                    >
                        {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;
