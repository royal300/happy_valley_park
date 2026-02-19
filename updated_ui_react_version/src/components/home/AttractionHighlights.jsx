import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AttractionHighlights = () => {
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                const apiUrl = import.meta.env.PROD ? '/backend/api/attractions.php' : 'http://localhost:8000/backend/api/attractions.php';
                const response = await axios.get(apiUrl);
                if (Array.isArray(response.data)) {
                    setAttractions(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch attractions');
            }
        };
        fetchAttractions();
    }, []);
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
                {attractions.length > 0 ? (
                    attractions.map((attraction, index) => (
                        <motion.div
                            key={attraction.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="group relative w-full overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                        >
                            <img
                                src={attraction.image_url}
                                alt="Event"
                                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </motion.div>
                    ))
                ) : (
                    // Fallback / Loading state or default static content if needed
                    <p className="col-span-2 text-center text-gray-500">Loading events...</p>
                )}
            </div>
        </section>
    );
};

export default AttractionHighlights;
