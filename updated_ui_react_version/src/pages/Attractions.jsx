import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/common/ScrollReveal';
import { ridesData } from '../data/ridesData';
import hauntedImg from '../assets/images/hauntedhouse.jpg';

const Attractions = () => {
    const [filter, setFilter] = useState('All');

    // Filter only Dry Park rides
    const dryRides = ridesData.filter(ride => ride.type === 'Dry');

    const filteredAttractions = filter === 'All'
        ? dryRides
        : dryRides.filter(attr => attr.category === filter);

    return (
        <div className="bg-gray-50 pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                            Dry Park <span className="text-transparent bg-clip-text bg-gradient-to-r from-wonderla-red to-pink-600">Attractions</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                            Discover world-class rides and attractions designed for thrill-seekers, families, and little ones alike.
                        </p>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {['All', 'Thrill', 'Family', 'Kids', 'Indoor', 'Adventure'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${filter === cat
                                        ? 'bg-black text-white shadow-xl scale-105'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredAttractions.map((attr) => (
                            <motion.div
                                key={attr.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden relative h-80"
                            >
                                <Link to={`/ride/${attr.id}`} className="block h-full w-full group">
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                            {attr.category}
                                        </span>
                                    </div>

                                    <img
                                        src={attr.image}
                                        alt={attr.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>

                                    <div className="absolute bottom-0 left-0 p-6 w-full">
                                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-wonderla-yellow transition-colors">{attr.title}</h3>
                                        <div className="w-12 h-1 bg-wonderla-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                                        <p className="text-gray-300 text-xs mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            {attr.description}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* 5D Theatre Section */}
                <ScrollReveal>
                    <div className="mt-24 rounded-3xl overflow-hidden shadow-2xl relative h-[500px] flex items-center justify-center group">
                        <div className="absolute inset-0">
                            <img src={hauntedImg} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Theatre BG" />
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
                        </div>

                        <div className="relative z-10 p-8 md:p-16 text-center max-w-4xl">
                            <span className="text-red-500 font-bold tracking-widest uppercase mb-4 block animate-pulse">Now Showing</span>
                            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight">
                                5D THEATRE <br /> EXPERIENCE
                            </h2>
                            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                                Synchronized visual effects, sophisticated motion rides, and environmental effects generate a highly realistic experience.
                            </p>
                            <button className="bg-red-600 px-10 py-4 rounded-full font-black text-white hover:bg-red-700 transition-all hover:scale-105 shadow-xl shadow-red-600/30">
                                WATCH TRAILER
                            </button>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default Attractions;
