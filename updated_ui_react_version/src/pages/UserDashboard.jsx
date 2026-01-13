// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Ticket, LogOut, Loader, Calendar, MapPin } from 'lucide-react';

const UserDashboard = () => {
    const { user, token, logout, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bookings'); // bookings | profile
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If Auth is loading OR we have a token but no user yet (profile fetching), wait.
        if (authLoading || (token && !user)) return;

        if (!user) {
            navigate('/login');
            return;
        }

        const fetchHistory = async () => {
            try {
                const api = (await import('../services/api')).default;
                const res = await api.get('?r=razorpay/api-booking/history');
                if (res.data.status === 'success') {
                    setBookings(res.data.bookings);
                }
            } catch (err) {
                console.error("Failed to fetch history", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user, authLoading, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader className="animate-spin text-yellow-500" size={48} /></div>;

    return (
        <div className="min-h-screen bg-gray-50 flex pt-20">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">My Account</h2>
                    <p className="text-sm text-gray-500">{user?.full_name || user?.phone}</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'bookings' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <Ticket size={20} />
                        <span>My Bookings</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <User size={20} />
                        <span>Profile & Settings</span>
                    </button>
                </nav>
                <div className="p-4 border-t">
                    <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                {/* Mobile Tab Nav */}
                <div className="md:hidden flex space-x-4 mb-6 overflow-x-auto pb-2 border-b">
                    <button onClick={() => setActiveTab('bookings')} className={`pb-2 whitespace-nowrap ${activeTab === 'bookings' ? 'border-b-2 border-yellow-500 font-bold' : 'text-gray-500'}`}>My Bookings</button>
                    <button onClick={() => setActiveTab('profile')} className={`pb-2 whitespace-nowrap ${activeTab === 'profile' ? 'border-b-2 border-yellow-500 font-bold' : 'text-gray-500'}`}>Profile</button>
                    <button onClick={handleLogout} className="pb-2 text-red-500 whitespace-nowrap">Sign Out</button>
                </div>

                {activeTab === 'bookings' && (
                    <div className="space-y-6">
                        <h1 className="text-2xl font-bold text-gray-800">Your Tickets</h1>
                        {bookings.length === 0 ? (
                            <div className="py-12 text-center bg-white rounded-lg shadow">
                                <Ticket className="mx-auto text-gray-300 mb-4" size={64} />
                                <h3 className="text-lg font-semibold text-gray-700">No bookings found</h3>
                                <p className="text-gray-500 mb-6">You haven't booked any adventures yet.</p>
                                <button onClick={() => navigate('/book')} className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-400">Book Now</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {bookings.map((booking) => (
                                    <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                                        <div className="bg-blue-600 p-6 flex flex-col items-center justify-center text-white min-w-[120px]">
                                            <span className="text-3xl font-bold">{booking.date ? new Date(booking.date).getDate() : 'N/A'}</span>
                                            <span className="text-sm uppercase tracking-wider">{booking.date ? new Date(booking.date).toLocaleString('default', { month: 'short' }) : ''}</span>
                                            <span className="text-xs opacity-75 mt-1">{booking.date ? new Date(booking.date).getFullYear() : ''}</span>
                                        </div>
                                        <div className="p-6 flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900">Happy Valley Entry</h3>
                                                    <p className="text-sm text-gray-500">Ticket #{booking.ticket_no || 'Pending'}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status == 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {booking.status == 1 ? 'CONFIRMED' : 'PENDING'}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <User size={16} />
                                                    <span>{booking.no_of_units} Guests</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={16} />
                                                    <span>Happy Valley</span>
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-4 border-t flex justify-between items-center">
                                                <span className="font-bold text-gray-900">₹{booking.amount}</span>
                                                <button className="text-blue-600 font-semibold hover:underline text-sm">Download Ticket</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="max-w-2xl">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>
                        <div className="bg-white rounded-xl shadow p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" value={user?.full_name || ''} readOnly className="w-full bg-gray-50 border rounded-lg px-4 py-2 text-gray-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="text" value={user?.phone || ''} readOnly className="w-full bg-gray-50 border rounded-lg px-4 py-2 text-gray-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" value={user?.email_id || ''} readOnly className="w-full bg-gray-50 border rounded-lg px-4 py-2 text-gray-600" />
                            </div>
                            <div className="pt-4 border-t">
                                <p className="text-xs text-gray-400">To change your details, please contact support.</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default UserDashboard;
