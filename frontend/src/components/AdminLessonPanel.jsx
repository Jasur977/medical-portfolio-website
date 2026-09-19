import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createLesson, updateLesson } from '../api';

export default function AdminLessonPanel({ courseId, lessonToEdit, onClose, onLessonAdded }) {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditMode = !!lessonToEdit;

    const [formData, setFormData] = useState({
        title: '',
        contentBody: '',
        videoUrl: '',
        videoProvider: 'YOUTUBE',
        durationMinutes: 10,
        orderIndex: 1
    });

    useEffect(() => {
        if (lessonToEdit) {
            setFormData({
                title: lessonToEdit.title || '',
                contentBody: lessonToEdit.contentBody || '',
                videoUrl: lessonToEdit.videoUrl || '',
                videoProvider: lessonToEdit.videoProvider || 'YOUTUBE',
                durationMinutes: lessonToEdit.durationMinutes || 10,
                orderIndex: lessonToEdit.orderIndex || 1
            });
        }
    }, [lessonToEdit]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? parseInt(value, 10) : value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const payload = { ...formData, courseId };

            if (isEditMode) {
                await updateLesson(lessonToEdit.id, payload);
            } else {
                await createLesson(payload);
            }
            
            onLessonAdded();
            onClose();
        } catch (error) {
            alert('Failed to save lesson.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-[70] p-4 overflow-y-auto animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/80">
                    <h2 className="text-lg font-bold text-white tracking-tight">
                        {isEditMode ? t('edit_lesson') : t('add_lesson')}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <form id="add-lesson-form" onSubmit={handleSubmit} className="space-y-4">
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('lesson_title')}</label>
                                <input 
                                    required 
                                    type="text" 
                                    name="title" 
                                    value={formData.title} 
                                    onChange={handleChange} 
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" 
                                    placeholder="e.g. Module 1: Pathophysiology" 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('order_index')}</label>
                                <input 
                                    required 
                                    type="number" 
                                    min="1" 
                                    name="orderIndex" 
                                    value={formData.orderIndex} 
                                    onChange={handleChange} 
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" 
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('duration_mins')}</label>
                                <input 
                                    required 
                                    type="number" 
                                    min="1" 
                                    name="durationMinutes" 
                                    value={formData.durationMinutes} 
                                    onChange={handleChange} 
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('video_url')}</label>
                            <input 
                                required 
                                type="url" 
                                name="videoUrl" 
                                value={formData.videoUrl} 
                                onChange={handleChange} 
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" 
                                placeholder="e.g. https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            />
                            <p className="text-xs text-slate-400 mt-1">{t('embed_url_hint')}</p>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('lesson_content')}</label>
                            <textarea 
                                required 
                                name="contentBody" 
                                rows="5" 
                                value={formData.contentBody} 
                                onChange={handleChange} 
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition leading-relaxed"
                            ></textarea>
                        </div>

                    </form>
                </div>

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
                        form="add-lesson-form" 
                        disabled={isSubmitting} 
                        className="px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 cursor-pointer transition"
                    >
                        {isSubmitting ? t('saving') : t('save_lesson')}
                    </button>
                </div>

            </div>
        </div>
    );
}
