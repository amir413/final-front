import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCartItems = async () => {
        try {
            const endpoint = window.location.hostname === 'localhost'
                ? 'http://localhost:3001/getCartItems'
                : 'https://final-back-rho.vercel.app/getCartItems';
            const response = await axios.get(endpoint);
            setCartItems(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch cart items. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    if (loading) {
        return <div className="text-center">Loading cart items...</div>;
    }

    const handleRemoveItem = async (itemId) => {
        // Logic to remove item from cart
    };

    return (
        <div className="p-6 w-full">
            <h2 className="text-2xl mb-4">Shopping Cart</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div key={item._id} className="overflow-hidden flex flex-col border border-gray-200">
                            <div className="relative w-full aspect-w-16 aspect-h-9">
                                <img
                                    src={item.imageUrl || 'https://via.placeholder.com/150'}
                                    alt={item.title}
                                    className="object-cover w-full h-[35vh]"
                                />
                            </div>
                            <Link to={`/item/${item._id}`} className="p-2 flex-grow text-left">
                                <p className="mb-1">{item.title}</p>
                                <p className="text-red-600 mb-1">{item.price} EGP</p>
                            </Link>
                            <button
                                className="p-2 bg-red-500 text-white rounded"
                                onClick={() => handleRemoveItem(item._id)}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} /> Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <div>No items in cart.</div>
                )}
            </div>
        </div>
    );
}
