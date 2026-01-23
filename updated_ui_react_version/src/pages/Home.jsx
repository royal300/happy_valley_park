import React from 'react';
import Hero from '../components/home/Hero';
import TicketPackages from '../components/home/TicketPackages';
import AttractionsPreview from '../components/home/AttractionsPreview';
import ReelsCarousel from '../components/home/ReelsCarousel';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/common/ScrollReveal';

// Images
import resortImg from '../assets/images/resort.jpg';
import picnicImg from '../assets/images/picnic_spot.jpg';
import sittingImg from '../assets/images/sitingpark.jpg';

import OfferBanners from '../components/home/OfferBanners'; // Import OfferBanners

import AttractionHighlights from '../components/home/AttractionHighlights'; // Import AttractionHighlights

const Home = () => {
    return (
        <div className="bg-white">
            <Hero />

            <ScrollReveal>
                <TicketPackages />
            </ScrollReveal>

            {/* Attraction Highlights Section - Special Events */}
            <ScrollReveal delay={0.1}>
                <AttractionHighlights />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
                <AttractionsPreview />
            </ScrollReveal>

            {/* Reels Section */}
            <ScrollReveal delay={0.1}>
                <ReelsCarousel />
            </ScrollReveal>

            {/* Offer Banners Section - Offer Zone */}
            <ScrollReveal delay={0.15}>
                <OfferBanners />
            </ScrollReveal>

            {/* Resort & Facilities Section */}
            <ScrollReveal delay={0.2}>
                <section className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <p className="text-yellow-600 font-black uppercase tracking-[0.3em] text-base mb-2">
                                Other
                            </p>
                            <h2 className="text-5xl font-black uppercase tracking-tighter text-gray-900">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Facilities</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 - Resort */}
                            <Link to="/resort" className="group relative overflow-hidden rounded-2xl h-80 block shadow-xl transition-transform hover:-translate-y-2">
                                <img src={resortImg} alt="Luxury Resort" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black px-6 py-2.5 rounded-full text-sm font-black shadow-2xl z-10 animate-pulse-slow border-2 border-yellow-500">
                                    <span className="drop-shadow-md">Room Start From 1500/-</span>
                                </div>
                                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90 to-transparent w-full">
                                    <h3 className="text-2xl font-bold mb-1 text-white">Happy Valley Resort</h3>
                                    <p className="text-sm text-gray-300">Luxury rooms available</p>
                                </div>
                            </Link>

                            {/* Feature 2 - Picnic */}
                            <Link to="/picnic-spot" className="group relative overflow-hidden rounded-2xl h-80 block shadow-xl transition-transform hover:-translate-y-2">
                                <img src={picnicImg} alt="Picnic Spot" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white px-6 py-2.5 rounded-full text-sm font-black shadow-2xl z-10 animate-pulse-slow border-2 border-red-400">
                                    <span className="drop-shadow-md">Book 1500/-</span>
                                </div>
                                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90 to-transparent w-full">
                                    <h3 className="text-2xl font-bold mb-1 text-white">Picnic Spots</h3>
                                    <p className="text-sm text-gray-300">Perfect family outings</p>
                                </div>
                            </Link>

                            {/* Feature 3 - Garden */}
                            <Link to="/garden" className="group relative overflow-hidden rounded-2xl h-80 block shadow-xl transition-transform hover:-translate-y-2">
                                <img src={sittingImg} alt="Sitting Park" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90 to-transparent w-full">
                                    <h3 className="text-2xl font-bold mb-1 text-white">Relaxation Gardens</h3>
                                    <p className="text-sm text-gray-300">Unwind in nature</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </ScrollReveal>
        </div>
    );
};

export default Home;
