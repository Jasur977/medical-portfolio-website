import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createClinicalCase, updateClinicalCase, uploadImage } from '../api';

export default function AdminPanel({ onCaseAdded, caseToEdit, onCloseEdit }) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    
    const isEditMode = !!caseToEdit;

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        presentation: '',
        labResults: '',
        management: '',
        imageUrl: '',
        isPublished: true
    });

    // When caseToEdit changes, update the form
    useEffect(() => {
        if (caseToEdit) {
            
            // Try to format the JSON string nicely for the textarea
            let formattedLabs = caseToEdit.labResults;
            try {
                if (formattedLabs) {
                    const parsed = JSON.parse(formattedLabs);
                    // If it was just { Notes: "..." }, extract the string
                    if (parsed.Notes && Object.keys(parsed).length === 1) {
                        formattedLabs = parsed.Notes;
                    } else {
                        // Otherwise pretty print the JSON
                        formattedLabs = JSON.stringify(parsed, null, 2);
                    }
                }
            } catch(e) {
                // Keep as is
            }

            setFormData({
                title: caseToEdit.title || '',
                category: caseToEdit.category || '',
                presentation: caseToEdit.presentation || '',
                labResults: formattedLabs || '',
                management: caseToEdit.management || '',
                imageUrl: caseToEdit.imageUrl || '',
                isPublished: caseToEdit.isPublished !== false
            });
            setIsOpen(true);
        }
    }, [caseToEdit]);

    const handleClose = () => {
        setIsOpen(false);
        if (isEditMode && onCloseEdit) {
            onCloseEdit();
            // Reset form
            setFormData({
                title: '', category: '', presentation: '', labResults: '', management: '', imageUrl: '', isPublished: true
            });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const data = await uploadImage(file);
            setFormData(prev => ({
                ...prev,
                imageUrl: data.imageUrl
            }));
        } catch (error) {
            alert(t('failed_upload_image', 'Failed to upload image. Please try again.'));
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Convert labResults string to a JSON string if possible, or just wrap in an object
            let parsedLabs;
            try {
                // Try to parse as JSON if user entered raw JSON
                parsedLabs = JSON.parse(formData.labResults);
                parsedLabs = JSON.stringify(parsedLabs);
            } catch (e) {
                // Otherwise just wrap the text in a simple JSON structure
                parsedLabs = JSON.stringify({ "Notes": formData.labResults });
            }

            const caseToSubmit = {
                ...formData,
                labResults: parsedLabs
            };

            if (isEditMode) {
                await updateClinicalCase(caseToEdit.id, caseToSubmit);
            } else {
                await createClinicalCase(caseToSubmit);
            }
            
            // Reset form and close
            if (!isEditMode) {
                setFormData({
                    title: '', category: '', presentation: '', labResults: '', management: '', imageUrl: '', isPublished: true
                });
            }
            if(fileInputRef.current) fileInputRef.current.value = '';
            handleClose();
            
            // Notify parent to refresh the list
            if (onCaseAdded) onCaseAdded();
            
        } catch (error) {
            alert(isEditMode ? t('failed_update_case', 'Failed to update case.') : t('failed_add_case', 'Failed to add case.'));
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-900 text-white rounded-full p-4 shadow-xl hover:bg-blue-800 transition-colors flex items-center justify-center group cursor-pointer"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out">
                        {t('admin_add_case', 'Admin: Add Case')}
                    </span>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/80">
                    <h2 className="text-lg font-bold text-white tracking-tight">
                        {isEditMode ? t('edit_clinical_case') : t('add_new_case')}
                    </h2>
                    <button onClick={handleClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 overflow-y-auto flex-1">
                    <form id="add-case-form" onSubmit={handleSubmit} className="space-y-4">
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('title')}</label>
                                <input 
                                    required 
                                    type="text" 
                                    name="title" 
                                    value={formData.title} 
                                    onChange={handleChange} 
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" 
                                    placeholder="e.g. Congenital Hypothyroidism" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('category')}</label>
                                <input 
                                    required 
                                    type="text" 
                                    name="category" 
                                    value={formData.category} 
                                    onChange={handleChange} 
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" 
                                    placeholder="e.g. Thyroid, Adrenal, Genetics" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('presentation_label')}</label>
                            <textarea 
                                required 
                                name="presentation" 
                                rows="3" 
                                value={formData.presentation} 
                                onChange={handleChange} 
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition leading-relaxed"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('labs_label')}</label>
                            <textarea 
                                required 
                                name="labResults" 
                                rows="2" 
                                value={formData.labResults} 
                                onChange={handleChange} 
                                placeholder="TSH: High, T4: Low..." 
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition leading-relaxed"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('management_label')}</label>
                            <textarea 
                                required 
                                name="management" 
                                rows="3" 
                                value={formData.management} 
                                onChange={handleChange} 
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition leading-relaxed"
                            ></textarea>
                        </div>

                        {/* Image Upload Section */}
                        <div className="border border-slate-800 rounded-2xl p-4 bg-slate-950/60">
                            <label className="block text-xs font-bold text-slate-300 mb-2">{t('upload_image')}</label>
                            <div className="flex items-center space-x-4">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                    ref={fileInputRef}
                                    className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600/20 file:text-cyan-300 hover:file:bg-blue-600/30 cursor-pointer"
                                />
                                {isUploading && <span className="text-xs text-cyan-400 font-medium whitespace-nowrap">{t('uploading')}</span>}
                            </div>
                            
                            {/* Preview */}
                            {formData.imageUrl && (
                                <div className="mt-3">
                                    <div className="relative w-24 h-24 border border-slate-700 rounded-xl overflow-hidden shadow-md">
                                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            )}
                            
                            {/* Hidden input to store URL if manual entry is preferred */}
                            <input type="hidden" name="imageUrl" value={formData.imageUrl} />
                        </div>

                        <div className="flex items-center pt-2">
                            <input 
                                type="checkbox" 
                                name="isPublished" 
                                checked={formData.isPublished} 
                                onChange={handleChange} 
                                className="h-4 w-4 text-cyan-500 focus:ring-cyan-400 border-slate-700 rounded bg-slate-950 cursor-pointer" 
                            />
                            <label className="ml-2 block text-xs font-semibold text-slate-300 select-none cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, isPublished: !prev.isPublished }))}>
                                {t('publish_immediately')}
                            </label>
                        </div>

                    </form>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex justify-end space-x-3">
                    <button 
                        type="button" 
                        onClick={handleClose} 
                        className="px-5 py-2.5 border border-slate-700 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                    >
                        {t('cancel')}
                    </button>
                    <button 
                        type="submit" 
                        form="add-case-form" 
                        disabled={isSubmitting || isUploading} 
                        className="px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 cursor-pointer transition"
                    >
                        {isSubmitting ? t('saving') : (isEditMode ? t('update_case') : t('save_clinical_case'))}
                    </button>
                </div>

            </div>
        </div>
    );
}
