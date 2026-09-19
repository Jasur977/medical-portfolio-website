import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateProfile } from '../api';

export default function AdminProfilePanel({ profileToEdit, onClose, onProfileUpdated }) {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Initialize state directly from props using lazy initialization
    const [formData, setFormData] = useState(() => ({
        name: profileToEdit?.name || '',
        credentials: profileToEdit?.credentials || '',
        clinicLocation: profileToEdit?.clinicLocation || '',
        contactDetails: profileToEdit?.contactDetails || '',
        biography: profileToEdit?.biography || '',
        publications: profileToEdit?.publications || '',
        appointmentBookingLink: profileToEdit?.appointmentBookingLink || ''
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateProfile(profileToEdit.id, formData);
            if (onProfileUpdated) onProfileUpdated();
            onClose();
        } catch (error) {
            alert(t('failed_update_profile', 'Failed to update profile.'));
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!profileToEdit) return null;

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] text-white">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/80">
                    <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </div>
                        <h2 className="text-lg font-bold text-white tracking-tight">{t('edit_doctor_profile')}</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 overflow-y-auto flex-1">
                    <form id="profile-form" onSubmit={handleSubmit} className="space-y-4">
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('full_name')}</label>
                                <input 
                                    required 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('credentials_title')}</label>
                                <input 
                                    required 
                                    type="text" 
                                    name="credentials" 
                                    value={formData.credentials} 
                                    onChange={handleChange} 
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('clinic_location')}</label>
                                <input 
                                    type="text" 
                                    name="clinicLocation" 
                                    value={formData.clinicLocation} 
                                    onChange={handleChange} 
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('contact_details')}</label>
                                <input 
                                    type="text" 
                                    name="contactDetails" 
                                    value={formData.contactDetails} 
                                    onChange={handleChange} 
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" 
                                    placeholder="Use ' | ' to separate items" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('appointment_booking_url')}</label>
                            <input 
                                type="url" 
                                name="appointmentBookingLink" 
                                value={formData.appointmentBookingLink} 
                                onChange={handleChange} 
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" 
                                placeholder="https://..." 
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('biography_education')}</label>
                            <textarea 
                                required 
                                name="biography" 
                                rows="6" 
                                value={formData.biography} 
                                onChange={handleChange} 
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition leading-relaxed"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('publications_research')}</label>
                            <textarea 
                                name="publications" 
                                rows="5" 
                                value={formData.publications} 
                                onChange={handleChange} 
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition leading-relaxed"
                            ></textarea>
                        </div>

                    </form>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex justify-end space-x-3">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="px-5 py-2.5 border border-slate-700 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                    >
                        {t('cancel')}
                    </button>
                    <button 
                        type="submit" 
                        form="profile-form" 
                        disabled={isSubmitting} 
                        className="px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 cursor-pointer transition"
                    >
                        {isSubmitting ? t('saving') : t('update_profile')}
                    </button>
                </div>

            </div>
        </div>
    );
}