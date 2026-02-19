import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomePopup = () => {
    const [popup, setPopup] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Check if popup was already dismissed in this session
        const dismissed = sessionStorage.getItem('popup_dismissed');
        if (dismissed) return;

        const fetchPopup = async () => {
            try {
                const apiUrl = import.meta.env.PROD ? '/backend/api/popup.php' : 'http://localhost:8000/backend/api/popup.php';
                const response = await axios.get(apiUrl);
                if (response.data.image_url && response.data.is_active == 1) {
                    setPopup(response.data);
                    setVisible(true);
                }
            } catch (error) {
                // Silently fail
            }
        };
        fetchPopup();
    }, []);

    const handleClose = () => {
        setVisible(false);
        sessionStorage.setItem('popup_dismissed', 'true');
    };

    if (!popup || !visible) return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors"
                        >
                            <X size={22} />
                        </button>

                        {/* Popup Image */}
                        <img
                            src={popup.image_url}
                            alt="Welcome"
                            className="w-full h-auto max-h-[80vh] object-contain bg-white"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomePopup;
