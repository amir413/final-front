import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
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
            } catch (err) {
                setError('Failed to load cart items');
                console.error(err);
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

    if (error) return <div className="text-red-500">{error}</div>;
    if (cartItems.length === 0) return <div>No items in your cart.</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Your cart</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {cartItems.map((item) => (
                    <div key={item._id} className="bg-white p-4 shadow-md rounded">
                        <img
                            src={item.imageUrls.length > 0 ? item.imageUrls[0] : 'https://via.placeholder.com/600'}
                            alt={item.title}
                            className="object-cover w-full h-48 rounded mb-4"
                        />
                        <h2 className="text-xl font-semibold">{item.title}</h2>
                        <p className="text-gray-700 mb-2">{item.description}</p>
                        <p className="text-red-600 text-lg mb-4">{item.price} EGP</p>
                        <button 
                            onClick={() => removeFromCart(item._id)}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors mt-2"
                        >
                            Remove from cart
                        </button>
                    </div>
                ))}
            </div>
            <button 
                onClick={() => navigate('/checkout')}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mt-4"
            >
                Proceed to Checkout
            </button>
        </div>
    );
}
