import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Ticket, Droplets, Zap, DoorOpen } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import waterParkImg from '../../assets/images/water_park.png';
import dryParkImg from '../../assets/images/dry_park.png';
import comboParkImg from '../../assets/images/combo_park.png';
import entryTicketImg from '../../assets/images/entry_ticket.png';
import naBadge from '../../assets/images/NA.png';

const defaultPackages = [
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
        isAvailable: true,
        link: "https://booking.gohappyvalley.com/client/dashboard"
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
        isAvailable: true,
        link: "https://booking.gohappyvalley.com/client/dashboard"
    },
    {
        id: 3,
        name: "Dry Park All Rides",
        desc: "ALL DRY RIDES COMBO",
        image: dryParkImg,
        color: "from-orange-500 to-red-600",
        price: "₹200",
        icon: Zap,
        isAvailable: true,
        link: "https://booking.gohappyvalley.com/client/dashboard"
    },
    {
        id: 4,
        name: "Entry Fees",
        desc: "PARK ENTRY ONLY",
        image: entryTicketImg,
        color: "from-blue-500 to-blue-700",
        price: "₹40",
        icon: DoorOpen,
        isAvailable: true,
        link: "https://booking.gohappyvalley.com/client/book"
    }
];

// Icon helper
const getIconForPackage = (pkg) => {
    const name = (pkg.name || '').toLowerCase();
    if (name.includes('water') && !name.includes('combo') && !name.includes('dry')) return Droplets;
    if (name.includes('combo') || (name.includes('water') && name.includes('dry'))) return Ticket;
    if (name.includes('dry')) return Zap;
    return DoorOpen;
};

// Image helper
const getFallbackImage = (pkg) => {
    const name = (pkg.name || '').toLowerCase();
    if (name.includes('water') && !name.includes('combo') && !name.includes('dry')) return waterParkImg;
    if (name.includes('combo') || (name.includes('water') && name.includes('dry'))) return comboParkImg;
    if (name.includes('dry')) return dryParkImg;
    return entryTicketImg;
};

const TicketPackages = () => {
    const [ticketPackages, setTicketPackages] = useState(defaultPackages);
    const [scrollOpacity, setScrollOpacity] = useState(0.4);

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY;
            // Map scroll 0-400 to opacity 0.4-0.95
            const newOpacity = Math.min(0.4 + (scroll / 400) * 0.55, 0.95);
            setScrollOpacity(newOpacity);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const apiUrl = '/backend/api/tickets.php';
                const response = await axios.get(apiUrl);
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const mappedPackages = response.data.map(pkg => ({
                        id: pkg.id,
                        name: pkg.name || '',
                        desc: pkg.description || '',  // DB uses 'description', component uses 'desc'
                        image: pkg.image || getFallbackImage(pkg),
                        color: pkg.color || 'from-blue-500 to-blue-700',
                        originalPrice: pkg.original_price || '',  // DB uses 'original_price'
                        discount: pkg.discount || '',
                        price: pkg.price || '',
                        icon: getIconForPackage(pkg),
                        featured: pkg.featured == 1,
                        isAvailable: pkg.is_available !== undefined ? (Number(pkg.is_available) === 1) : true,
                        link: (pkg.link && !pkg.link.includes('client/dashboard')) ? pkg.link : 'https://booking.gohappyvalley.com/client/dashboard',
                    }));
                    setTicketPackages(mappedPackages);
                }
            } catch (error) {
                console.log('Using default packages');
            }
        };
        fetchPackages();
    }, []);

    return (
        <div className="relative -mt-24 sm:-mt-28 z-30 px-4 mb-16 pointer-events-none">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pointer-events-auto">
                    {ticketPackages.map((pkg, idx) => {
                        const isAvailable = pkg.isAvailable !== false;
                        return (
                            <a
                                href={isAvailable ? pkg.link : "#"}
                                onClick={(e) => {
                                    if (!isAvailable) e.preventDefault();
                                }}
                                key={pkg.id}
                                className={!isAvailable ? "cursor-not-allowed block" : "block"}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={isAvailable ? { y: -10, scale: 1.02 } : {}}
                                    className={`relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br ${pkg.color} ${isAvailable ? 'cursor-pointer group' : 'cursor-not-allowed opacity-90'} h-full backdrop-blur-sm`}
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                    }}
                                >
                                    {/* Background Image with opacity */}
                                    <div className="absolute inset-0 z-0 text-white">
                                        <img
                                            src={pkg.image}
                                            alt={pkg.name}
                                            loading="lazy"
                                            className={`w-full h-full object-cover transition-opacity duration-300 ${isAvailable ? 'opacity-40 group-hover:opacity-60' : 'opacity-25 grayscale-[40%]'}`}
                                        />
                                    </div>

                                    {/* Gradient Overlay - Dynamic Opacity on Mobile */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${pkg.color}`}
                                        style={{
                                            opacity: typeof window !== 'undefined' && window.innerWidth < 768 ? scrollOpacity : 0.85
                                        }}
                                    ></div>

                                    {/* Featured / Not Available Badge */}
                                    {isAvailable && pkg.featured && (
                                        <div className="absolute top-3 right-3 z-20">
                                            <span className="bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full shadow-lg">
                                                POPULAR
                                            </span>
                                        </div>
                                    )}

                                    {!isAvailable && (
                                        <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 z-20 pointer-events-none transform rotate-12">
                                            <div className="p-0.5 sm:p-1 bg-white/95 backdrop-blur-md rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.4)] border-2 border-white">
                                                <img
                                                    src={naBadge}
                                                    alt="Not Available"
                                                    className="w-12 sm:w-14 md:w-16 h-auto object-contain block"
                                                />
                                            </div>
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
                                            {pkg.discount && isAvailable && (
                                                <div className="mb-2">
                                                    <span className="inline-block bg-red-500 text-white text-xs font-black px-2 py-1 rounded-md mr-2">
                                                        {pkg.discount}
                                                    </span>
                                                    {pkg.originalPrice && (
                                                        <span className="text-white/70 text-sm line-through font-semibold">
                                                            {pkg.originalPrice}
                                                        </span>
                                                    )}
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

                                        {/* Book Ticket Button / Not Available Button */}
                                        <div className="mt-4">
                                            {isAvailable ? (
                                                <div className={`w-full py-2 bg-white rounded-lg text-center font-bold text-sm uppercase tracking-wide group-hover:scale-105 transition-transform duration-300 ${pkg.color.includes('cyan') ? 'text-cyan-600' :
                                                    pkg.color.includes('purple') ? 'text-purple-600' :
                                                        pkg.color.includes('orange') ? 'text-orange-600' :
                                                            pkg.color.includes('green') ? 'text-green-600' :
                                                                'text-blue-600'
                                                    }`}>
                                                    Book Now
                                                </div>
                                            ) : (
                                                <div className="w-full py-2 bg-gray-200/90 text-gray-600 rounded-lg text-center font-bold text-sm uppercase tracking-wide cursor-not-allowed shadow-inner border border-gray-300">
                                                    Not Available
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Hover effect */}
                                    {isAvailable && (
                                        <>
                                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>

                                            {/* Shine effect on hover */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TicketPackages;
