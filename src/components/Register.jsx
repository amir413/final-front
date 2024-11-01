import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        try {
            console.log({ username, password, email });
    
            const baseURL = process.env.NODE_ENV === 'production' 
            ? 'https://final-back-rho.vercel.app' 
            : 'http://localhost:3001';
        
        const response = await axios.post(`${baseURL}/api/auth/signup`, {
            username,
            password,
            email,
        });
        
            console.log("Response:", response.data);
            setSuccess('Registration successful!');
        } catch (err) {
            console.error("Error object:", err);
            if (err.response) {
                console.error("Error response:", err.response);
                setError(err.response.data.message || 'Registration failed');
            } else {
                setError('Network error or server not reachable. Please try again.');
            }
        }
    };
    

    return (
        <div>
            <h2>Register</h2>
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
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}
        </div>
    );
};

export default Register;
