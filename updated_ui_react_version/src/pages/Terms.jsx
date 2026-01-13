import React from 'react';
import ScrollReveal from '../components/common/ScrollReveal';

const Terms = () => {
    return (
        <div className="pt-24 pb-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Terms & <span className="text-wonderla-blue">Conditions</span></h1>

                    <div className="prose prose-lg mx-auto text-gray-600 space-y-8">
                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">General Rules</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Please carefully read these Terms and Conditions before booking.</li>
                                <li>Maximum 100 tickets can be booked online at a time. Tickets can be booked in advance for maximum of 7 days.</li>
                                <li>Children above 3 years with height less than 4ft 6 inches are considered under Child Category.</li>
                                <li>Outside food and beverages are not allowed into the park.</li>
                                <li>Park personnel may inspect all bags, carrying containers, and cases.</li>
                                <li>Park timing: <strong>10 AM to 7 PM</strong>.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Payment & Cancellation</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Cancellation, extension, or refunds are not available under any circumstances.</li>
                                <li>All sales of admissions and ticketing are final.</li>
                                <li>In case the person booking is not the Guest, identity proof must be produced.</li>
                            </ul>
                        </section>

                        <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Bank Details</h3>
                            <p className="font-mono text-sm">
                                <strong>Bank Name:</strong> Indian Bank<br />
                                <strong>A/C No:</strong> 50477734436<br />
                                <strong>IFSC:</strong> IDIB000L532
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Park Events</h3>
                            <p>Booking is available for:</p>
                            <ul className="list-disc pl-5">
                                <li>Corporate Events</li>
                                <li>Conference</li>
                                <li>School Excursion</li>
                                <li>Marriage Ceremony</li>
                            </ul>
                        </section>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default Terms;
