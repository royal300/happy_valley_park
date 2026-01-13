import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import heroVideo from '../../assets/videos/hvp.mp4'; // Reusing existing video as placeholder

// Mock Data for Reels
const reels = [
    { id: 1, title: "Crazy Frisbee", views: "1.2M", video: heroVideo },
    { id: 2, title: "Water Splash", views: "850K", video: heroVideo },
    { id: 3, title: "Haunted Vibes", views: "2.1M", video: heroVideo },
    { id: 4, title: "Kids Fun", views: "500K", video: heroVideo },
    { id: 5, title: "Foodie Paradise", views: "300K", video: heroVideo },
    { id: 6, title: "Sunset View", views: "1.5M", video: heroVideo },
];

const ReelsCarousel = () => {
    const scrollRef = useRef(null);

    return (
        <section className="py-20 bg-black text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-10">
                <h2 className="text-4xl font-black uppercase tracking-tighter">
                    Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Reels</span>
                </h2>
                <p className="text-gray-400">Catch the vibe on our social feed</p>
            </div>

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-8 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
            >
                {reels.map((reel, idx) => (
                    <motion.div
                        key={reel.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex-shrink-0 w-[280px] h-[500px] relative rounded-3xl overflow-hidden snap-center group cursor-pointer border border-white/10"
                    >
                        {/* Video Layer */}
                        <video
                            src={reel.video}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            loop
                            muted
                            playsInline
                        // onMouseOver={e => e.target.play()}
                        // onMouseOut={e => e.target.pause()}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>

                        {/* Play Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                                <Play fill="white" className="text-white w-8 h-8" />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <h3 className="text-xl font-bold mb-1">{reel.title}</h3>
                            <p className="text-sm text-gray-400 flex items-center gap-2">
                                <span>▶ {reel.views}</span>
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ReelsCarousel;
