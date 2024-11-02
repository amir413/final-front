// Checkout.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    
    const SHIPPING_FEE = 50;
    const COD_FEE = 15;
    
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
        else navigate('/signin'); // Redirect to sign-in if no username
    }, [username, navigate]);

    const calculateTotalPrice = () => {
        const itemsTotal = cartItems.reduce((total, item) => total + item.price, 0);
        return itemsTotal + SHIPPING_FEE + COD_FEE;
    };

    if (error) return <div className="text-red-500">{error}</div>;
    if (cartItems.length === 0) return <div>Your cart is empty.</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Order Summary</h1>
            <ul className="mb-4">
                {cartItems.map((item) => (
                    <li key={item._id} className="flex justify-between mb-2">
                        <span>{item.title}</span>
                        <span>{item.price} EGP</span>
                    </li>
                ))}
            </ul>
            <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{cartItems.reduce((total, item) => total + item.price, 0)} EGP</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Shipping Fee:</span>
                    <span>{SHIPPING_FEE} EGP</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>COD Fee:</span>
                    <span>{COD_FEE} EGP</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total:</span>
                    <span>{calculateTotalPrice()} EGP</span>
                </div>
            </div>
            <button
                onClick={() => alert("Proceeding to payment...")}
                className="bg-green-500 text-white py-2 px-4 rounded mt-6 hover:bg-green-600 transition-colors"
            >
                Confirm Purchase
            </button>
        </div>
    );
}
