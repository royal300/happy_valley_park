import React from 'react';
import ScrollReveal from '../components/common/ScrollReveal';

const Terms = () => {
    return (
        <div className="bg-gray-50 pt-40 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                            Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-wonderla-red to-pink-600">Conditions</span>
                        </h1>
                    </div>
                </ScrollReveal>

                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 space-y-8">
                    <ScrollReveal>
                        <section className="border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Please read these Terms and Conditions carefully. These Terms and Conditions contain important provisions, restrictions, disclaimers, and obligations that apply when you purchase or receive a ticket, enter, access, or use any facility within the park.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                By purchasing a ticket, entering, accessing, or using the park, you acknowledge that you have read, understood, accepted, and agreed to be bound by these Terms and Conditions.
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section className="border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. General Rules & Regulations</h2>
                            <ul className="list-decimal pl-6 space-y-3 text-gray-700">
                                <li>If the person making the booking is not the guest visiting the park, a valid government-issued photo ID of the booking holder must be produced during ticket verification.</li>
                                <li>All guests are expected to behave in a respectful, responsible, and family-friendly manner at all times.</li>
                                <li>Outside food and beverages are strictly prohibited inside the park unless specifically permitted by park management under special circumstances.</li>
                                <li>Park personnel reserve the right to inspect bags, backpacks, containers, packages, and personal belongings before entry.</li>
                                <li>Vehicles must be parked only in designated parking areas. The park shall not be responsible for any loss or damage to vehicles or personal belongings left inside vehicles.</li>
                                <li>Safety is a shared responsibility. All guests must follow safety instructions, ride restrictions, warning signs, announcements, and directions provided by park staff.</li>
                                <li>Guests who fail to comply with park rules, safety regulations, or staff instructions may be denied entry, removed from the park without refund, and may lose future admission privileges.</li>
                                <li className="text-lg font-bold text-red-600">
                                    Consumption, possession, or distribution of alcohol inside the park premises, as well as entering the park under the influence of alcohol, is strictly prohibited.
                                </li>
                                <li>The park reserves the right to refuse admission or remove any person whose behavior is considered unsafe, disruptive, offensive, or harmful to other guests.</li>
                            </ul>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section className="border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Water Park Rules</h2>
                            <ul className="list-decimal pl-6 space-y-3 text-gray-700">
                                <li>Only synthetic swimwear/clothing is permitted on water rides and attractions.</li>
                                <li>Cotton clothes, denim, sarees, formal wear, and other non-synthetic garments are not allowed in water attractions.</li>
                                <li>Outside food and beverages are strictly prohibited inside the Water Park area.</li>
                                <li>Guests must follow all ride-specific height, weight, and safety requirements.</li>
                                <li>Running, pushing, diving in restricted areas, or any unsafe activity is strictly prohibited.</li>
                            </ul>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section className="border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Dry Park Rules</h2>
                            <ul className="list-decimal pl-6 space-y-3 text-gray-700">
                                <li>Outside food and beverages are not allowed inside the Dry Park area.</li>
                                <li>For Dry Park Combo Tickets, each ride may be accessed only once per guest unless otherwise specified by park management.</li>
                                <li>Guests must comply with all ride restrictions, height requirements, and operator instructions.</li>
                            </ul>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section className="border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Picnic Spot Rules</h2>
                            <ul className="list-decimal pl-6 space-y-3 text-gray-700">
                                <li>Guests must maintain a peaceful environment and avoid creating disturbances, excessive noise, or inconvenience to other picnic groups.</li>
                                <li>Outside cooked food may be permitted only as per the package booked with the park.</li>
                                <li>Outside cooking equipment, including stoves, burners, pans, kadhais, utensils, gas cylinders, and similar materials, is strictly prohibited.</li>
                                <li>Cooking equipment and picnic-related facilities, where available, must be obtained from the park authority.</li>
                                <li>Any damage to park property caused by guests may result in additional charges.</li>
                            </ul>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section className="border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Ticket Booking Policy</h2>
                            <ul className="list-decimal pl-6 space-y-3 text-gray-700">
                                <li>All tickets must be booked at least one (1) day prior to the date of visit.</li>
                                <li>Same-day ticket bookings are not permitted.</li>
                                <li>Children aged three (3) years and above must possess a valid admission ticket.</li>
                                <li>All promotional offers, discounts, and special pricing are applicable only to online ticket bookings unless otherwise stated.</li>
                                <li>Discounts and promotional offers are not available for offline ticket purchases.</li>
                                <li>Tickets are valid only for the selected visit date and are non-transferable.</li>
                            </ul>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section className="border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payment Policy</h2>
                            <ul className="list-decimal pl-6 space-y-3 text-gray-700">
                                <li>
                                    To prevent misuse of payment methods, guests using a credit card that does not belong to them may be requested to provide:
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>A copy of the credit card (with sensitive information masked), and</li>
                                        <li>Authorization from the cardholder, if required.</li>
                                    </ul>
                                </li>
                                <li>The park reserves the right to verify payment information before confirming any booking.</li>
                                <li>Any booking found to be fraudulent or unauthorized may be cancelled without notice.</li>
                            </ul>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section className="border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cancellation, Refund & Modification Policy</h2>
                            <ul className="list-decimal pl-6 space-y-3 text-gray-700">
                                <li>All ticket sales are final.</li>
                                <li>No cancellation, refund, rescheduling, extension, transfer, exchange, or modification of tickets shall be permitted under any circumstances.</li>
                                <li>
                                    No refunds shall be provided for:
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>Late arrivals</li>
                                        <li>No-shows</li>
                                        <li>Weather conditions</li>
                                        <li>Partial use of attractions</li>
                                        <li>Guest misconduct</li>
                                        <li>Closure of specific rides for maintenance or safety reasons</li>
                                    </ul>
                                </li>
                                <li>Special events, group bookings, private events, and promotional tickets are also non-refundable and non-transferable.</li>
                            </ul>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section className="border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Park Timings</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Operating Hours:</strong> 10:00 AM to 7:00 PM
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                The park reserves the right to modify operating hours, close attractions, or restrict access due to maintenance, weather conditions, safety requirements, special events, or operational reasons without prior notice.
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section className="border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Liability Disclaimer</h2>
                            <ul className="list-decimal pl-6 space-y-3 text-gray-700">
                                <li>Guests enter and use the park at their own risk.</li>
                                <li>The park shall not be liable for any loss, theft, damage, injury, accident, or personal inconvenience except where required by applicable law.</li>
                                <li>Guests are responsible for safeguarding their personal belongings at all times.</li>
                                <li>The park reserves the right to temporarily close rides, attractions, or facilities for operational, maintenance, weather-related, or safety reasons.</li>
                            </ul>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section className="border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Photography & Media</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                By entering the park, guests consent to being photographed, filmed, or recorded for promotional, advertising, marketing, or security purposes without compensation.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                The park reserves the right to use such photographs, videos, and recordings in any media format.
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                For any queries, assistance, or support:
                            </p>
                            <p className="text-gray-700 leading-relaxed font-bold">
                                Phone: +91 70296 09594
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="pt-6 border-t border-gray-200 text-center">
                            <p className="text-gray-700 font-medium italic">
                                By purchasing a ticket and entering the park premises, you acknowledge and agree to abide by all the Terms & Conditions stated above.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default Terms;
