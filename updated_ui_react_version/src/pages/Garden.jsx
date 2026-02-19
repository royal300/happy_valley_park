import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/common/ScrollReveal';

// Garden Images
import garden1 from '../assets/Garden/DSC00482.webp';
import garden2 from '../assets/Garden/DSC00496.webp';
import garden3 from '../assets/Garden/DSC00507.webp';
import garden4 from '../assets/Garden/DSC00508.webp';
import garden5 from '../assets/Garden/DSC00518.webp';
import garden6 from '../assets/Garden/IMG_2488.webp';
import garden7 from '../assets/Garden/IMG_2491.webp';
import garden8 from '../assets/Garden/IMG_2512.webp';
import garden9 from '../assets/Garden/IMG_2534.webp';
import garden10 from '../assets/Garden/IMG_2602.webp';
import garden11 from '../assets/Garden/IMG_2610.webp';
import garden12 from '../assets/Garden/IMG_2615.webp';
import garden13 from '../assets/Garden/IMG_2628.webp';
import indiaGate from '../assets/Garden/india gate.webp';

const Garden = () => {
    const gardenImages = [
        { id: 1, image: garden1 },
        { id: 2, image: garden2 },
        { id: 3, image: garden3 },
        { id: 4, image: garden4 },
        { id: 5, image: garden5 },
        { id: 6, image: garden6 },
        { id: 7, image: garden7 },
        { id: 8, image: garden8 },
        { id: 9, image: garden9 },
        { id: 10, image: garden10 },
        { id: 11, image: garden11 },
        { id: 12, image: garden12 },
    ];

    return (
        <div className="bg-gray-50 pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                            Relaxation <span className="text-transparent bg-clip-text bg-gradient-to-r from-wonderla-red to-pink-600">Garden</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                            Unwind in nature's embrace. A peaceful sanctuary for relaxation and rejuvenation.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {gardenImages.map((item) => (
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
                                        alt="Garden"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Featured Garden Section - 5D Show Style */}
                <ScrollReveal>
                    <div className="mt-24 rounded-3xl overflow-hidden shadow-2xl relative h-[500px] flex items-center justify-center group">
                        <div className="absolute inset-0">
                            <img src={indiaGate} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="India Gate" />
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
                        </div>

                        <div className="relative z-10 p-8 md:p-16 text-center max-w-4xl">
                            <span className="text-red-500 font-bold tracking-widest uppercase mb-4 block animate-pulse">India Gate</span>
                            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight">
                                NEW <br /> ATTRACTION
                            </h2>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                                Experience the iconic India Gate replica in our garden. A magnificent addition to Happy Valley Park's collection of attractions.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default Garden;
