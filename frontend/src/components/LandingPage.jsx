import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clinicBg from '../assets/clinic_bg.jpg';
import doctorProfileImg from '../assets/doctor_profile.jpg';

export default function LandingPage({ profile }) {
    const { t } = useTranslation();
    const [timelineTab, setTimelineTab] = useState('fellowships'); // 'fellowships' or 'career'

    const parseContact = (contactStr) => {
        if (!contactStr) return { email: 'elbekmamatkulov1990@gmail.com', phone: '+998 91 011 77 11' };
        const parts = contactStr.split(' | ');
        return {
            email: parts.find(p => p.includes('@')) || 'elbekmamatkulov1990@gmail.com',
            phone: '+998 91 011 77 11'
        };
    };

    const contactInfo = parseContact(profile?.contactDetails);

    // 12 Clinical Scope Items
    const clinicalScopes = [
        {
            num: "01",
            titleKey: "scope_1_title",
            descKey: "scope_1_desc",
            icon: (
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            tag: "Thyroid"
        },
        {
            num: "02",
            titleKey: "scope_2_title",
            descKey: "scope_2_desc",
            icon: (
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            tag: "Diabetes & CGM"
        },
        {
            num: "03",
            titleKey: "scope_3_title",
            descKey: "scope_3_desc",
            icon: (
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            tag: "Growth & GH"
        },
        {
            num: "04",
            titleKey: "scope_4_title",
            descKey: "scope_4_desc",
            icon: (
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            tag: "Puberty & DSD"
        },
        {
            num: "05",
            titleKey: "scope_5_title",
            descKey: "scope_5_desc",
            icon: (
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            tag: "Adrenal & CAH"
        },
        {
            num: "06",
            titleKey: "scope_6_title",
            descKey: "scope_6_desc",
            icon: (
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
            ),
            tag: "Metabolic"
        },
        {
            num: "07",
            titleKey: "scope_7_title",
            descKey: "scope_7_desc",
            icon: (
                <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            tag: "Water Balance"
        },
        {
            num: "08",
            titleKey: "scope_8_title",
            descKey: "scope_8_desc",
            icon: (
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            tag: "Pituitary"
        },
        {
            num: "09",
            titleKey: "scope_9_title",
            descKey: "scope_9_desc",
            icon: (
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            tag: "Bone & Vit-D"
        },
        {
            num: "10",
            titleKey: "scope_10_title",
            descKey: "scope_10_desc",
            icon: (
                <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
            ),
            tag: "Rare Genetics"
        },
        {
            num: "11",
            titleKey: "scope_11_title",
            descKey: "scope_11_desc",
            icon: (
                <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            tag: "Dynamic Tests"
        },
        {
            num: "12",
            titleKey: "scope_12_title",
            descKey: "scope_12_desc",
            icon: (
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            tag: "Electrolytes"
        }
    ];

    // International Fellowships List
    const fellowships = [
        {
            year: "2026",
            country: "fellowship_2026_country",
            title: "fellowship_2026_title",
            desc: "fellowship_2026_desc",
            flag: "🇱🇹",
            institution: "European Society of Endocrinology (ESE)"
        },
        {
            year: "2024",
            country: "fellowship_2024_uk_country",
            title: "fellowship_2024_uk_title",
            desc: "fellowship_2024_uk_desc",
            flag: "🇬🇧",
            institution: "Royal Hospital for Children, Glasgow, Scotland"
        },
        {
            year: "2024",
            country: "fellowship_2024_omi_country",
            title: "fellowship_2024_omi_title",
            desc: "fellowship_2024_omi_desc",
            flag: "🇦🇹",
            institution: "Salzburg OMI Seminar (Medical Education)"
        },
        {
            year: "2024",
            country: "fellowship_2024_uz_country",
            title: "fellowship_2024_uz_title",
            desc: "fellowship_2024_uz_desc",
            flag: "🇪🇺🇺🇿",
            institution: "ESPE Caucasus & Central Asia School"
        },
        {
            year: "2024",
            country: "fellowship_2024_dsd_country",
            title: "fellowship_2024_dsd_title",
            desc: "fellowship_2024_dsd_desc",
            flag: "🇨🇭",
            institution: "10th International DSD Symposium & PG Course"
        },
        {
            year: "2023",
            country: "fellowship_2023_chop_country",
            title: "fellowship_2023_chop_title",
            desc: "fellowship_2023_chop_desc",
            flag: "🇦🇹",
            institution: "Salzburg CHOP Seminar (Endocrinology & Nephrology)"
        },
        {
            year: "2022",
            country: "fellowship_2022_dsd_country",
            title: "fellowship_2022_dsd_title",
            desc: "fellowship_2022_dsd_desc",
            flag: "🇨🇭",
            institution: "9th International DSD Symposium & PG Course"
        },
        {
            year: "2022",
            country: "fellowship_2022_adrenal_country",
            title: "fellowship_2022_adrenal_title",
            desc: "fellowship_2022_adrenal_desc",
            flag: "🇳🇱",
            institution: "Radboudumc Adrenal Masterclass (Radboud University)"
        },
        {
            year: "2021",
            country: "fellowship_2021_espe_country",
            title: "fellowship_2021_espe_title",
            desc: "fellowship_2021_espe_desc",
            flag: "🇬🇪",
            institution: "ESPE Caucasus & Central Asia School"
        },
        {
            year: "2019–2020",
            country: "fellowship_2019_korea_country",
            title: "fellowship_2019_korea_title",
            desc: "fellowship_2019_korea_desc",
            flag: "🇰🇷",
            institution: "Pusan National University Yangsan Hospital (1-Year Fellowship)"
        }
    ];

    // Career & Higher Education List
    const careerHistory = [
        {
            period: "2020 – h.v.",
            titleKey: "career_2020_pres_title",
            orgKey: "career_2020_pres_org",
            descKey: "career_2020_pres_desc",
            badge: "Current Leadership"
        },
        {
            period: "2018–2019",
            titleKey: "career_2018_2019_bekobod_title",
            orgKey: "career_2018_2019_bekobod_org",
            descKey: "career_2018_2019_bekobod_desc",
            badge: "Clinical Practice"
        },
        {
            period: "2018–2019",
            titleKey: "career_2018_2019_shoxmed_title",
            orgKey: "career_2018_2019_shoxmed_org",
            descKey: "career_2018_2019_shoxmed_desc",
            badge: "Private Clinic"
        },
        {
            period: "2016–2019",
            titleKey: "career_2016_2019_tta_title",
            orgKey: "career_2016_2019_tta_org",
            descKey: "career_2016_2019_tta_desc",
            badge: "Emergency Endocrinology"
        },
        {
            period: "2015–2016",
            titleKey: "career_2015_2016_qvp_title",
            orgKey: "career_2015_2016_qvp_org",
            descKey: "career_2015_2016_qvp_desc",
            badge: "Primary Care"
        },
        {
            period: "2015–2018",
            titleKey: "edu_2015_2018_master_title",
            orgKey: "edu_2015_2018_master_org",
            descKey: "edu_2015_2018_master_desc",
            badge: "Master's Degree 🎓"
        },
        {
            period: "2009–2015",
            titleKey: "edu_2009_2015_bachelor_title",
            orgKey: "edu_2009_2015_bachelor_org",
            descKey: "edu_2009_2015_bachelor_desc",
            badge: "MD Degree 🎓"
        }
    ];

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

            {/* ============================================================ */}
            {/* 1. HERO SECTION */}
            {/* ============================================================ */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-16 sm:pt-24 sm:pb-24 lg:flex lg:items-center lg:gap-x-12 lg:px-8">
                
                {/* Left Column: Clinical Identity, Quote, and Stats */}
                <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-lg backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        {t('platform_badge')}
                    </div>
                    
                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl drop-shadow-md">
                        {profile?.name || "Dr. Elbek Mamatkulov"}
                    </h1>
                    
                    <p className="mt-3 text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">
                        {t('hero_doctor_title')} • NCMC
                    </p>

                    {/* Prominent Clinical Mission Quote */}
                    <div className="mt-4 p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md shadow-xl">
                        <p className="text-sm sm:text-base font-semibold text-cyan-100 italic leading-relaxed flex items-start gap-2">
                            <span className="text-2xl text-cyan-400 font-serif leading-none">“</span>
                            <span>{t('hero_mission_quote')}</span>
                            <span className="text-2xl text-cyan-400 font-serif leading-none">”</span>
                        </p>
                    </div>
                    
                    {/* Action & Direct Consultation Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-3.5">
                        <a 
                            href="tel:+998910117711" 
                            className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer border border-emerald-400/30 hover:scale-[1.02]"
                        >
                            <svg className="w-4 h-4 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            {t('btn_call_direct')}
                        </a>

                        <a 
                            href="https://t.me/elbekendokrinolog" 
                            target="_blank" 
                            rel="noreferrer"
                            className="rounded-xl bg-sky-600 hover:bg-sky-500 text-white px-5 py-3 text-sm font-bold shadow-md transition flex items-center gap-2 cursor-pointer border border-sky-400/40 backdrop-blur-sm hover:scale-[1.02]"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                            {t('btn_telegram_consult')}
                        </a>

                        <a 
                            href="#clinical-indications" 
                            className="rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 px-5 py-3 text-sm font-bold shadow-md transition flex items-center gap-2 cursor-pointer border border-cyan-500/40 backdrop-blur-sm hover:border-cyan-300"
                        >
                            📋 {t('btn_clinical_scope')}
                        </a>

                        <a 
                            href="#calculators" 
                            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center gap-2 cursor-pointer border border-blue-400/30 hover:scale-[1.02]"
                        >
                            <svg className="w-4 h-4 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            {t('btn_calculators')}
                        </a>
                    </div>

                    {/* 4 Key Metric Badges */}
                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3.5 border-t border-slate-800/80 pt-6">
                        <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 backdrop-blur-sm">
                            <span className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{t('stat_experience_years')}</span>
                            <span className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mt-0.5">{t('stat_experience_label')}</span>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 backdrop-blur-sm">
                            <span className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{t('stat_fellowships_count')}</span>
                            <span className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mt-0.5">{t('stat_fellowships_label')}</span>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 backdrop-blur-sm">
                            <span className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">50</span>
                            <span className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mt-0.5">{t('stat_clinical_tools')}</span>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 backdrop-blur-sm">
                            <span className="block text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 truncate">{t('stat_department_head')}</span>
                            <span className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mt-0.5">{t('stat_department_label')}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Doctor Portrait with Clinic Ring */}
                <div className="mt-12 sm:mt-16 lg:mt-0 lg:flex-shrink-0 lg:flex-grow flex justify-center">
                    <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px]">
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
                        <div className="absolute -bottom-3 sm:bottom-2 left-1/2 -translate-x-1/2 bg-slate-950/95 backdrop-blur-xl border border-cyan-500/40 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2.5 whitespace-nowrap z-20">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-bold text-white tracking-wide">
                                NCMC • Bolalar Milliy Tibbiyot Markazi
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Info Bar - Glassmorphism Strip */}
            <div className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl py-6 shadow-2xl">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        
                        {/* Location */}
                        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex items-center gap-4 hover:border-blue-500/40 transition">
                            <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-400/30 text-cyan-300 flex items-center justify-center shrink-0 shadow-inner">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('location')}</h3>
                                <p className="text-sm font-semibold text-white leading-snug">Bolalar milliy tibbiyot markazi (NCMC) & Neoclinic</p>
                            </div>
                        </div>

                        {/* Direct Phone */}
                        <a 
                            href="tel:+998910117711"
                            className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex items-center gap-4 hover:border-emerald-500/50 hover:bg-slate-900/80 transition cursor-pointer group"
                        >
                            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('dock_phone_label')}</h3>
                                <p className="text-sm font-bold text-emerald-400 group-hover:text-emerald-300 transition">+998 91 011 77 11</p>
                            </div>
                        </a>

                        {/* Specialty Scope */}
                        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex items-center gap-4 hover:border-blue-500/40 transition">
                            <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 flex items-center justify-center shrink-0 shadow-inner">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('specialty')}</h3>
                                <p className="text-sm font-semibold text-white leading-snug">{t('pediatric_endocrinology')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================================ */}
            {/* 2. CLINICAL INDICATIONS: "QAYSI HOLATLARDA MUROJAAT QILISHINGIZ MUMKIN?" */}
            {/* ============================================================ */}
            <div id="clinical-indications" className="relative z-10 py-20 bg-slate-950/90 border-t border-slate-800/80 scroll-mt-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/25 shadow-sm">
                            {t('scope_section_badge')}
                        </span>
                        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mt-3">
                            {t('scope_section_title')}
                        </h2>
                        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                            {t('scope_section_desc')}
                        </p>
                    </div>

                    {/* 12-Card Responsive Medical Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clinicalScopes.map((item, idx) => (
                            <div 
                                key={idx}
                                className="group relative rounded-2xl bg-slate-900/60 p-6 border border-slate-800/90 backdrop-blur-md hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-500/40 transition">
                                            {item.icon}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-md bg-slate-800/90 text-cyan-300 border border-slate-700/60">
                                                {item.tag}
                                            </span>
                                            <span className="text-xs font-black text-slate-500 font-mono">
                                                #{item.num}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition mb-2.5">
                                        {t(item.titleKey)}
                                    </h3>

                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        {t(item.descKey)}
                                    </p>
                                </div>

                                <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                                    <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                        NCMC & Neoclinic
                                    </span>
                                    <a 
                                        href="tel:+998910117711" 
                                        className="text-slate-400 hover:text-white flex items-center gap-1 font-semibold transition"
                                    >
                                        📞 +998 91 011 77 11
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ============================================================ */}
            {/* 3. TIMELINE: TA'LIM, XALQARO TAJRIBA VA ISH FAOLIYATI */}
            {/* ============================================================ */}
            <div id="doctor-timeline" className="relative z-10 py-20 bg-slate-900/60 border-t border-slate-800/80 scroll-mt-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/25 shadow-sm">
                            {t('timeline_section_badge')}
                        </span>
                        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mt-3">
                            {t('timeline_section_title')}
                        </h2>
                    </div>

                    {/* Dual Tab Switcher */}
                    <div className="flex justify-center mb-10">
                        <div className="inline-flex rounded-2xl bg-slate-950/80 p-1.5 border border-slate-800/90 shadow-xl backdrop-blur-md">
                            <button
                                onClick={() => setTimelineTab('fellowships')}
                                className={`px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                                    timelineTab === 'fellowships'
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                }`}
                            >
                                <span>{t('timeline_tab_fellowships')}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900/60 border border-white/10">10</span>
                            </button>
                            <button
                                onClick={() => setTimelineTab('career')}
                                className={`px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                                    timelineTab === 'career'
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                }`}
                            >
                                <span>{t('timeline_tab_career')}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900/60 border border-white/10">11 Yil</span>
                            </button>
                        </div>
                    </div>

                    {/* TAB 1: International Fellowships */}
                    {timelineTab === 'fellowships' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {fellowships.map((f, idx) => (
                                <div 
                                    key={idx}
                                    className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/90 hover:border-cyan-500/40 transition shadow-lg backdrop-blur-sm flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-black text-cyan-300 bg-blue-500/15 border border-blue-400/30 px-3 py-1 rounded-lg">
                                                {f.year}
                                            </span>
                                            <span className="text-base font-bold text-slate-300 flex items-center gap-1.5">
                                                <span>{t(f.country)}</span>
                                            </span>
                                        </div>
                                        <h4 className="text-base font-bold text-white mb-2">
                                            {t(f.title)}
                                        </h4>
                                        <p className="text-sm text-slate-300 leading-relaxed mb-3">
                                            {t(f.desc)}
                                        </p>
                                    </div>
                                    <div className="pt-3 border-t border-slate-800/60 text-xs font-semibold text-slate-400 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                        <span>{f.institution}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TAB 2: Clinical Career & Education */}
                    {timelineTab === 'career' && (
                        <div className="space-y-4">
                            {/* Summary Experience Banner */}
                            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-cyan-500/40 text-center mb-6">
                                <p className="text-base sm:text-lg font-black text-cyan-200">
                                    ⭐ {t('career_total_experience')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {careerHistory.map((c, idx) => (
                                    <div 
                                        key={idx}
                                        className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/90 hover:border-blue-500/40 transition shadow-lg backdrop-blur-sm flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs font-black text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 px-3 py-1 rounded-lg">
                                                    {c.period}
                                                </span>
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-800/80">
                                                    {c.badge}
                                                </span>
                                            </div>
                                            <h4 className="text-base font-bold text-white mb-1.5">
                                                {t(c.titleKey)}
                                            </h4>
                                            <p className="text-xs font-bold text-cyan-400 mb-2">
                                                {t(c.orgKey)}
                                            </p>
                                            <p className="text-sm text-slate-300 leading-relaxed">
                                                {t(c.descKey)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ============================================================ */}
            {/* 4. DIRECT APPOINTMENT & CONSULTATION DOCK */}
            {/* ============================================================ */}
            <div className="relative z-10 py-16 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-cyan-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                        
                        {/* Ambient glow in card */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                {t('dock_clinic_name')}
                            </span>

                            <h3 className="text-2xl sm:text-4xl font-black text-white mb-3">
                                {t('dock_title')}
                            </h3>
                            
                            <p className="text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                                {t('dock_desc')}
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <a 
                                    href="tel:+998910117711" 
                                    className="px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-base shadow-xl shadow-emerald-500/25 transition-all flex items-center gap-3 cursor-pointer hover:scale-105 border border-emerald-300/40"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    +998 91 011 77 11
                                </a>

                                <a 
                                    href="https://t.me/elbekendokrinolog" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="px-7 py-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-base shadow-xl shadow-sky-500/25 transition-all flex items-center gap-3 cursor-pointer hover:scale-105 border border-sky-400/40"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                                    {t('btn_telegram_consult')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}