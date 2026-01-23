import React from 'react';
import { motion } from 'framer-motion';

const OfferBanners = () => {
    return (
        <section className="container mx-auto px-4 py-12">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                <p className="text-yellow-600 font-black uppercase tracking-[0.3em] text-base mb-2">
                    Special Deals
                </p>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">
                    Offer <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Zone</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Water World Offer */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group relative w-full overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                >
                    <img
                        src="/water_park_poster_final.jpg"
                        alt="Water World 20% OFF Offer"
                        className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </motion.div>

                {/* Dry Park Offer */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="group relative w-full overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                >
                    <img
                        src="/dry_park_poster_final.jpg"
                        alt="Dry Park All Rides Combo Offer"
                        className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default OfferBanners;
