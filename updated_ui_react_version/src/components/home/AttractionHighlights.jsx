import React from 'react';
import { motion } from 'framer-motion';

const AttractionHighlights = () => {
    return (
        <section className="container mx-auto px-4 py-12">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                <p className="text-yellow-600 font-black uppercase tracking-[0.3em] text-base mb-2">
                    Happening Now
                </p>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">
                    Special <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Events</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* India Gate Attraction */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group relative w-full overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                >
                    <img
                        src="/india_gate_poster.png"
                        alt="New Attraction: India Gate"
                        className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </motion.div>

                {/* Pool Wave Attraction */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="group relative w-full overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                >
                    <img
                        src="/pool_wave_poster.jpg"
                        alt="New Attraction: Pool Wave"
                        className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default AttractionHighlights;
