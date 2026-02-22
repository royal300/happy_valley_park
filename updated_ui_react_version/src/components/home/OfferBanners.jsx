import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const OfferBanners = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const apiUrl = '/backend/api/offers.php';
                const response = await axios.get(apiUrl);
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setOffers(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch offers');
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    // Fallback to hardcoded images if no offers in DB
    const fallbackOffers = [
        { id: 'f1', title: 'Water Park Offer', image_url: '/water_park_poster_final.jpg' },
        { id: 'f2', title: 'Dry Park Offer', image_url: '/dry_park_poster_final.jpg' },
    ];

    const displayOffers = offers.length > 0 ? offers : (loading ? [] : fallbackOffers);

    if (loading) return null; // Don't flash content while loading

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
                {displayOffers.map((offer, index) => (
                    <motion.div
                        key={offer.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="group relative w-full overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                    >
                        <img
                            src={offer.image_url}
                            alt={offer.title}
                            className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default OfferBanners;
