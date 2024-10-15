import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true

        try {
            const response = await axios.post('https://final-back-rho.vercel.app/api/login', { // Updated endpoint
                username,
                password,
            });
            // Redirect to the home page on successful login
            navigate('/'); // Redirect to home
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false); // Set loading to false after request
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}> {/* Disable button while loading */}
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignIn;
