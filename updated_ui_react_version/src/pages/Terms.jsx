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
                        <section>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Please carefully read these Terms and Conditions. These Terms and Conditions contain terms, provisions, restrictions, disclaimers to which you are subject when you purchase or receive a ticket or are admitted to or enter or use, the park.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Each time you purchase a ticket or are admitted to or enter or use, the park, you thereby acknowledge and agree that you have read, understood, accepted and agreed to be bound by these Terms and Conditions.
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Policy</h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Maximum 100 tickets can be booked online at a time.</li>
                                <li>Tickets can be booked in advance for maximum of 7 days.</li>
                                <li>Children who are above 3 year with height less than 4ft 6 inches would only be considered under Child Category.</li>
                                <li>For clarification call us at <strong>(+091) 92120-06464</strong></li>
                            </ul>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">General Rules</h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>In case the person booking is not the Guest, then the identity proof of the person booking has to be produced at the time of ticket checking.</li>
                                <li>All guests are expected to behave in a family-friendly manner.</li>
                                <li>Outside food and beverages are not allowed into the park. Exceptions may be made on case by case basis.</li>
                                <li>Park personnel may inspect all bags, carrying containers and cases.</li>
                                <li>Vehicles must park in designated parking spaces.</li>
                                <li>Please remember safety is a shared responsibility and all guests must exercise good judgment, act in a responsible manner and obey and abide by all written, posted and stated warnings, directions and instructions.</li>
                                <li>Guests that do not follow written, posted and stated warnings, directions and instructions may be asked to leave the park and may lose their right to future entry.</li>
                            </ul>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                In order to protect the possible abuse of credit cards guests who may be using credit cards other than their own are requested to carry a copy of their credit card duly signed by the credit card owner.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Cancellation/ extension/ refund etc are not available under any circumstances. All sales of admissions, ticketing to the park, including for special events or private or special parties, are final.
                            </p>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Our Bank Details</h3>
                                <div className="space-y-1 text-gray-700">
                                    <p><strong>Bank Name:</strong> Indian Bank</p>
                                    <p><strong>A/C No:</strong> 50477734436</p>
                                    <p><strong>IFSC code:</strong> IDIB000L532</p>
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Park Rules</h2>
                            <div className="space-y-4 text-gray-700">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Booking available for the following:</h3>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Corporate Events</li>
                                        <li>Conference</li>
                                        <li>School Excursion</li>
                                        <li>Marriage Ceremony</li>
                                    </ul>
                                </div>

                                <p><strong>Park timing:</strong> 10 AM to 7 PM</p>

                                <p className="text-red-600 font-bold">Drinking alcohol is strictly prohibited inside the park.</p>

                                <p>Parking is available for car, bike & bus.</p>
                            </div>
                        </section>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default Terms;
