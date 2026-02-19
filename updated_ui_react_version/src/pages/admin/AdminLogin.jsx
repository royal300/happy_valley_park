import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Adjust API URL as needed based on deployment
            const apiUrl = import.meta.env.PROD ? '/backend/api/auth.php' : 'http://localhost:8000/backend/api/auth.php';

            const response = await axios.post(apiUrl, { username, password });

            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                navigate('/frontendadmin/dashboard');
            }
        } catch (err) {
            console.error(err);
            if (err.response) {
                setError(err.response.data.error || 'Invalid credentials');
            } else if (err.request) {
                setError('Cannot connect to server. Ensure backend is running.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-yellow-500">Admin Login</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-yellow-500 text-gray-900 font-bold rounded hover:bg-yellow-400 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
