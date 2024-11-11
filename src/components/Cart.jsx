import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner'; // Import Spinner component

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const cartBaseUrl = process.env.NODE_ENV === 'production'
        ? 'https://final-back-rho.vercel.app/api/cart'
        : 'http://localhost:3001/api/cart';

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${cartBaseUrl}/${username}`);
                setCartItems(response.data.items);
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                setError('Failed to load cart items');
                console.error(err);
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        if (username) fetchCart();
    }, [username]);

    const removeFromCart = async (itemId) => {
        try {
            await axios.delete(`${cartBaseUrl}/remove`, { data: { username, itemId } });
            setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
        } catch (err) {
            console.error('Error removing item:', err);
            alert('Failed to remove item from cart');
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price, 0);
    };

    if (loading) {
        return <Spinner />; // Show spinner while loading
    }

    if (error) {
        return <div className="text-black">{error}</div>;
    }

    if (cartItems.length === 0) {
        return <div>No items in your cart.</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
            <div className="grid grid-cols-1 gap-6 mb-6">
                {cartItems.map((item) => (
                    <div key={item._id} className="bg-white p-4 shadow-md rounded flex items-start">
                        <img
                            src={item.imageUrls.length > 0 ? item.imageUrls[0] : 'https://via.placeholder.com/150'}
                            alt={item.title}
                            className="object-cover w-32 h-32 rounded mr-4"
                        />
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold">{item.title}</h2>
                            <p className="text-gray-700 mb-2">{item.description}</p>
                            <p className="text-gray-800 mb-2">Size: XL</p> {/* Adjust size dynamically if available */}
                            <div className="flex items-center mb-4">
                                <span className="text-gray-500 text-lg">{item.price} EGP</span>
                            </div>
                            <button 
                                onClick={() => removeFromCart(item._id)}
                                className="bg-black text-white py-2 px-4 hover:bg-gray-800 transition-colors mt-4"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t pt-4 mt-4">
                <h2 className="text-2xl font-semibold">Total: {calculateTotal()} EGP</h2>
                <button 
                    onClick={() => navigate('/checkout')}
                    className="bg-black text-white py-2 px-4 hover:bg-gray-800 transition-colors mt-4"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}
