import React from 'react';
import { useTranslation } from 'react-i18next';

export default function DoctorProfile({ profile, isAdmin, onEditClick }) {
    const { t } = useTranslation();

    if (!profile) return null;

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mt-6 w-full max-w-4xl mx-auto text-left relative group">
            
            {/* Admin Edit Button */}
            {isAdmin && (
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                        onClick={() => onEditClick(profile)}
                        className="bg-white text-blue-600 px-3 py-2 rounded-md shadow-md hover:bg-blue-50 border border-blue-100 flex items-center font-medium text-sm cursor-pointer"
                        title="Edit Doctor Profile"
                    >
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        {t('edit_profile')}
                    </button>
                </div>
            )}

            {/* Header section with Name and primary info */}
            <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{profile.name}</h2>
                {profile.credentials && (
                    <p className="text-lg text-blue-600 font-medium mb-4">{profile.credentials}</p>
                )}
                
                <div className="flex flex-col md:flex-row md:space-x-8 text-gray-600">
                    {profile.clinicLocation && (
                        <div className="flex items-start mt-2">
                            <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <span className="max-w-xs leading-tight">{profile.clinicLocation}</span>
                        </div>
                    )}
                    {profile.contactDetails && (
                        <div className="flex items-start mt-2">
                            <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            <span className="whitespace-pre-line leading-tight">{profile.contactDetails.split(' | ').join('\n')}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Biography & Education */}
            {profile.biography && (
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">{t('biography')}</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{profile.biography}</p>
                </div>
            )}

            {/* Publications */}
            {profile.publications && (
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">{t('publications')}</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{profile.publications}</p>
                </div>
            )}

            {/* Action / Booking */}
            {profile.appointmentBookingLink && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <a 
                        href={profile.appointmentBookingLink.startsWith('http') ? profile.appointmentBookingLink : `https://${profile.appointmentBookingLink}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors w-full sm:w-auto"
                    >
                        {t('book_appointment')}
                    </a>
                </div>
            )}
        </div>
    );
}
