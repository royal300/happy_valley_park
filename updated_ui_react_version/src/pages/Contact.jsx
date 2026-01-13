import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-40 pb-16 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-12">Contact <span className="text-wonderla-blue">Us</span></h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-wonderla-yellow w-8 h-8" />
                                <div>
                                    <h4 className="font-bold text-gray-900">Address</h4>
                                    <p className="text-gray-500">Happy Valley Amusement Park, Manjarun, India - 575001</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="text-wonderla-blue w-8 h-8" />
                                <div>
                                    <h4 className="font-bold text-gray-900">Phone</h4>
                                    <p className="text-gray-500">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="text-wonderla-red w-8 h-8" />
                                <div>
                                    <h4 className="font-bold text-gray-900">Email</h4>
                                    <p className="text-gray-500">support@happyvalley.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="bg-gray-200 rounded-2xl overflow-hidden h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5964726279!2d74.832267!3d12.868078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUyJzA1LjEiTiA3NMKwNDknNTYuMiJF!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
