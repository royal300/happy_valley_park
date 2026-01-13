import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Ticket, Droplets, Sun, Star } from 'lucide-react';

const packages = [
    {
        id: 1,
        name: "Entry Ticket",
        desc: "Park Entry Only",
        icon: <Ticket className="w-8 h-8 text-white" />,
        color: "from-blue-500 to-blue-700",
        price: "₹300"
    },
    {
        id: 2,
        name: "Dry Park",
        desc: "All Dry Rides",
        icon: <Sun className="w-8 h-8 text-white" />,
        color: "from-orange-500 to-red-600",
        price: "₹600"
    },
    {
        id: 3,
        name: "Water Park",
        desc: "Full Water Access",
        icon: <Droplets className="w-8 h-8 text-white" />,
        color: "from-cyan-400 to-blue-500",
        price: "₹700"
    },
    {
        id: 4,
        name: "Dry + Water",
        desc: "Complete Combo",
        icon: <Star className="w-8 h-8 text-white" />,
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
                            className={`relative overflow-hidden rounded-2xl p-6 shadow-2xl bg-gradient-to-br ${pkg.color} cursor-pointer group`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                {pkg.icon}
                            </div>

                            <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px]">
                                <div>
                                    <div className="bg-white/20 w-fit p-2 rounded-lg mb-4 backdrop-blur-sm">
                                        {pkg.icon}
                                    </div>
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
