import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import images
import frisbeeImg from '../../assets/images/frisbee_ride.jpg';
import carouselImg from '../../assets/images/flyingcarousel.jpg';
import horseImg from '../../assets/images/horseride.jpg';
import trainImg from '../../assets/images/toytrain.jpg';
import jumpImg from '../../assets/images/jumping-house.jpg';
import poolImg from '../../assets/images/waterpool.jpg';
import carImg from '../../assets/images/striking_car.jpg';
import boatImg from '../../assets/images/boating.jpg';
import mickeyImg from '../../assets/images/mickeymouse.jpg';
import hauntedImg from '../../assets/images/hauntedhouse.jpg';
import gameZoneImg from '../../assets/images/gamezone.jpg';
import beesImg from '../../assets/images/bees-round.jpg';
import happyBeesImg from '../../assets/images/happybees.jpg';
import splashImg from '../../assets/images/waterpark.jpg';
import waveImg from '../../assets/images/wavepool.jpg';
import resortImg from '../../assets/images/resort.jpg';
import picnicImg from '../../assets/images/picnic_spot.jpg';
import waterSlideIcon from '../../assets/images/water-slide-icon.png';

const attractionsData = {
    dry: [
        { id: 1, title: 'Frisbee Ride', image: frisbeeImg },
        { id: 2, title: 'Haunted House', image: hauntedImg },
        { id: 3, title: 'Game Zone', image: gameZoneImg },
        { id: 4, title: 'Toy Train', image: trainImg },
        { id: 5, title: 'Striking Car', image: carImg },
        { id: 6, title: 'Lake Boating', image: boatImg },
        { id: 7, title: 'Flying Carousel', image: carouselImg },
        { id: 8, title: 'Mickey Mouse', image: mickeyImg },
        { id: 9, title: 'Jumping House', image: jumpImg },
        { id: 10, title: 'Horse Ride', image: horseImg },
        { id: 11, title: 'Bees Round', image: beesImg },
        { id: 12, title: 'Happy Bees', image: happyBeesImg },
    ],
    water: [
        { id: 13, title: 'Water Playground', image: splashImg },
        { id: 14, title: 'Children Pool', image: poolImg },
        { id: 15, title: 'Wave Pool', image: waveImg },
    ],
    others: [
        { id: 16, title: 'Happy Valley Resort', image: resortImg },
        { id: 17, title: 'Picnic Spot', image: picnicImg },
    ]
};

const categories = [
    { id: 'dry', name: 'Dry Park', icon: '🎢', type: 'emoji' },
    { id: 'water', name: 'Water Park', icon: waterSlideIcon, type: 'image' },
    { id: 'others', name: 'Others', icon: '🏖️', type: 'emoji' },
];

const AttractionsPreview = () => {
    const [activeCategory, setActiveCategory] = useState('dry');
    const [startIndex, setStartIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const currentAttractions = attractionsData[activeCategory];

    // Fast auto-scroll carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setStartIndex((prev) => {
                if (currentAttractions.length > 4) {
                    return (prev + 1) % currentAttractions.length;
                }
                return prev;
            });
        }, 2000); // Fast - 2 seconds

        return () => clearInterval(timer);
    }, [currentAttractions.length]);

    const handlePrev = () => {
        if (currentAttractions.length > 4) {
            setDirection(-1);
            setStartIndex((prev) => (prev - 1 + currentAttractions.length) % currentAttractions.length);
        }
    };

    const handleNext = () => {
        if (currentAttractions.length > 4) {
            setDirection(1);
            setStartIndex((prev) => (prev + 1) % currentAttractions.length);
        }
    };

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
        setStartIndex(0);
    };

    const getVisibleAttractions = () => {
        if (currentAttractions.length <= 4) {
            return currentAttractions;
        }
        const result = [];
        for (let i = 0; i < 4; i++) {
            result.push(currentAttractions[(startIndex + i) % currentAttractions.length]);
        }
        return result;
    };

    return (
        <div className="relative py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-wonderla-yellow font-black uppercase tracking-[0.3em] text-sm mb-4"
                    >
                        Discover Fun
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-12"
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Attractions</span>
                    </motion.h2>

                    {/* Oval Category Buttons with Unique Animations */}
                    <div className="flex justify-center gap-3 mb-16">
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                className={`relative flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-base transition-all duration-300 overflow-hidden ${activeCategory === category.id
                                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-xl'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={activeCategory === category.id ? {
                                    boxShadow: [
                                        '0 10px 30px rgba(251, 189, 8, 0.3)',
                                        '0 10px 40px rgba(251, 189, 8, 0.5)',
                                        '0 10px 30px rgba(251, 189, 8, 0.3)',
                                    ]
                                } : {}}
                                transition={{
                                    boxShadow: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                {/* Ripple effect on active */}
                                {activeCategory === category.id && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-white"
                                        initial={{ scale: 0, opacity: 0.5 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeOut"
                                        }}
                                    />
                                )}

                                {/* Icon */}
                                {category.type === 'image' ? (
                                    <img src={category.icon} alt={category.name} className="w-7 h-7" />
                                ) : (
                                    <span className="text-2xl">{category.icon}</span>
                                )}

                                {/* Text */}
                                <span className="relative z-10">{category.name}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Desktop Carousel - 4 columns with side-scroll animation */}
                <div className="hidden md:block relative">
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        <AnimatePresence mode="popLayout" custom={direction}>
                            {getVisibleAttractions().map((attraction, index) => (
                                <motion.div
                                    key={`${attraction.id}-${startIndex}`}
                                    custom={direction}
                                    initial={{
                                        x: direction > 0 ? 300 : -300,
                                        opacity: 0
                                    }}
                                    animate={{
                                        x: 0,
                                        opacity: 1
                                    }}
                                    exit={{
                                        x: direction > 0 ? -300 : 300,
                                        opacity: 0
                                    }}
                                    transition={{
                                        delay: index * 0.05,
                                        duration: 0.6,
                                        ease: "easeInOut"
                                    }}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                        <img
                                            src={attraction.image}
                                            alt={attraction.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                        {/* Ride Name */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-white font-black text-xl text-center">
                                                {attraction.title}
                                            </h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Arrows */}
                    {currentAttractions.length > 4 && (
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handlePrev}
                                className="bg-wonderla-yellow hover:bg-yellow-400 text-black p-3 rounded-full transition-all hover:scale-110 shadow-lg"
                            >
                                <ChevronLeft size={24} strokeWidth={3} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-wonderla-yellow hover:bg-yellow-400 text-black p-3 rounded-full transition-all hover:scale-110 shadow-lg"
                            >
                                <ChevronRight size={24} strokeWidth={3} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Carousel - 2 columns */}
                <div className="md:hidden">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <AnimatePresence mode="popLayout">
                            {getVisibleAttractions().slice(0, 2).map((attraction, index) => (
                                <motion.div
                                    key={`${attraction.id}-${startIndex}`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.5,
                                        ease: "easeInOut"
                                    }}
                                    className="group"
                                >
                                    <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                                        <img
                                            src={attraction.image}
                                            alt={attraction.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                                        {/* Ride Name */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-white font-black text-sm text-center">
                                                {attraction.title}
                                            </h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Navigation */}
                    {currentAttractions.length > 2 && (
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handlePrev}
                                className="bg-wonderla-yellow hover:bg-yellow-400 text-black p-3 rounded-full transition-all shadow-lg"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-wonderla-yellow hover:bg-yellow-400 text-black p-3 rounded-full transition-all shadow-lg"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttractionsPreview;
