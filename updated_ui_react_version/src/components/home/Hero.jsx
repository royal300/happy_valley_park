import React from 'react';
import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';
import heroVideo from '../../assets/videos/hvp.mp4';
import heroBg from '../../assets/images/happyvalleygate.jpg';
import ticketIcon from '../../assets/images/ticket-icon.png';
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
            {/* Background Video - Full Screen Coverage */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                <video
                    src={heroVideo}
                    poster={heroBg}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute min-w-full min-h-full w-auto h-auto"
                    style={{
                        objectFit: 'cover',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) scale(1.22)'
                    }}
                />

                {/* Darker Overlay for Better Text Contrast */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl w-full flex flex-col items-center"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="mb-4">
                        <span className="bg-white/20 text-white border border-white/30 backdrop-blur-md px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold tracking-[0.2em] sm:tracking-[0.25em] uppercase shadow-2xl">
                            ★ West Bengal's Premier Park ★
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        variants={itemVariants}
                        className="font-black text-white mb-4 uppercase leading-[0.9]"
                    >
                        <span
                            className="block text-3xl sm:text-5xl md:text-6xl tracking-wide text-white mb-1 font-extrabold"
                            style={{
                                textShadow: '3px 3px 0px rgba(251,189,8,0.4), 6px 6px 0px rgba(251,189,8,0.3), 9px 9px 0px rgba(251,189,8,0.2)',
                                letterSpacing: '0.05em'
                            }}
                        >
                            Unleash
                        </span>
                        <span
                            className="block text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7rem] font-black tracking-wider bg-gradient-to-b from-yellow-300 via-orange-400 to-orange-600 bg-clip-text text-transparent"
                            style={{
                                WebkitTextStroke: '3px #ffffff',
                                textStroke: '3px #ffffff',
                                filter: 'drop-shadow(0 0 20px rgba(251,189,8,0.8)) drop-shadow(4px 4px 0px rgba(255,255,255,0.3))',
                                textShadow: '0 2px 10px rgba(0,0,0,0.3), inset 0 -20px 30px rgba(255,255,255,0.3)',
                                letterSpacing: '0.1em',
                                transform: 'skewY(-2deg)'
                            }}
                        >
                            MADNESS
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={itemVariants}
                        className="text-white text-base sm:text-lg md:text-xl font-bold leading-relaxed mb-8 max-w-2xl px-4"
                        style={{ textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}
                    >
                        🎉 Rides • Slides • Smiles 🎉
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        variants={itemVariants}
                        animate={{
                            y: [0, -8, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/book"
                            className="bg-wonderla-yellow text-black font-extrabold px-10 py-4 rounded-full text-base sm:text-lg flex items-center gap-3 hover:bg-yellow-400 transition-all relative overflow-hidden"
                            style={{
                                boxShadow: '0 0 30px rgba(251, 189, 8, 0.6), 0 0 60px rgba(251, 189, 8, 0.4), 0 0 80px rgba(255, 255, 255, 0.4), 0 0 100px rgba(255, 255, 255, 0.2), 0 4px 20px rgba(0,0,0,0.3)',
                            }}
                        >
                            {/* Animated shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                animate={{
                                    x: ['-100%', '200%']
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                    ease: "easeInOut"
                                }}
                            />
                            <img src={ticketIcon} alt="Ticket" className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
                            <span className="relative z-10">GET YOUR TICKETS</span>
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
