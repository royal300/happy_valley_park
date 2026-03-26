import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/common/ScrollReveal';

// Event Space Images
import img1 from '../assets/Events Space/LMC_20260312_185543_🔥 iPhone 15 Ultra Pixel.jpg.jpeg';
import img2 from '../assets/Events Space/LMC_20260312_185919_🔥 iPhone 15 Ultra Pixel.jpg.jpeg';
import img3 from '../assets/Events Space/LMC_20260312_192456_🔥 iPhone 15 Ultra Pixel.NIGHT.jpg.jpeg';
import img4 from '../assets/Events Space/LMC_20260312_192248_🔥 iPhone 15 Ultra Pixel.NIGHT.jpg.jpeg';
import img5 from '../assets/Events Space/LMC_20260312_170029_🔥 iPhone 15 Ultra Pixel.NIGHT.jpg.jpeg';

const EventSpace = () => {
    const eventImages = [
        { id: 1, image: img1 },
        { id: 2, image: img2 },
        { id: 3, image: img3 },
        { id: 4, image: img4 },
        { id: 5, image: img5 },
    ];

    return (
        <div className="bg-gray-50 pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                            Events <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Space</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                            A versatile and elegant venue for all your special occasions. 
                            From weddings to corporate gatherings, we provide the perfect backdrop for unforgettable moments.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {eventImages.map((item) => (
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
                                        alt="Event Space"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Featured Section */}
                <ScrollReveal>
                    <div className="mt-24 rounded-3xl overflow-hidden shadow-2xl relative h-[500px] flex items-center justify-center group">
                        <div className="absolute inset-0">
                            <img src={img3} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Night Event" />
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
                        </div>

                        <div className="relative z-10 p-8 md:p-16 text-center max-w-4xl">
                            <span className="text-orange-500 font-bold tracking-widest uppercase mb-4 block animate-pulse">Available for Booking</span>
                            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight">
                                YOUR PERFECT <br /> VENUE
                            </h2>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                                Spacious grounds, professional lighting, and a serene atmosphere. Host your next event at Happy Valley Park for an experience your guests will love.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default EventSpace;
