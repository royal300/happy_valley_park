import React from 'react';
import { motion } from 'framer-motion';
import frisbeeImg from '../../assets/images/frisbee_ride.jpg';
import waterWorldImg from '../../assets/images/waterworld.jpg';
import carouselImg from '../../assets/images/flyingcarousel.jpg';
import trainImg from '../../assets/images/toytrain.jpg';
import carImg from '../../assets/images/striking_car.jpg';
import boatImg from '../../assets/images/boating.jpg';

const AttractionCard = ({ title, image, category }) => (
    <motion.div
        whileHover={{ y: -8 }}
        className="group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-2xl transition-shadow duration-300 h-80 cursor-pointer bg-white"
    >
        <div className="absolute top-4 left-4 z-20">
            <span className="bg-white/90 backdrop-blur text-black text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                {category}
            </span>
        </div>

        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
            <h3 className="text-2xl font-bold mb-1 leading-tight">{title}</h3>
            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                <p className="text-gray-300 text-sm mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Experience the thrill • Rating: 4.8/5
                </p>
            </div>
        </div>
    </motion.div>
);

const AttractionsPreview = () => {
    const attractions = [
        { title: "Frisbee Ride", category: "Thrill", image: frisbeeImg },
        { title: "Water World", category: "Water Park", image: waterWorldImg },
        { title: "Flying Carousel", category: "Family", image: carouselImg },
        { title: "Toy Train", category: "Kids", image: trainImg },
        { title: "Striking Car", category: "Adventure", image: carImg },
        { title: "Lake Boating", category: "Water Fun", image: boatImg }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-wonderla-blue font-bold tracking-widest uppercase text-sm mb-2 block">Discover Fun</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-sans">
                        World Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-wonderla-red to-orange-500">Attractions</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">From high-thrill roller coasters to relaxing water rides, we have something for everyone.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {attractions.map((attr, idx) => (
                        <AttractionCard key={idx} {...attr} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AttractionsPreview;
