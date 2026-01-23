import React from 'react';
import { motion } from 'framer-motion';

const Garden = () => {
    return (
        <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-4xl font-black text-gray-900 mb-4">Relaxation Garden</h1>
                <p className="text-xl text-gray-600">Unwind in nature.</p>
            </motion.div>
        </div>
    );
};

export default Garden;
