import React from 'react';
import { motion } from 'framer-motion';
import heroVideo from '../../assets/videos/hvp.mp4';
import heroBg from '../../assets/images/happyvalleygate.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
    // Staggered Variants for Text
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };


    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">
            {/* Background Video */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
            >
                <video
                    src={heroVideo}
                    poster={heroBg}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center"
                    style={{ minHeight: '100%', minWidth: '100%' }}
                />

                {/* Subtle Overlay for Text Contrast */}
                <div className="absolute inset-0 bg-black/10"></div>
            </motion.div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 mt-28">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl w-full flex flex-col items-center"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="mb-4">
                        <span className="bg-white/10 text-white border border-white/20 backdrop-blur-md px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-lg">
                            ★ West Bengal's Premier Park
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        variants={itemVariants}
                        className="font-black text-white mb-5 uppercase leading-[0.85] drop-shadow-2xl"
                    >
                        <span className="block text-3xl sm:text-5xl md:text-6xl tracking-tighter text-white mb-1">Unleash</span>
                        <span className="block text-[3.5rem] sm:text-[5.5rem] md:text-[7rem] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 filter drop-shadow-lg tracking-tighter">
                            MADNESS
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={itemVariants}
                        className="text-white/90 text-sm md:text-lg font-medium leading-relaxed drop-shadow-md mb-8 max-w-2xl"
                    >
                        Embrace the adrenaline. Where every scream turns into a memory.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/book"
                            className="bg-white text-black font-black py-3 px-9 rounded-full text-base shadow-2xl flex items-center gap-3 hover:bg-gray-100 transition-colors"
                        >
                            GET TICKETS <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 z-10"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white/50 rounded-full"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
