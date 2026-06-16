import React from 'react';
import { useTranslation } from 'react-i18next';
import heroImage from '../assets/hero.png';

export default function LandingPage({ profile }) {
    const { t } = useTranslation();

    const parseContact = (contactStr) => {
        if (!contactStr) return { email: '', phone: '' };
        const parts = contactStr.split(' | ');
        return {
            email: parts.find(p => p.includes('@')) || 'Contact us',
            phone: parts.find(p => p.includes('+') || p.match(/\d/)) || ''
        };
    };

    const contactInfo = parseContact(profile?.contactDetails);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20 pt-14">
                <div className="mx-auto max-w-7xl px-6 py-20 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
                    
                    {/* Left Column: Text Content */}
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                        <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            {profile?.name || "Doctor Name"}
                        </h1>
                        <p className="mt-4 text-xl leading-8 text-blue-600 font-semibold">
                            {profile?.credentials || "Pediatric Endocrinologist"}
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl">
                            Specializing in comprehensive endocrine care for children. Committed to providing advanced medical diagnostics, personalized treatment plans, and continuous patient education.
                        </p>
                        
                        <div className="mt-10 flex items-center gap-x-6">
                            <a 
                                href="#contact" 
                                className="rounded-md bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                {t('book_appointment')}
                            </a>
                            <a href="#clinical-cases" className="text-sm font-semibold leading-6 text-gray-900">
                                {t('view_clinical_cases')} <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
                        <div className="relative mx-auto w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]">
                            <div className="absolute inset-0 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
                            <img
                                className="relative z-10 w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
                                src={heroImage || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"} 
                                alt="Doctor portrait"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Info Bar */}
            <div className="bg-blue-900 py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 text-white">
                        <div className="flex flex-col items-center text-center">
                            <svg className="w-8 h-8 mb-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            <h3 className="text-lg font-semibold">{t('location')}</h3>
                            <p className="mt-2 text-sm text-blue-200 whitespace-pre-line">{profile?.clinicLocation?.split(',').join(',\n') || "Clinic Location"}</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <svg className="w-8 h-8 mb-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            <h3 className="text-lg font-semibold">{t('contact')}</h3>
                            <p className="mt-2 text-sm text-blue-200">{contactInfo.phone}<br/>{contactInfo.email}</p>
                        </div>
                        <div className="flex flex-col items-center text-center sm:col-span-2 lg:col-span-1">
                            <svg className="w-8 h-8 mb-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            <h3 className="text-lg font-semibold">{t('specialty')}</h3>
                            <p className="mt-2 text-sm text-blue-200">Pediatric Endocrinology<br/>Medical Education</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
