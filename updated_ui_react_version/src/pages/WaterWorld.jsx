import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/common/ScrollReveal';
import { ridesData } from '../data/ridesData';
import heroImg from '../assets/Water Park/Multi Slide Water Ride.JPG';

const WaterWorld = () => {
    // Filter only Water Park rides
    const waterRides = ridesData.filter(ride => ride.type === 'Water');

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <img
                    src={heroImg}
                    alt="Water World"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center pt-20">
                    <div className="text-center text-white px-4">
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-5xl md:text-7xl font-extrabold mb-4 uppercase tracking-tighter"
                        >
                            Water <span className="text-blue-400">World</span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl max-w-2xl mx-auto mb-8"
                        >
                            Dive into a world of coolness and fun. The best water park experience in West Bengal.
                        </motion.p>
                        <motion.a
                            href="https://booking.gohappyvalley.com/client/dashboard"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.96 }}
                            className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base sm:text-lg font-extrabold uppercase tracking-wide text-white relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4, #0891b2)',
                                boxShadow: '0 0 30px rgba(14, 165, 233, 0.7), 0 0 60px rgba(6, 182, 212, 0.4), 0 4px 20px rgba(0,0,0,0.4)',
                            }}
                        >
                            {/* Animated shine */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
                            />
                            <span className="relative z-10">🎟️ Book Tickets</span>
                        </motion.a>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Splash into <span className="text-wonderla-blue">Happiness</span></h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Our Water World is renowned for its cleanliness, exciting slides, and family-friendly environment.
                            Whether you want to relax in the pool or scream down a slide, we have it all.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {waterRides.map((item, index) => (
                        <ScrollReveal key={item.id} delay={index * 0.1}>
                            <div className="block group relative overflow-hidden rounded-2xl shadow-xl h-80 cursor-pointer">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                                <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-wonderla-yellow transition-colors">{item.title}</h3>
                                    <p className="text-gray-200 line-clamp-2">{item.description}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default WaterWorld;
