// src/pages/UserLogin.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const { login } = useAuth();
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Re-using logic from Booking.jsx - ideally should be in API service but keeping it simple for verification
    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const api = (await import('../services/api')).default;
            const res = await api.post('?r=razorpay/auth/send-login-otp', { phone_number: phone });
            if (res.data.status === 'success') {
                setStep(2);
                setError('');
                if (res.data.debug_otp) {
                    alert(`Development Mode: Your OTP is ${res.data.debug_otp}`);
                }
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            setError('Failed to send OTP.');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const api = (await import('../services/api')).default;
            const res = await api.post('?r=razorpay/auth/verify-login-otp', { phone_number: phone, entered_otp: otp });
            if (res.data.status === 'verified') {
                login(res.data.user_token);
                navigate('/');
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            setError('Verification failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20"> {/* pt-20 for navbar */}
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm border border-yellow-400">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Login</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

                {step === 1 ? (
                    <form onSubmit={handleSendOtp}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
                            <input
                                type="tel"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter 10 digit number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                maxLength={10}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-2 rounded">
                            Send OTP
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Enter OTP</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 rounded">
                            Verify & Login
                        </button>
                        <button onClick={() => setStep(1)} type="button" className="w-full text-blue-600 text-sm mt-3 underline">
                            Change Number
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserLogin;
