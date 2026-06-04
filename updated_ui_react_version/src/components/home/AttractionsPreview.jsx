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
        <div className="relative pt-24 pb-12">
            {/* Decorative Wavy SVG Top Divider */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg className="relative block w-full h-[60px] md:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-blue-500"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-blue-400"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-blue-200"></path>
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
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
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <div className="flex items-center justify-center gap-2.5 w-48 px-6 py-3 rounded-full font-bold text-base bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-xl transition-transform hover:scale-105">
                            <img src={waterSlideIcon} alt="Water Park" className="w-7 h-7" />
                            <span>Water Park</span>
                        </div>
                        <div className="flex items-center justify-center gap-2.5 w-48 px-6 py-3 rounded-full font-bold text-base bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-xl transition-transform hover:scale-105">
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
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

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
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

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
