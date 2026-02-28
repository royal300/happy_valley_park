import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Dry Park Images
import frisbeeImg from '../../assets/Dry Park/Frisbee.jpg';
import bullRideImg from '../../assets/Dry Park/Bull Ride.jpg';
import bumpingCarImg from '../../assets/Dry Park/Bumping Car.JPG';
import merryGoRoundImg from '../../assets/Dry Park/Merry Go Round.jpg';
import horseImg from '../../assets/Dry Park/Horse Ride.jpg';
import cricketMissionImg from '../../assets/Dry Park/ Cricket Mission.jpg';
import boatImg from '../../assets/Dry Park/Boating.jpg';
import toyTrainImg from '../../assets/Dry Park/Toy Train.jpg';
import dragonTrainImg from '../../assets/Dry Park/Dragon Train.jpg';
import jumpingMickeyImg from '../../assets/Dry Park/Jumping Mickey.jpg';
import trampolinImg from '../../assets/Dry Park/Trampolin.JPG';
import carouselImg from '../../assets/Dry Park/Child Flying Carousel.jpg';
import gameZoneImg from '../../assets/Dry Park/Game Zone.JPG';
import hauntedHouseImg from '../../assets/Dry Park/Haunted House.JPG';
import show5DImg from '../../assets/Dry Park/5D Show.jpg';

// Water Park Images
import multiSlideImg from '../../assets/Water Park/Multi Slide Water Ride.JPG';
import multiSlide1Img from '../../assets/Water Park/Multi Slide Water Ride (1).JPG';
import multiSlide2Img from '../../assets/Water Park/Multi Slide Water Ride .JPG';
import childrenWaterParkImg from '../../assets/Water Park/Children Water Park .JPG';
import childrenWaterPark1Img from '../../assets/Water Park/Children Water Park (1).JPG';
import waterWaveImg from '../../assets/Water Park/Water Wave .JPG';
import waterWave1Img from '../../assets/Water Park/Water Wave (1).JPG';
import waterCaveImg from '../../assets/Water Park/Water Cave .JPG';
import danceFloorImg from '../../assets/Water Park/Dance Floor.jpg';
import poolSideImg from '../../assets/Water Park/Pool Side.jpg';

// Other Images
import resortImg from '../../assets/images/resort.jpg';
import picnicImg from '../../assets/images/picnic_spot.jpg';
import gardenImg from '../../assets/images/sitingpark.jpg';
import waterSlideIcon from '../../assets/images/water-slide-icon.png';

const attractionsData = {
    dry: [
        { id: 1, title: 'Frisbee', image: frisbeeImg },
        { id: 2, title: 'Bull Ride', image: bullRideImg },
        { id: 3, title: 'Bumping Car', image: bumpingCarImg },
        { id: 4, title: 'Merry Go Round', image: merryGoRoundImg },
        { id: 5, title: 'Horse Ride', image: horseImg },
        { id: 6, title: 'Cricket Mission', image: cricketMissionImg },
        { id: 7, title: 'Boating', image: boatImg },
        { id: 8, title: 'Toy Train', image: toyTrainImg },
        { id: 9, title: 'Dragon Train', image: dragonTrainImg },
        { id: 10, title: 'Jumping Mickey', image: jumpingMickeyImg },
        { id: 11, title: 'Trampolin', image: trampolinImg },
        { id: 12, title: 'Flying Carousel', image: carouselImg },
        { id: 13, title: 'Game Zone', image: gameZoneImg },
        { id: 14, title: 'Haunted House', image: hauntedHouseImg },
        { id: 15, title: '5D Show', image: show5DImg },
    ],
    water: [
        { id: 16, title: 'Multi Slide Water Ride', image: multiSlideImg },
        { id: 17, title: 'Multi Slide Water Ride', image: multiSlide1Img },
        { id: 18, title: 'Multi Slide Water Ride', image: multiSlide2Img },
        { id: 19, title: 'Children Water Park', image: childrenWaterParkImg },
        { id: 20, title: 'Children Play Area', image: childrenWaterPark1Img },
        { id: 21, title: 'Water Wave Pool', image: waterWaveImg },
        { id: 22, title: 'Wave Pool Beach Zone', image: waterWave1Img },
        { id: 23, title: 'Water Cave', image: waterCaveImg },
        { id: 24, title: 'Dance Floor', image: danceFloorImg },
        { id: 25, title: 'Pool Side Relaxation', image: poolSideImg },
    ]
};


const AttractionsPreview = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const waterAttractions = attractionsData.water;
    const dryAttractions = attractionsData.dry;
    const maxLength = Math.max(waterAttractions.length, dryAttractions.length);

    // Fast auto-scroll carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setStartIndex((prev) => (prev + 1) % maxLength);
        }, 2000); // Fast - 2 seconds

        return () => clearInterval(timer);
    }, [maxLength]);

    const handlePrev = () => {
        setDirection(-1);
        setStartIndex((prev) => (prev - 1 + maxLength) % maxLength);
    };

    const handleNext = () => {
        setDirection(1);
        setStartIndex((prev) => (prev + 1) % maxLength);
    };

    const getVisibleAttractions = (isMobile = false) => {
        if (isMobile) {
            return [
                waterAttractions[startIndex % waterAttractions.length],
                dryAttractions[startIndex % dryAttractions.length]
            ];
        } else {
            return [
                waterAttractions[startIndex % waterAttractions.length],
                waterAttractions[(startIndex + 1) % waterAttractions.length],
                dryAttractions[startIndex % dryAttractions.length],
                dryAttractions[(startIndex + 1) % dryAttractions.length]
            ];
        }
    };

    return (
        <div className="relative py-12 bg-white">
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

                    {/* Category Labels (Read-only now) */}
                    <div className="flex justify-center gap-3 mb-16">
                        <div className="flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-base bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-xl">
                            <img src={waterSlideIcon} alt="Water Park" className="w-7 h-7" />
                            <span>Water Park</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-base bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-xl">
                            <span className="text-2xl">🎢</span>
                            <span>Dry Park</span>
                        </div>
                    </div>
                </div>

                {/* Desktop Carousel - 4 columns: 2 Water + 2 Dry */}
                <div className="hidden md:block relative">
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        <AnimatePresence mode="popLayout" custom={direction}>
                            {getVisibleAttractions(false).map((attraction, index) => (
                                <motion.div
                                    key={`${attraction.id}-${startIndex}-${index}`}
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
                                        {/* Category Badge */}
                                        <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-black uppercase text-white shadow-lg ${index < 2 ? 'bg-blue-500/80' : 'bg-orange-500/80'}`}>
                                            {index < 2 ? 'Water Park' : 'Dry Park'}
                                        </div>

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
                </div>

                {/* Mobile Carousel - 2 columns: 1 Water + 1 Dry */}
                <div className="md:hidden">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <AnimatePresence mode="popLayout">
                            {getVisibleAttractions(true).map((attraction, index) => (
                                <motion.div
                                    key={`${attraction.id}-${startIndex}-${index}`}
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
                                        {/* Category Badge */}
                                        <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[8px] font-black uppercase text-white shadow-md ${index === 0 ? 'bg-blue-500/80' : 'bg-orange-500/80'}`}>
                                            {index === 0 ? 'Water' : 'Dry'}
                                        </div>

                                        <img
                                            src={attraction.image}
                                            alt={attraction.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                                        {/* Ride Name */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-white font-black text-[10px] text-center">
                                                {attraction.title}
                                            </h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Navigation */}
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
                </div>
            </div>
        </div>
    );
};

export default AttractionsPreview;
