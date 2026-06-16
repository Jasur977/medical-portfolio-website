import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8080/api';

export default function AdminLessonPanel({ courseId, lessonToEdit, onClose, onLessonAdded }) {
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
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            };

            const payload = { ...formData, courseId };

            const response = await fetch(`${API_BASE_URL}/lessons${isEditMode ? `/${lessonToEdit.id}` : ''}`, {
                method: isEditMode ? 'PUT' : 'POST',
                headers,
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to save lesson');
            
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
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-[70] p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">
                        {isEditMode ? 'Edit Lesson' : 'Add New Lesson'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <form id="add-lesson-form" onSubmit={handleSubmit} className="space-y-4">
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
                                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Module 1: Pathophysiology" />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Order Index (Sort Order)</label>
                                <input required type="number" min="1" name="orderIndex" value={formData.orderIndex} onChange={handleChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Minutes)</label>
                                <input required type="number" min="1" name="durationMinutes" value={formData.durationMinutes} onChange={handleChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Video Embed URL</label>
                            <input required type="url" name="videoUrl" value={formData.videoUrl} onChange={handleChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. https://www.youtube.com/embed/dQw4w9WgXcQ" />
                            <p className="text-xs text-gray-500 mt-1">Make sure to use the 'embed' URL provided by YouTube/Vimeo, not the standard browser URL.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Notes / Content</label>
                            <textarea required name="contentBody" rows="5" value={formData.contentBody} onChange={handleChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                        </div>

                    </form>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" form="add-lesson-form" disabled={isSubmitting} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">
                        {isSubmitting ? 'Saving...' : 'Save Lesson'}
                    </button>
                </div>

            </div>
        </div>
    );
}
