import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/common/ScrollReveal';

// Resort Images
import resort1 from '../assets/Resort/Copy of DSC00539.webp';
import resort2 from '../assets/Resort/IMG_2636.webp';
import resort3 from '../assets/Resort/IMG_2640.webp';
import resort4 from '../assets/Resort/IMG_2643.webp';
import resort5 from '../assets/Resort/IMG_2645.webp';
import resort6 from '../assets/Resort/IMG_2648.webp';
import resort7 from '../assets/Resort/IMG_2656.webp';

const Resort = () => {
    const resortRooms = [
        { id: 1, title: "Resort Room 1", image: resort1, description: "Comfortable and spacious resort rooms" },
        { id: 2, title: "Resort Room 2", image: resort2, description: "Modern amenities and cozy ambiance" },
        { id: 3, title: "Resort Room 3", image: resort3, description: "Perfect for a relaxing getaway" },
        { id: 4, title: "Resort Room 4", image: resort4, description: "Well-maintained and clean facilities" },
        { id: 5, title: "Resort Room 5", image: resort5, description: "Peaceful environment for couples" },
        { id: 6, title: "Resort Room 6", image: resort6, description: "Affordable luxury accommodation" },
        { id: 7, title: "Resort Room 7", image: resort7, description: "Enjoy your stay with us" },
    ];

    return (
        <div className="bg-gray-50 pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                            Happy Valley <span className="text-transparent bg-clip-text bg-gradient-to-r from-wonderla-red to-pink-600">Resort</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                            Experience comfort and luxury in the heart of nature. Perfect getaway for married couples.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Pricing Information Box */}
                <ScrollReveal>
                    <div className="bg-white rounded-2xl shadow-sm p-6 mb-16 border border-gray-200 max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Room Fare</h2>

                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                <span className="text-gray-600">Small Room (Non-AC)</span>
                                <span className="font-bold text-gray-900">₹1,500</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                <span className="text-gray-600">Small Room (AC)</span>
                                <span className="font-bold text-gray-900">₹2,000</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                <span className="text-gray-600">Big Room (Non-AC)</span>
                                <span className="font-bold text-gray-900">₹2,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Big Room (AC)</span>
                                <span className="font-bold text-gray-900">₹2,500</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 text-center pt-3 border-t border-gray-200">
                            Only Married Couple Allowed
                        </p>
                    </div>
                </ScrollReveal>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {resortRooms.map((room) => (
                            <motion.div
                                key={room.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden relative h-80 group cursor-pointer"
                            >
                                <div className="block h-full w-full">
                                    <img
                                        src={room.image}
                                        alt="Resort Room"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Resort;
