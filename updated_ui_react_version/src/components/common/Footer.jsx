import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand & About */}
                    <div className="space-y-6">
                        <img src={logo} alt="Happy Valley" className="h-24 w-auto" />
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Experience the thrill of a lifetime at West Bengal's premier amusement park. Unforgettable memories await you and your family.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/happyvalleyparkbira" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full hover:bg-wonderla-yellow hover:text-black transition-all hover:scale-110">
                                <Facebook size={18} />
                            </a>
                            <a href="https://www.instagram.com/happyvalleypark/" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full hover:bg-wonderla-yellow hover:text-black transition-all hover:scale-110">
                                <Instagram size={18} />
                            </a>
                            <a href="https://www.youtube.com/@happyvalleypark/featured" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full hover:bg-wonderla-yellow hover:text-black transition-all hover:scale-110">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-wonderla-yellow transition-colors flex items-center gap-2 text-sm group">
                                    <ChevronRight size={14} className="text-gray-600 group-hover:text-wonderla-yellow transition-colors" />
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/attractions" className="text-gray-400 hover:text-wonderla-yellow transition-colors flex items-center gap-2 text-sm group">
                                    <ChevronRight size={14} className="text-gray-600 group-hover:text-wonderla-yellow transition-colors" />
                                    Attractions
                                </Link>
                            </li>
                            <li>
                                <Link to="/waterworld" className="text-gray-400 hover:text-wonderla-yellow transition-colors flex items-center gap-2 text-sm group">
                                    <ChevronRight size={14} className="text-gray-600 group-hover:text-wonderla-yellow transition-colors" />
                                    Water World
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Park Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Park Info</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/privacy-policy" className="text-gray-400 hover:text-wonderla-yellow transition-colors flex items-center gap-2 text-sm group">
                                    <ChevronRight size={14} className="text-gray-600 group-hover:text-wonderla-yellow transition-colors" />
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-400 hover:text-wonderla-yellow transition-colors flex items-center gap-2 text-sm group">
                                    <ChevronRight size={14} className="text-gray-600 group-hover:text-wonderla-yellow transition-colors" />
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <a href="https://google.com/maps/place/Happy+Valley+Park/@22.774218,88.59315,16z/data=!4m5!3m4!1s0x0:0x23a7e7a2ea394fc8!8m2!3d22.7742183!4d88.59315?hl=en-US" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-wonderla-yellow transition-colors flex items-center gap-2 text-sm group">
                                    <ChevronRight size={14} className="text-gray-600 group-hover:text-wonderla-yellow transition-colors" />
                                    Park Map
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
                        <div className="space-y-6 text-sm text-gray-400">
                            <div className="flex items-start gap-4 group">
                                <div className="bg-white/5 p-3 rounded-lg group-hover:bg-wonderla-yellow/20 transition-colors">
                                    <MapPin className="text-wonderla-yellow" size={20} />
                                </div>
                                <p className="leading-relaxed">Bira, Badar Road, Rautara,<br />Kol-743234, North 24 Pgs,<br />WB, India</p>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="bg-white/5 p-3 rounded-lg group-hover:bg-wonderla-yellow/20 transition-colors">
                                    <Phone className="text-wonderla-yellow" size={20} />
                                </div>
                                <p>+91 70296 09594</p>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="bg-white/5 p-3 rounded-lg group-hover:bg-wonderla-yellow/20 transition-colors">
                                    <Mail className="text-wonderla-yellow" size={20} />
                                </div>
                                <p>gohappyvalley94@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© 2026 Happy Valley Park. All rights reserved.</p>
                    <p>
                        by <a href="https://www.royal300.com" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-wonderla-yellow transition-colors">Royal300</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
