// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    LayoutDashboard,
    Ticket,
    Users,
    QrCode,
    LogOut,
    TrendingUp,
    Calendar,
    Search
} from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ revenue: 0, bookings: 0, today_bookings: 0 });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview'); // overview | bookings | scanner
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('hv_admin_token');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchDashboardData(token);
    }, [navigate, currentPage, searchTerm]); // Added searchTerm dependency

    const fetchDashboardData = async (token) => {
        try {
            // Need to pass token header manually since axios interseptor might be for user token
            // Ideally should have a unified api client or proper auth context for admin too
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const statsRes = await axios.get('/api?r=admin/api/stats', config);
            if (statsRes.data.status === 'success') {
                setStats(statsRes.data.stats);
            }

            const bookingsRes = await axios.get(`/api?r=admin/api/bookings&page=${currentPage}&limit=50&search=${searchTerm}`, config); // Added search param
            if (bookingsRes.data.status === 'success') {
                setRecentBookings(bookingsRes.data.bookings);
                if (bookingsRes.data.pagination) {
                    setTotalPages(bookingsRes.data.pagination.total_pages);
                }
            }
        } catch (error) {
            console.error("Admin Fetch Error", error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('hv_admin_token');
        navigate('/admin/login');
    };

    if (loading) return <div className="flex h-screen items-center justify-center bg-gray-100">Loading Admin Panel...</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-2xl font-bold text-yellow-500 tracking-wider">HV ADMIN</h1>
                    <p className="text-xs text-slate-400 mt-1">Management Portal</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-yellow-500 text-black font-bold' : 'text-slate-300 hover:bg-slate-800'}`}>
                        <LayoutDashboard size={20} />
                        <span>Overview</span>
                    </button>
                    <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'bookings' ? 'bg-yellow-500 text-black font-bold' : 'text-slate-300 hover:bg-slate-800'}`}>
                        <Ticket size={20} />
                        <span>Bookings</span>
                    </button>
                    <button onClick={() => setActiveTab('scanner')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'scanner' ? 'bg-yellow-500 text-black font-bold' : 'text-slate-300 hover:bg-slate-800'}`}>
                        <QrCode size={20} />
                        <span>Scanner</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 opacity-50 cursor-not-allowed">
                        <Users size={20} />
                        <span>Users (Coming Soon)</span>
                    </button>
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        {activeTab === 'overview' && 'Dashboard Overview'}
                        {activeTab === 'bookings' && 'Booking Management'}
                        {activeTab === 'scanner' && 'Ticket Scanner'}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Administrator</span>
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-black border-2 border-white shadow">
                            A
                        </div>
                    </div>
                </header>

                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                                <div className="p-4 bg-green-100 text-green-600 rounded-full">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                                    <h3 className="text-2xl font-bold text-gray-900">₹{parseFloat(stats.revenue || 0).toLocaleString()}</h3>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                                <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                                    <Ticket size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.bookings}</h3>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                                <div className="p-4 bg-yellow-100 text-yellow-600 rounded-full">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Today's Bookings</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.today_bookings}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Table Preview */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800">Recent Transactions</h3>
                                <button onClick={() => setActiveTab('bookings')} className="text-sm text-blue-600 font-medium hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Booking ID</th>
                                            <th className="px-6 py-4 font-medium">User</th>
                                            <th className="px-6 py-4 font-medium">Date</th>
                                            <th className="px-6 py-4 font-medium">Amount</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {recentBookings.slice(0, 5).map((booking) => (
                                            <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">#{booking.id}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    <div>{booking.user_name || 'Guest'}</div>
                                                    <div className="text-xs text-gray-400">{booking.user_phone || booking.phone}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{new Date(booking.created_date).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{booking.amount}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${booking.status == 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {booking.status == 1 ? 'PAID' : 'PENDING'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <div className="relative max-w-sm">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by Ticket No, ID, Name or Phone..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1); // Reset to page 1 on search
                                    }}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">ID</th>
                                        <th className="px-6 py-4 font-medium">Ticket No</th>
                                        <th className="px-6 py-4 font-medium">Customer</th>
                                        <th className="px-6 py-4 font-medium">Visit Date</th>
                                        <th className="px-6 py-4 font-medium">Units</th>
                                        <th className="px-6 py-4 font-medium">Amount</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">#{booking.id}</td>
                                            <td className="px-6 py-4 text-sm font-mono text-blue-600">{booking.ticket_no || '-'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div className="font-medium">{booking.user_name || booking.name || 'Guest'}</div>
                                                <div className="text-xs text-gray-400">{booking.user_phone || booking.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{booking.date}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{booking.no_of_units}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{booking.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${booking.status == 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {booking.status == 1 ? 'PAID' : 'PENDING'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-white border border-gray-200'}`}
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600">
                                Page <span className="font-bold">{currentPage}</span> of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-white border border-gray-200'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'scanner' && (
                    <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
                        <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6">
                            <QrCode size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Ticket Scanner</h3>
                        <p className="text-gray-500 text-center max-w-md mb-8">
                            Click below to launch the camera and scan customer tickets for entry verification.
                        </p>
                        <button className="bg-yellow-500 text-black font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 transform hover:scale-105 transition-all flex items-center gap-2">
                            <QrCode size={20} />
                            Launch Camera
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
