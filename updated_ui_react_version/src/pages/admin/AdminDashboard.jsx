import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroManager from './tabs/HeroManager';
import AttractionManager from './tabs/AttractionManager';
import TicketManager from './tabs/TicketManager';
import OfferManager from './tabs/OfferManager';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('hero');

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/frontendadmin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/frontendadmin');
    };

    const tabs = [
        { id: 'hero', label: 'Hero Video', icon: '🎬' },
        { id: 'events', label: 'Special Events', icon: '🎪' },
        { id: 'offers', label: 'Offer Banners', icon: '🏷️' },
        { id: 'tickets', label: 'Ticket Packages', icon: '🎫' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <header className="flex justify-between items-center mb-8 bg-white p-4 md:p-6 rounded-lg shadow">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Happy Valley Admin Panel</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-semibold"
                >
                    Logout
                </button>
            </header>

            <div className="grid grid-cols-12 gap-6">
                {/* Sidebar Navigation */}
                <div className="col-span-12 md:col-span-3 lg:col-span-2">
                    <nav className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 bg-white p-3 md:p-4 rounded-lg shadow overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-left px-4 py-3 rounded transition whitespace-nowrap text-sm md:text-base ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white font-bold'
                                        : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content Area */}
                <div className="col-span-12 md:col-span-9 lg:col-span-10">
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow min-h-[600px]">
                        {activeTab === 'hero' && <HeroManager />}
                        {activeTab === 'events' && <AttractionManager />}
                        {activeTab === 'offers' && <OfferManager />}
                        {activeTab === 'tickets' && <TicketManager />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
