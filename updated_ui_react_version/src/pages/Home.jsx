import React from 'react';
import Hero from '../components/home/Hero';
import TicketPackages from '../components/home/TicketPackages';
import AttractionsPreview from '../components/home/AttractionsPreview';
import ReelsCarousel from '../components/home/ReelsCarousel';
import ScrollReveal from '../components/common/ScrollReveal';

// Images
import resortImg from '../assets/images/resort.jpg';
import picnicImg from '../assets/images/picnic_spot.jpg';
import sittingImg from '../assets/images/sitingpark.jpg';

const Home = () => {
    return (
        <div className="bg-white">
            <Hero />

            <ScrollReveal>
                <TicketPackages />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
                <AttractionsPreview />
            </ScrollReveal>

            {/* Reels Section */}
            <ScrollReveal delay={0.1}>
                <ReelsCarousel />
            </ScrollReveal>

            {/* Resort & Facilities Section */}
            <ScrollReveal delay={0.2}>
                <section className="py-20 bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-extrabold mb-4">Stay & <span className="text-wonderla-yellow">Relax</span></h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Extend your fun! Our premium hotel is available for a comfortable stay right inside the park.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="group relative overflow-hidden rounded-2xl h-80">
                                <img src={resortImg} alt="Luxury Resort" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90 to-transparent w-full">
                                    <h3 className="text-2xl font-bold mb-1">Happy Valley Hotel</h3>
                                    <p className="text-sm text-gray-300">Luxury rooms available</p>
                                </div>
                            </div>
                            {/* Feature 2 */}
                            <div className="group relative overflow-hidden rounded-2xl h-80">
                                <img src={picnicImg} alt="Picnic Spot" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90 to-transparent w-full">
                                    <h3 className="text-2xl font-bold mb-1">Picnic Spots</h3>
                                    <p className="text-sm text-gray-300">Perfect family outings</p>
                                </div>
                            </div>
                            {/* Feature 3 */}
                            <div className="group relative overflow-hidden rounded-2xl h-80">
                                <img src={sittingImg} alt="Sitting Park" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90 to-transparent w-full">
                                    <h3 className="text-2xl font-bold mb-1">Relaxation Gardens</h3>
                                    <p className="text-sm text-gray-300">Unwind in nature</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>
        </div>
    );
};

export default Home;
