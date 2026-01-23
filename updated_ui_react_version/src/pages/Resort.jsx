import React from 'react';
import { motion } from 'framer-motion';

const Resort = () => {
    return (
        <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-4xl font-black text-gray-900 mb-4">Happy Valley Resort</h1>
                <p className="text-xl text-gray-600">Luxury rooms starting from ₹1500/-</p>
            </motion.div>
        </div>
    );
};

export default Resort;
