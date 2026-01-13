import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
    // Dynamically import all images from assets/images
    const images = import.meta.glob('../assets/images/*.{jpg,png,jpeg,JPG}', { eager: true });
    const galleryItems = Object.values(images).map(img => img.default);

    return (
        <div className="pt-36 pb-16 px-4 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-black mb-4 text-gray-900">
                    Photo <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Gallery</span>
                </h1>
                <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
                    A glimpse into the fun and madness at Happy Valley.
                </p>

                <div className="columns-1 md:columns-3 gap-4 space-y-4">
                    {galleryItems.map((src, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                        >
                            <img
                                src={src}
                                alt={`Gallery ${i}`}
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
