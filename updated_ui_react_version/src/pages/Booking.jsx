import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, CreditCard, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Booking = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [date, setDate] = useState('');
    const [tickets, setTickets] = useState({
        adult: 0,
        child: 0,
        senior: 0
    });
    const [loading, setLoading] = useState(false);

    const prices = {
        adult: 200,
        child: 150,
        senior: 150
    };

    const totalAmount = (tickets.adult * prices.adult) + (tickets.child * prices.child) + (tickets.senior * prices.senior);

    const handleIncrement = (type) => {
        setTickets(prev => ({ ...prev, [type]: prev[type] + 1 }));
    };

    const handleDecrement = (type) => {
        setTickets(prev => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
    };

    const handlePayment = async () => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            const userProfile = await api.get('/booking/profile');
            const { name, email, phone, id } = userProfile.data; // Assuming profile endpoint returns this

            // Create Order
            const orderRes = await api.post('/payment/create-order', {
                amount: totalAmount,
                currency: 'INR'
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderRes.data.amount,
                currency: "INR",
                name: "Happy Valley Park",
                description: "Ticket Booking",
                order_id: orderRes.data.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await api.post('/payment/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            user_id: id,
                            ticket_details: JSON.stringify(tickets),
                            visit_date: date,
                            amount: totalAmount
                        });

                        if (verifyRes.data.success) {
                            navigate('/dashboard');
                        } else {
                            alert('Payment verification failed');
                        }
                    } catch (error) {
                        console.error("Verification Error", error);
                        alert('Payment verification failed');
                    }
                },
                prefill: { name, email, contact: phone },
                theme: { color: "#F37254" }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Payment Error", error);
            if (error.response?.status === 401) navigate('/login');
            else alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-32">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Book Your <span className="text-wonderla-blue">Tickets</span></h1>
                    <p className="text-gray-500">Select your date and tickets to proceed</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

                    {/* Date Selection */}
                    <div className="p-6 md:p-8 border-b border-gray-100">
                        <label className="block text-sm font-bold uppercase tracking-wide text-gray-500 mb-3 flex items-center gap-2">
                            <Calendar size={16} /> Select Date
                        </label>
                        <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full text-lg font-bold p-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-wonderla-blue focus:bg-white outline-none transition-all"
                        />
                    </div>

                    {/* Ticket Selection */}
                    <div className="p-6 md:p-8 space-y-6">
                        <label className="block text-sm font-bold uppercase tracking-wide text-gray-500 mb-3 flex items-center gap-2">
                            <Users size={16} /> Select Guests
                        </label>

                        {/* Adult */}
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-200 transition-all">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Adult <span className="text-xs font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full ml-2">Above 4ft</span></h3>
                                <p className="text-wonderla-blue font-bold">₹{prices.adult}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleDecrement('adult')} className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center font-bold text-gray-500 hover:text-wonderla-blue active:scale-90 transition-all text-xl">-</button>
                                <span className="w-6 text-center font-bold text-lg">{tickets.adult}</span>
                                <button onClick={() => handleIncrement('adult')} className="w-10 h-10 rounded-full bg-wonderla-blue text-white shadow flex items-center justify-center font-bold hover:bg-blue-500 active:scale-90 transition-all text-xl">+</button>
                            </div>
                        </div>

                        {/* Child */}
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-200 transition-all">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Child <span className="text-xs font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full ml-2">Below 4ft</span></h3>
                                <p className="text-wonderla-blue font-bold">₹{prices.child}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleDecrement('child')} className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center font-bold text-gray-500 hover:text-wonderla-blue active:scale-90 transition-all text-xl">-</button>
                                <span className="w-6 text-center font-bold text-lg">{tickets.child}</span>
                                <button onClick={() => handleIncrement('child')} className="w-10 h-10 rounded-full bg-wonderla-blue text-white shadow flex items-center justify-center font-bold hover:bg-blue-500 active:scale-90 transition-all text-xl">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Mobile Bottom Bar */}
            <AnimatePresence>
                {totalAmount > 0 && date && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-40"
                    >
                        <div className="max-w-3xl mx-auto flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Payable</p>
                                <p className="text-2xl font-black text-gray-900">₹{totalAmount}</p>
                            </div>
                            <button
                                onClick={handlePayment}
                                disabled={loading}
                                className="bg-gradient-to-r from-wonderla-yellow to-orange-500 text-white font-black px-8 py-3 rounded-full text-lg shadow-lg shadow-orange-500/30 flex items-center gap-2 active:scale-95 transition-transform"
                            >
                                {loading ? 'Processing...' : (
                                    <>
                                        PAY NOW <ChevronRight size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Booking;
