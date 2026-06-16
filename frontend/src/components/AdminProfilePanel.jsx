import React, { useState, useEffect } from 'react';
import { updateProfile } from '../api';

export default function AdminProfilePanel({ profileToEdit, onClose, onProfileUpdated }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        credentials: '',
        clinicLocation: '',
        contactDetails: '',
        biography: '',
        publications: '',
        appointmentBookingLink: ''
    });

    useEffect(() => {
        if (profileToEdit) {
            setFormData({
                name: profileToEdit.name || '',
                credentials: profileToEdit.credentials || '',
                clinicLocation: profileToEdit.clinicLocation || '',
                contactDetails: profileToEdit.contactDetails || '',
                biography: profileToEdit.biography || '',
                publications: profileToEdit.publications || '',
                appointmentBookingLink: profileToEdit.appointmentBookingLink || ''
            });
        }
    }, [profileToEdit]);

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
            alert('Failed to update profile.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!profileToEdit) return null;

    return (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">Edit Doctor Profile</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 overflow-y-auto flex-1">
                    <form id="profile-form" onSubmit={handleSubmit} className="space-y-4">
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Credentials & Title</label>
                                <input required type="text" name="credentials" value={formData.credentials} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Location</label>
                                <input type="text" name="clinicLocation" value={formData.clinicLocation} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Details (Phone / Email)</label>
                                <input type="text" name="contactDetails" value={formData.contactDetails} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Use ' | ' to separate items" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Booking URL</label>
                            <input type="url" name="appointmentBookingLink" value={formData.appointmentBookingLink} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="https://..." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Biography & Education</label>
                            <textarea required name="biography" rows="6" value={formData.biography} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Publications & Research</label>
                            <textarea name="publications" rows="5" value={formData.publications} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                        </div>

                    </form>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" form="profile-form" disabled={isSubmitting} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                        {isSubmitting ? 'Saving...' : 'Update Profile'}
                    </button>
                </div>

            </div>
        </div>
    );
}
