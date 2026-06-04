import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';
import ParkBackground from '../components/common/ParkBackground';

const MainLayout = () => {
    return (
        <div className="relative flex flex-col min-h-screen font-sans bg-slate-50">
            {/* The decorative scattered icons background */}
            <ParkBackground />
            
            {/* Navbar sits on top */}
            <div className="relative z-50">
                <Navbar />
            </div>

            {/* Main content area */}
            <main className="relative z-10 flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
