import React from 'react';
import ScrollReveal from '../components/common/ScrollReveal';

const PrivacyPolicy = () => {
    return (
        <div className="bg-gray-50 pt-40 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-wonderla-red to-pink-600">Policy</span>
                        </h1>
                    </div>
                </ScrollReveal>

                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 space-y-8">
                    <ScrollReveal>
                        <section>
                            <p className="text-gray-700 leading-relaxed">
                                Our team at Happy Valley Park takes your privacy seriously. We committed to preserving your privacy and safeguarding any information that you submit. We endeavour to comply with relevant data protection legislation.
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Collection of Personal Information</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We regularly collect and use personal data about consumers who visit our attractions or browse our websites. There are areas of this site that require personal information to complete their functions, and may not be available to those choosing not to reveal the information requested. Personal data is any information that can be used to identify you as an individual. Your response to these inquiries is strictly voluntary. The protection of personal data is very important to us and we understand our responsibilities to handle your personal data with care, to keep it secure and to comply with legal requirements.
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Personal Information Do We Collect?</h2>
                            <p className="text-gray-700 leading-relaxed">
                                When registering on our website, or applying for a service or calling us you may be asked to provide your full name, email address, phone number, company name or what sort of content you would like to hear about or how you would like to be contacted. We ask for this information to improve your experience and deliver content that is relevant to you.
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclosure to Third Parties</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We share your information with other companies in our group and to third parties who may from time to time need to have access to your personal data. This is done only to alert you about new products and services to improve your competitive edge. If you receive unwanted marketing materials from any of our Business Partners, kindly let them know that you wish to be removed from their contact list.
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Cookies</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Cookies are small files that the site places on your hard drive for identification purposes. These files are used for site registration and customization for the next time that you visit us. You should note that cookies cannot read data off your hard drive.
                            </p>

                            <h3 className="text-lg font-bold text-gray-900 mb-3">We use cookies to:</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                                <li>Provide access to certain parts of our websites.</li>
                                <li>Keep track of selections that you make when using some of our website tools</li>
                                <li>Understand and save customer's preferences for future visits</li>
                                <li>Keep track of advertisements and related performance</li>
                            </ul>

                            <p className="text-gray-700 leading-relaxed">
                                You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. But if you turn cookies off, some of the features that make your site experience more competent may not function properly and some account management features may now work.
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We will make changes to this Policy from time to time to keep it up to date or to comply with legal requirements or changes in the way we operate our business. We will make sure that you are aware of any significant changes. We encourage you to regularly check back and review this policy so that you will always know what information we collect, how we use it, and who we share it with.
                            </p>
                        </section>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
