import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const baseURL = process.env.NODE_ENV === 'production' 
            ? 'https://final-back-rho.vercel.app' 
            : 'http://localhost:3001';

        try {
            const response = await axios.post(`${baseURL}/api/auth/login`, {
                username,
                password,
            });

            // Save only the username in local storage
            localStorage.setItem('username', username);

            // Redirect to the home page on successful login
            navigate('/');
            window.location.reload();
        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 mt-4 bg-gray-600 rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default SignIn;
