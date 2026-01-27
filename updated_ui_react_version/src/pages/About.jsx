import React from 'react';
import { motion } from 'framer-motion';
import aboutImg from '../assets/images/resort.jpg';

const About = () => {
    return (
        <div className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl font-extrabold text-center mb-8 text-gray-900"
                >
                    About <span className="text-wonderla-yellow">Happy Valley</span>
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="prose lg:prose-xl mx-auto text-gray-500"
                >
                    <p className="mb-6">
                        Happy Valley Park is one of the leading family entertainment destinations in West Bengal, located at Bira. It offers a perfect mix of thrilling amusement rides, an exciting water park, peaceful green spaces, and comfortable hospitality. With attractions like the Frisbee, Carousel, Striking Car, 5D Show, water slides, and Wave Pool, the park promises fun for all age groups. Surrounded by lush gardens, picnic areas, a restaurant, and a resort, Happy Valley Park is ideal for day outings and relaxing getaways with family and friends.
                    </p>
                    <img
                        src={aboutImg}
                        alt="Park Overview"
                        className="w-full rounded-2xl shadow-xl mb-6"
                    />
                    <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Mission</h3>
                    <p className="mb-6">
                        Our mission is to create a safe and joyful space where children choose active play over screens, families spend quality time together, and every visitor enjoys real fun through entertainment and nature.
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Vision</h3>
                    <p>
                        Our vision is to become the most loved family park in West Bengal by delivering memorable experiences that combine fun, safety, greenery, and togetherness.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
