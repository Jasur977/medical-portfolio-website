import React from 'react';
import { useTranslation } from 'react-i18next';
import clinicBg from '../assets/clinic_bg.jpg';
import doctorProfileImg from '../assets/doctor_profile.jpg';

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
        <div 
            id="home"
            className="relative bg-cover bg-center bg-no-repeat overflow-hidden text-white scroll-mt-24"
            style={{ backgroundImage: `url(${clinicBg})` }}
        >
            {/* Multi-layered dark gradient & backdrop-blur overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-slate-950/98 backdrop-blur-[1.5px]"></div>

            {/* Ambient medical glow orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

            {/* Hero Section Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-32 lg:flex lg:items-center lg:gap-x-12 lg:px-8">
                
                {/* Left Column: Text & Clinical Identity */}
                <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-lg backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        {t('platform_badge')}
                    </div>
                    
                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl drop-shadow-md">
                        {profile?.name || "Dr. Elbek Mamatkulov"}
                    </h1>
                    
                    <p className="mt-3 text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">
                        {profile?.credentials || "Pediatric & Adult Endocrinologist, PhD Researcher"}
                    </p>
                    
                    <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300 max-w-xl">
                        {t('hero_desc')}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-3.5">
                        <a 
                            href="#calculators" 
                            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center gap-2 cursor-pointer border border-blue-400/30 hover:scale-[1.02]"
                        >
                            <svg className="w-4 h-4 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            {t('btn_calculators')}
                        </a>
                        <a 
                            href="#for-physicians" 
                            className="rounded-xl bg-slate-900/90 hover:bg-slate-800/90 text-white px-5 py-3 text-sm font-bold shadow-md transition flex items-center gap-2 cursor-pointer border border-slate-700/80 backdrop-blur-sm hover:border-slate-600"
                        >
                            🩺 {t('nav_for_physicians')}
                        </a>
                        <a 
                            href="#for-patients" 
                            className="rounded-xl bg-white/10 hover:bg-white/15 text-white px-5 py-3 text-sm font-bold shadow-md transition flex items-center gap-2 cursor-pointer border border-white/20 backdrop-blur-sm"
                        >
                            👨‍👩‍👧 {t('nav_for_patients')}
                        </a>
                    </div>

                    {/* Metric Highlights */}
                    <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-6">
                        <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 backdrop-blur-sm">
                            <span className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">50</span>
                            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{t('stat_clinical_tools')}</span>
                        </div>
                        <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 backdrop-blur-sm">
                            <span className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">7</span>
                            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{t('stat_specialty_modules')}</span>
                        </div>
                        <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 backdrop-blur-sm">
                            <span className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">3</span>
                            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{t('stat_languages')}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Doctor Portrait with Clinic Aura */}
                <div className="mt-14 sm:mt-20 lg:mt-0 lg:flex-shrink-0 lg:flex-grow flex justify-center">
                    <div className="relative w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px]">
                        {/* Radiant ambient glow */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/40 via-cyan-400/30 to-indigo-600/40 blur-2xl animate-pulse"></div>
                        
                        {/* Glowing Ring Frame */}
                        <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-tr from-blue-500/50 via-cyan-400/40 to-indigo-500/50 shadow-2xl shadow-blue-500/30 border border-white/10">
                            <img
                                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-slate-950 shadow-2xl"
                                src={doctorProfileImg}
                                alt={profile?.name || "Dr. Elbek Mamatkulov"}
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                                }}
                            />
                        </div>

                        {/* Floating Status Pill */}
                        <div className="absolute -bottom-3 sm:bottom-2 left-1/2 -translate-x-1/2 bg-slate-950/90 backdrop-blur-xl border border-cyan-500/40 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2.5 whitespace-nowrap z-20">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                            </span>
                            <span className="text-xs font-bold text-white tracking-wide">
                                NCMC • Bolalar Milliy Tibbiyot Markazi
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Info Bar - Glassmorphism Dock */}
            <div className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl py-8 shadow-2xl">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        
                        {/* Location */}
                        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex flex-col items-center text-center hover:border-blue-500/40 transition">
                            <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-400/30 text-cyan-300 flex items-center justify-center mb-3 shadow-inner">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            </div>
                            <h3 className="text-base font-bold text-white">{t('location')}</h3>
                            <p className="mt-1.5 text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                                {profile?.clinicLocation?.split(',').join(',\n') || "Bolalar milliy tibbiyot markazi (NCMC)\nTashkent, Uzbekistan"}
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex flex-col items-center text-center hover:border-blue-500/40 transition">
                            <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-400/30 text-cyan-300 flex items-center justify-center mb-3 shadow-inner">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                            <h3 className="text-base font-bold text-white">{t('contact')}</h3>
                            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                                {contactInfo.phone && <span className="block font-medium">{contactInfo.phone}</span>}
                                {contactInfo.email && <span className="block text-slate-400">{contactInfo.email}</span>}
                            </p>
                        </div>

                        {/* Specialty */}
                        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex flex-col items-center text-center hover:border-blue-500/40 transition sm:col-span-2 lg:col-span-1">
                            <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-400/30 text-cyan-300 flex items-center justify-center mb-3 shadow-inner">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <h3 className="text-base font-bold text-white">{t('specialty')}</h3>
                            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                                <span className="block font-medium">{t('pediatric_endocrinology')}</span>
                                <span className="block text-slate-400">{t('medical_education_sub')}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}