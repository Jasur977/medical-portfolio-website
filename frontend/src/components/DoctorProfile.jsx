import React from 'react';
import { useTranslation } from 'react-i18next';
import doctorProfileImg from '../assets/doctor_profile.jpg';

export default function DoctorProfile({ profile, isAdmin, onEditClick }) {
    const { t } = useTranslation();

    if (!profile) return null;

    return (
        <div className="bg-slate-900/90 backdrop-blur-xl p-6 sm:p-10 rounded-3xl shadow-2xl border border-slate-800 text-left relative group">
            
            {/* Admin Edit Button */}
            {isAdmin && (
                <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                        onClick={() => onEditClick(profile)}
                        className="bg-slate-800 hover:bg-slate-700 text-cyan-300 px-3.5 py-2 rounded-xl shadow-lg border border-slate-700 flex items-center font-bold text-xs cursor-pointer transition"
                        title="Edit Doctor Profile"
                    >
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        {t('edit_profile')}
                    </button>
                </div>
            )}

            {/* Header section with Portrait, Name and primary info */}
            <div className="border-b border-slate-800/80 pb-8 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative shrink-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-2 ring-cyan-500/40 shadow-xl shadow-cyan-500/10">
                        <img 
                            src={doctorProfileImg} 
                            alt={profile.name} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 ring-2 ring-slate-900"></span>
                </div>

                <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-1.5">{profile.name}</h2>
                    {profile.credentials && (
                        <p className="text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4">{profile.credentials}</p>
                    )}
                    
                    <div className="flex flex-col md:flex-row md:space-x-8 text-slate-300 text-xs sm:text-sm">
                        {profile.clinicLocation && (
                            <div className="flex items-start justify-center sm:justify-start mt-2">
                                <svg className="w-5 h-5 mr-2 mt-0.5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span className="max-w-xs leading-relaxed">{profile.clinicLocation}</span>
                            </div>
                        )}
                        {profile.contactDetails && (
                            <div className="flex items-start justify-center sm:justify-start mt-2">
                                <svg className="w-5 h-5 mr-2 mt-0.5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <span className="whitespace-pre-line leading-relaxed">{profile.contactDetails.split(' | ').join('\n')}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Biography & Education */}
            {profile.biography && (
                <div className="mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 border-l-4 border-cyan-400 pl-3.5">{t('biography')}</h3>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">{profile.biography}</p>
                </div>
            )}

            {/* Publications */}
            {profile.publications && (
                <div className="mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 border-l-4 border-cyan-400 pl-3.5">{t('publications')}</h3>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">{profile.publications}</p>
                </div>
            )}

            {/* Action / Booking */}
            {profile.appointmentBookingLink && (
                <div className="mt-8 pt-6 border-t border-slate-800">
                    <a 
                        href={profile.appointmentBookingLink.startsWith('http') ? profile.appointmentBookingLink : `https://${profile.appointmentBookingLink}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/25 transition-all w-full sm:w-auto cursor-pointer"
                    >
                        {t('book_appointment')}
                    </a>
                </div>
            )}
        </div>
    );
}
