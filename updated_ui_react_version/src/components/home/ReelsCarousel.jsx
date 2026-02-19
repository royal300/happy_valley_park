import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import reel1 from '../../assets/videos/hvp_reels1.webm';
import reel2 from '../../assets/videos/hvp_reels2.webm';
import reel3 from '../../assets/videos/hvp_reels3.webm';
import reel4 from '../../assets/videos/hvp_reels4.webm';
import reel5 from '../../assets/videos/hvp_reels5.webm';

// Mock Data for Reels
const reels = [
    { id: 1, video: reel1 },
    { id: 2, video: reel2 },
    { id: 3, video: reel3 },
    { id: 4, video: reel4 },
    { id: 5, video: reel5 },
];

const LazyVideo = ({ src, poster }) => {
    const videoRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 } // Trigger when 20% visible
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={videoRef} className="w-full h-full bg-black">
            {isInView ? (
                <video
                    src={src}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    loop
                    muted
                    playsInline
                    autoPlay
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

const ReelsCarousel = () => {
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Autoplay carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % reels.length;

                // Scroll to the next reel
                if (scrollRef.current) {
                    const scrollAmount = nextIndex * 249; // 225px width + 24px gap
                    scrollRef.current.scrollTo({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }

                return nextIndex;
            });
        }, 3000); // Slower for better viewing experience

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-8 bg-black overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
                <p className="text-yellow-500 font-black uppercase tracking-[0.3em] text-base mb-2">
                    Attractions
                </p>
                <h2 className="text-5xl font-black uppercase tracking-tighter text-white">
                    Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Reels</span>
                </h2>
            </div>

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-4 snap-x snap-mandatory"
                style={{
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {reels.map((reel, idx) => (
                    <motion.div
                        key={`${reel.id}-${idx}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex-shrink-0 w-[225px] h-[400px] relative rounded-3xl overflow-hidden snap-center group cursor-pointer border border-white/10"
                    >
                        {/* Video Layer */}
                        <LazyVideo src={reel.video} />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>

                        {/* Play Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                                <Play fill="white" className="text-white w-8 h-8" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ReelsCarousel;
