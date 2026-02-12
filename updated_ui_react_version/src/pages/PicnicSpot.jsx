import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/common/ScrollReveal';

// Picnic Spot Images
import picnic1 from '../assets/Picnic Spot/DSC00417.JPG';
import picnic2 from '../assets/Picnic Spot/DSC00419.JPG';
import picnic3 from '../assets/Picnic Spot/DSC00421.JPG';
import picnic4 from '../assets/Picnic Spot/DSC00423.JPG';
import picnic5 from '../assets/Picnic Spot/DSC00425.JPG';
import picnic6 from '../assets/Picnic Spot/DSC00428.JPG';
import picnic7 from '../assets/Picnic Spot/DSC00529.JPG';
import picnic8 from '../assets/Picnic Spot/IMG_2519.jpg';
import picnic9 from '../assets/Picnic Spot/IMG_2521.jpg';
import picnic10 from '../assets/Picnic Spot/IMG_2522.jpg';

const PicnicSpot = () => {
    const picnicImages = [
        { id: 1, image: picnic1 },
        { id: 2, image: picnic2 },
        { id: 3, image: picnic3 },
        { id: 4, image: picnic4 },
        { id: 5, image: picnic5 },
        { id: 6, image: picnic6 },
        { id: 7, image: picnic7 },
        { id: 8, image: picnic8 },
        { id: 9, image: picnic9 },
        { id: 10, image: picnic10 },
    ];

    return (
        <div className="bg-gray-50 pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                            Picnic <span className="text-transparent bg-clip-text bg-gradient-to-r from-wonderla-red to-pink-600">Spot</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                            Perfect destination for family outings and group gatherings in nature.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Pricing Information Box */}
                <ScrollReveal>
                    <div className="bg-white rounded-2xl shadow-sm p-6 mb-16 border border-gray-200 max-w-md mx-auto text-center">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Picnic Spot Booking</h2>
                        <div className="text-3xl font-black text-gray-900">₹1,500/-</div>
                    </div>
                </ScrollReveal>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {picnicImages.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden relative h-80 group cursor-pointer"
                            >
                                <div className="block h-full w-full">
                                    <img
                                        src={item.image}
                                        alt="Picnic Spot"
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

export default PicnicSpot;
