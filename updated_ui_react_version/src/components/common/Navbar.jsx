import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Ticket, User, ChevronRight, Home, Zap, Droplets, Info, Phone, Star, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [expandedMenu, setExpandedMenu] = useState(null);
    const location = useLocation();

    const toggleSubMenu = (name) => {
        setExpandedMenu(expandedMenu === name ? null : name);
    };

    // Check scroll position for glass effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        {
            name: 'Attractions',
            path: '/attractions',
            icon: Zap,
            subItems: [
                { name: 'Dry Park', path: '/attractions' },
                { name: 'Water Park', path: '/waterworld' }
            ]
        },
        { name: 'About', path: '/about', icon: Info },
        { name: 'Contact', path: '/contact', icon: Phone },
    ];

    const isHome = location.pathname === '/';
    const isTransparent = isHome && !scrolled;

    const navClasses = isTransparent
        ? 'bg-transparent py-4'
        : 'bg-white/95 backdrop-blur-md shadow-lg py-2 border-b border-gray-100';

    const textClasses = isTransparent
        ? 'text-white'
        : 'text-gray-900';

    const iconClasses = isTransparent
        ? 'hover:bg-white/10 text-white'
        : 'hover:bg-gray-100 text-gray-900';

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20 md:h-28">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center z-50">
                            <Link to="/">
                                <img src={logo} alt="Happy Valley" className="h-16 md:h-24 w-auto transition-transform hover:scale-105 drop-shadow-lg" />
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <div
                                    key={link.name}
                                    className="relative group"
                                    onMouseEnter={() => setHoveredLink(link.name)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                >
                                    <Link
                                        to={link.path}
                                        className={`relative flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 ${textClasses}`}
                                    >
                                        <link.icon size={16} className={isTransparent ? "text-wonderla-yellow" : "text-gray-600 group-hover:text-wonderla-yellow"} />
                                        <span className="relative z-10">{link.name}</span>
                                        {link.subItems && <ChevronDown size={14} className="mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity" />}

                                        {/* Animated Underline */}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wonderla-yellow group-hover:w-full transition-all duration-300 ease-out"></span>
                                    </Link>

                                    {/* Dropdown / Mega Menu */}
                                    {link.subItems && (
                                        <div className={`absolute top-full left-1/2 transform -translate-x-1/2 pt-4 w-56 transition-all duration-300 origin-top z-50
                                            ${hoveredLink === link.name ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                                            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-4 border-wonderla-yellow">
                                                <div className="py-2">
                                                    {link.subItems.map((sub, idx) => (
                                                        <Link
                                                            key={idx}
                                                            to={sub.path}
                                                            className="block px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-yellow-50 hover:text-wonderla-yellow transition-colors"
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="flex items-center gap-4 ml-4">
                                <Link
                                    to="/dashboard"
                                    className={`p-2 rounded-full transition-colors ${iconClasses}`}
                                >
                                    <User size={20} />
                                </Link>
                                <Link
                                    to="/book"
                                    className="bg-wonderla-yellow text-black font-extrabold px-6 py-2.5 rounded-full hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-500/50 flex items-center gap-2 text-sm"
                                >
                                    <Ticket size={18} />
                                    BOOK TICKETS
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center z-50">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`p-2 rounded-full transition-colors ${!isTransparent || isOpen ? 'text-gray-900 bg-gray-100' : 'text-white bg-black/20 backdrop-blur-sm'
                                    }`}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar (Drawer) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 md:hidden shadow-2xl overflow-y-auto"
                        >
                            <div className="p-6 pt-24 flex flex-col h-full">
                                <nav className="space-y-2 flex-grow">
                                    {navLinks.map((link) => (
                                        <div key={link.name}>
                                            {link.subItems ? (
                                                <div className="space-y-1">
                                                    <button
                                                        onClick={() => toggleSubMenu(link.name)}
                                                        className={`w-full flex items-center justify-between p-4 rounded-xl text-lg font-bold transition-all duration-300 ${expandedMenu === link.name
                                                            ? 'bg-wonderla-yellow/10 text-wonderla-yellow'
                                                            : 'text-gray-900 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <link.icon size={20} className={expandedMenu === link.name ? "text-wonderla-yellow" : "text-gray-500"} />
                                                            {link.name}
                                                        </div>
                                                        <ChevronDown
                                                            size={18}
                                                            className={`text-gray-400 transition-transform duration-300 ${expandedMenu === link.name ? 'rotate-180 text-wonderla-yellow' : ''}`}
                                                        />
                                                    </button>

                                                    <div
                                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMenu === link.name ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                                            }`}
                                                    >
                                                        <div className="pl-4 space-y-1 pt-1">
                                                            {link.subItems.map((sub, idx) => (
                                                                <Link
                                                                    key={idx}
                                                                    to={sub.path}
                                                                    className="flex items-center justify-between p-3 pl-12 rounded-xl text-base font-semibold text-gray-600 hover:bg-yellow-50 hover:text-wonderla-yellow transition-colors"
                                                                    onClick={() => setIsOpen(false)}
                                                                >
                                                                    {sub.name}
                                                                    <ChevronRight size={16} className="text-gray-300" />
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link
                                                    to={link.path}
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center justify-between p-4 rounded-xl text-lg font-bold text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <link.icon size={20} className="text-gray-500" />
                                                        {link.name}
                                                    </div>
                                                    <ChevronRight size={18} className="text-gray-400" />
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </nav>

                                <div className="mt-8 space-y-4">
                                    <Link
                                        to="/book"
                                        className="w-full bg-wonderla-yellow text-black font-extrabold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg active:scale-95 transition-transform"
                                    >
                                        <Ticket size={20} />
                                        BOOK NOW
                                    </Link>

                                    <Link
                                        to="/dashboard"
                                        className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-lg active:scale-95 transition-transform"
                                    >
                                        <User size={20} />
                                        MY ACCOUNT
                                    </Link>
                                </div>

                                <div className="mt-8 text-center text-xs text-gray-400">
                                    <p>© {new Date().getFullYear()} Happy Valley Park</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
