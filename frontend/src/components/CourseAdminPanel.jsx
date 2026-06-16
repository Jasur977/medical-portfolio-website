import React, { useState, useRef } from 'react';
import { createCourse, uploadImage, createLesson } from '../api';

export default function CourseAdminPanel({ onCourseAdded }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [mode, setMode] = useState('course'); // 'course' or 'lesson'
    
    // Using a simple state for course ID selection if adding a lesson
    const [courseIdForLesson, setCourseIdForLesson] = useState('');
    
    const fileInputRef = useRef(null);

    const [courseForm, setCourseForm] = useState({
        title: '',
        description: '',
        targetAudience: '',
        imageUrl: ''
    });

    const [lessonForm, setLessonForm] = useState({
        title: '',
        contentBody: '',
        videoUrl: '',
        videoProvider: 'YOUTUBE',
        durationMinutes: 0,
        orderIndex: 1
    });

    const handleCourseChange = (e) => {
        const { name, value } = e.target;
        setCourseForm(prev => ({ ...prev, [name]: value }));
    };

    const handleLessonChange = (e) => {
        const { name, value, type } = e.target;
        setLessonForm(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? parseInt(value, 10) : value 
        }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const data = await uploadImage(file);
            setCourseForm(prev => ({
                ...prev,
                imageUrl: data.imageUrl
            }));
        } catch (error) {
            alert('Failed to upload image.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmitCourse = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createCourse(courseForm);
            setCourseForm({ title: '', description: '', targetAudience: '', imageUrl: '' });
            if(fileInputRef.current) fileInputRef.current.value = '';
            setIsOpen(false);
            if (onCourseAdded) onCourseAdded();
        } catch (error) {
            alert('Failed to add course.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitLesson = async (e) => {
        e.preventDefault();
        if (!courseIdForLesson) {
            alert("Please provide the exact Course ID. (Usually retrieved dynamically, but entered manually here for admin testing).");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                courseId: courseIdForLesson,
                ...lessonForm
            };
            await createLesson(payload);
            setLessonForm({ title: '', contentBody: '', videoUrl: '', videoProvider: 'YOUTUBE', durationMinutes: 0, orderIndex: 1 });
            setIsOpen(false);
            if (onCourseAdded) onCourseAdded(); // Refresh courses
        } catch (error) {
            alert('Failed to add lesson. Ensure Course ID is correct.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) {
        return (
            <div className="fixed bottom-24 right-6 z-50">
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-green-700 text-white rounded-full p-4 shadow-xl hover:bg-green-600 transition-colors flex items-center justify-center group"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out">
                        Admin: Education
                    </span>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => setMode('course')}
                            className={`text-lg font-bold px-2 py-1 ${mode === 'course' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Add Course
                        </button>
                        <button 
                            onClick={() => setMode('lesson')}
                            className={`text-lg font-bold px-2 py-1 ${mode === 'lesson' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Add Lesson
                        </button>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 overflow-y-auto flex-1">
                    {mode === 'course' ? (
                        <form id="course-form" onSubmit={handleSubmitCourse} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                <input required type="text" name="title" value={courseForm.title} onChange={handleCourseChange} className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                                <input required type="text" name="targetAudience" value={courseForm.targetAudience} onChange={handleCourseChange} className="w-full border border-gray-300 rounded-md p-2" placeholder="e.g., Pediatricians, Residents" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea required name="description" rows="3" value={courseForm.description} onChange={handleCourseChange} className="w-full border border-gray-300 rounded-md p-2"></textarea>
                            </div>
                            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Upload Course Thumbnail (Optional)</label>
                                <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="block w-full text-sm text-gray-500 cursor-pointer" />
                                {isUploading && <span className="text-sm text-green-600">Uploading...</span>}
                                {courseForm.imageUrl && <div className="mt-2"><img src={courseForm.imageUrl} alt="Preview" className="w-24 h-16 object-cover rounded" /></div>}
                            </div>
                        </form>
                    ) : (
                        <form id="lesson-form" onSubmit={handleSubmitLesson} className="space-y-4">
                            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md mb-4">
                                <label className="block text-sm font-bold text-yellow-800 mb-1">Parent Course ID (UUID)</label>
                                <input required type="text" value={courseIdForLesson} onChange={(e) => setCourseIdForLesson(e.target.value)} className="w-full border border-yellow-300 rounded-md p-2" placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000" />
                                <p className="text-xs text-yellow-700 mt-1">Check the database or network tab for the exact Course ID.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
                                <input required type="text" name="title" value={lessonForm.title} onChange={handleLessonChange} className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Video Embedded URL</label>
                                <input type="text" name="videoUrl" value={lessonForm.videoUrl} onChange={handleLessonChange} className="w-full border border-gray-300 rounded-md p-2" placeholder="https://www.youtube.com/embed/..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Minutes)</label>
                                    <input required type="number" name="durationMinutes" value={lessonForm.durationMinutes} onChange={handleLessonChange} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Index</label>
                                    <input required type="number" name="orderIndex" value={lessonForm.orderIndex} onChange={handleLessonChange} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Notes / Content</label>
                                <textarea required name="contentBody" rows="4" value={lessonForm.contentBody} onChange={handleLessonChange} className="w-full border border-gray-300 rounded-md p-2"></textarea>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                    <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        form={mode === 'course' ? 'course-form' : 'lesson-form'} 
                        disabled={isSubmitting || isUploading} 
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : `Save ${mode === 'course' ? 'Course' : 'Lesson'}`}
                    </button>
                </div>

            </div>
        </div>
    );
}
