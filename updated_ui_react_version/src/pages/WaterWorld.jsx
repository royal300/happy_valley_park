import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/common/ScrollReveal';
import { ridesData } from '../data/ridesData';
import heroImg from '../assets/images/waterworld.jpg';

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
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
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
                            className="text-xl md:text-2xl max-w-2xl mx-auto"
                        >
                            Dive into a world of coolness and fun. The best water park experience in West Bengal.
                        </motion.p>
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
                            <Link to={`/ride/${item.id}`} className="block group relative overflow-hidden rounded-2xl shadow-xl h-80">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                                <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-wonderla-yellow transition-colors">{item.title}</h3>
                                    <p className="text-gray-200 line-clamp-2">{item.description}</p>
                                    <span className="inline-block mt-4 text-sm font-bold uppercase tracking-widest text-wonderla-blue bg-white/10 backdrop-blur px-4 py-2 rounded-full group-hover:bg-white group-hover:text-blue-600 transition-all">
                                        View Details
                                    </span>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default WaterWorld;
