import React, { useEffect } from 'react';

const Booking = () => {
    useEffect(() => {
        window.location.href = "https://booking.gohappyvalley.com/client/dashboard";
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
                <p className="text-gray-500 font-medium">Redirecting to Booking Platform...</p>
            </div>
        </div>
    );
};

export default Booking;
