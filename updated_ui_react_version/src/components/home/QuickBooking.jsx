import React, { useState } from 'react';
import { Calendar, Users } from 'lucide-react';

const QuickBooking = () => {
    const [date, setDate] = useState('');

    return (
        <div className="relative -mt-24 z-20 px-4 mb-20">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-end ring-1 ring-gray-100">

                <div className="flex-1 w-full relative">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Select Date</label>
                    <div className="relative w-full">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-wonderla-blue pointer-events-none" size={20} />
                        <input
                            type="date"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wonderla-blue focus:border-transparent font-medium transition-shadow hover:border-gray-300"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 w-full relative">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Guests</label>
                    <div className="relative w-full">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-wonderla-blue pointer-events-none" size={20} />
                        <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wonderla-blue focus:border-transparent font-medium appearance-none transition-shadow hover:border-gray-300 cursor-pointer">
                            <option>1 Guest</option>
                            <option>2 Guests</option>
                            <option>3 Guests</option>
                            <option>4+ Guests</option>
                        </select>
                    </div>
                </div>

                <div className="w-full md:w-auto">
                    <button className="w-full bg-wonderla-blue text-white font-bold text-lg px-8 py-3 rounded-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200 active:scale-95">
                        CHECK AVAILABILITY
                    </button>
                </div>

            </div>
        </div>
    );
};

export default QuickBooking;
