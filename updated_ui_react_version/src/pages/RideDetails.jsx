import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Info } from 'lucide-react';
import { ridesData } from '../data/ridesData';

const RideDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const ride = ridesData.find(r => r.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!ride) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Ride Not Found</h2>
                <Link to="/attractions" className="text-wonderla-blue hover:underline">
                    Back to Attractions
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Image */}
            <div className="relative h-[60vh] lg:h-[70vh]">
                <img
                    src={ride.image}
                    alt={ride.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90"></div>

                <div className="absolute top-28 left-4 md:left-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition-colors"
                    >
                        <ArrowLeft size={20} /> Back
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto"
                    >
                        <span className="bg-wonderla-yellow text-black font-bold uppercase tracking-widest text-xs px-3 py-1 rounded mb-4 inline-block">
                            {ride.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 uppercase tracking-tight">
                            {ride.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-10">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Description */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Info className="text-wonderla-blue" />
                                    About the Ride
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {ride.description}
                                </p>
                            </div>

                            {/* Placeholder Mock Data */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <Clock size={18} className="text-gray-400" /> Duration
                                    </h3>
                                    <p className="text-gray-600">3 - 5 Minutes</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <MapPin size={18} className="text-gray-400" /> Location
                                    </h3>
                                    <p className="text-gray-600">{ride.type} Park Sector</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                                <h3 className="text-xl font-bold text-blue-900 mb-4">Safety Guidelines</h3>
                                <ul className="space-y-3 text-blue-800/80 text-sm">
                                    <li className="flex gap-2">• <span>Follow operator instructions at all times.</span></li>
                                    <li className="flex gap-2">• <span>Secure loose items before riding.</span></li>
                                    <li className="flex gap-2">• <span>Maintain seated position until ride stops.</span></li>
                                </ul>
                            </div>

                            <Link
                                to="/book"
                                className="block w-full bg-wonderla-yellow text-black font-black text-center uppercase tracking-widest py-5 rounded-full hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/30"
                            >
                                Book Tickets Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RideDetails;
