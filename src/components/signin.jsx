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
        setLoading(true); // Set loading to true
        setError(''); // Clear any previous error messages
    
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
            navigate('/'); // Redirect to home
            window.location.reload(); // Refresh the page to reflect changes
        } catch (err) {
            console.error("Login Error:", err); // Log the error for debugging
            setError(err.response?.data?.message || 'Login failed. Please try again.');
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message in red */}
        </div>
    );
};

export default SignIn;
