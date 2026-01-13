import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import entryTicketImg from '../../assets/images/entry_ticket.png';
import dryParkImg from '../../assets/images/dry_park.png';
import waterParkImg from '../../assets/images/water_park.png';
import comboParkImg from '../../assets/images/combo_park.png';

const packages = [
    {
        id: 1,
        name: "Entry Ticket",
        desc: "PARK ENTRY ONLY",
        image: entryTicketImg,
        color: "from-blue-500 to-blue-700",
        price: "₹300"
    },
    {
        id: 2,
        name: "Dry Park",
        desc: "ALL DRY RIDES",
        image: dryParkImg,
        color: "from-orange-500 to-red-600",
        price: "₹600"
    },
    {
        id: 3,
        name: "Water Park",
        desc: "FULL WATER ACCESS",
        image: waterParkImg,
        color: "from-cyan-400 to-blue-500",
        price: "₹700"
    },
    {
        id: 4,
        name: "Dry + Water",
        desc: "COMPLETE COMBO",
        image: comboParkImg,
        color: "from-purple-500 to-pink-600",
        price: "₹1000"
    }
];

const TicketPackages = () => {
    return (
        <div className="relative -mt-32 z-20 px-4 mb-20 pointer-events-none">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto">
                    {packages.map((pkg, idx) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br ${pkg.color} cursor-pointer group`}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={pkg.image}
                                    alt={pkg.name}
                                    className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                                />
                            </div>

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-80`}></div>

                            <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px] p-6">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-1">{pkg.name}</h3>
                                    <p className="text-white/80 text-xs font-medium uppercase tracking-wider">{pkg.desc}</p>
                                </div>
                                <div className="mt-4">
                                    <span className="text-white font-bold text-lg">{pkg.price}</span>
                                </div>
                            </div>

                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TicketPackages;
