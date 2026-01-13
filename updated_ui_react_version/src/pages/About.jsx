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
                        Happy Valley Park is one of the best family parks in West Bengal. You can visit here with your family and friends.
                        All kind of amazement and fun you can get here.
                    </p>
                    <img
                        src={aboutImg}
                        alt="Park Overview"
                        className="w-full rounded-2xl shadow-xl mb-6"
                    />
                    <p className="mb-6">
                        Happy Valley Park presents to you the state-of-the-art theatre that takes you on a thrilling journey engaging all yours senses
                        in a way that you have never imagined. Synchronized spectrum of visual effects, sophisticated motion ride system,
                        special live environmental effects and high end surround sound systems generate a highly realistic experience.
                        Immerse yourself in the movie magic instead of just watching them!
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Vision</h3>
                    <p>
                        To provide safe, hygienic, and world-class entertainment that creates lifelong memories for families and friends.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
