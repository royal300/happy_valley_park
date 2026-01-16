import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Ticket, Droplets, Zap, DoorOpen } from 'lucide-react';
import waterParkImg from '../../assets/images/water_park.png';
import dryParkImg from '../../assets/images/dry_park.png';
import comboParkImg from '../../assets/images/combo_park.png';
import entryTicketImg from '../../assets/images/entry_ticket.png';

const packages = [
    {
        id: 1,
        name: "Water World Ticket",
        desc: "FULL WATER ACCESS",
        image: waterParkImg,
        color: "from-cyan-500 to-blue-600",
        originalPrice: "₹500",
        discount: "20% OFF",
        price: "₹400",
        icon: Droplets,
        link: "#"
    },
    {
        id: 2,
        name: "Water + Dry Park Combo",
        desc: "COMPLETE COMBO",
        image: comboParkImg,
        color: "from-purple-500 to-pink-600",
        price: "₹600",
        icon: Ticket,
        featured: true,
        link: "#"
    },
    {
        id: 3,
        name: "Dry Park All Rides",
        desc: "ALL DRY RIDES COMBO",
        image: dryParkImg,
        color: "from-orange-500 to-red-600",
        price: "₹200",
        icon: Zap,
        link: "#"
    },
    {
        id: 4,
        name: "Entry Fees",
        desc: "PARK ENTRY ONLY",
        image: entryTicketImg,
        color: "from-blue-500 to-blue-700",
        price: "₹40",
        icon: DoorOpen,
        link: "#"
    }
];

const TicketPackages = () => {
    return (
        <div className="relative -mt-28 z-20 px-4 mb-16 pointer-events-none">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pointer-events-auto">
                    {packages.map((pkg, idx) => (
                        <Link
                            to={pkg.link}
                            key={pkg.id}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className={`relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br ${pkg.color} cursor-pointer group h-full`}
                            >
                                {/* Background Image with increased opacity */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.name}
                                        className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-300"
                                    />
                                </div>

                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-75`}></div>

                                {/* Featured Badge */}
                                {pkg.featured && (
                                    <div className="absolute top-3 right-3 z-20">
                                        <span className="bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full shadow-lg">
                                            POPULAR
                                        </span>
                                    </div>
                                )}

                                <div className="relative z-10 flex flex-col h-full justify-between min-h-[180px] sm:min-h-[200px] p-5 sm:p-6">
                                    <div>
                                        {/* Icon */}
                                        <div className="mb-3">
                                            <pkg.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white/90" strokeWidth={2.5} />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight mb-1">
                                            {pkg.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-white/90 text-xs font-bold uppercase tracking-wider mb-3">
                                            {pkg.desc}
                                        </p>
                                    </div>

                                    {/* Pricing */}
                                    <div className="mt-auto">
                                        {pkg.discount && (
                                            <div className="mb-2">
                                                <span className="inline-block bg-red-500 text-white text-xs font-black px-2 py-1 rounded-md mr-2">
                                                    {pkg.discount}
                                                </span>
                                                <span className="text-white/70 text-sm line-through font-semibold">
                                                    {pkg.originalPrice}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-white font-black text-2xl sm:text-3xl">
                                                {pkg.price}
                                            </span>
                                            <span className="text-white/80 text-xs font-semibold uppercase">
                                                per person
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>

                                {/* Shine effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TicketPackages;
