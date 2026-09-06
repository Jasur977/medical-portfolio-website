import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { createCourse, updateCourse, uploadImage, createLesson, updateLesson, uploadVideo } from '../api';

const INITIAL_COURSE_FORM = {
    title: '',
    description: '',
    targetAudience: '',
    imageUrl: ''
};

const INITIAL_LESSON_FORM = {
    id: null,
    courseId: '',
    title: '',
    contentBody: '',
    videoUrl: '',
    videoProvider: 'DIRECT',
    durationMinutes: 0,
    orderIndex: 1
};

export default function AdminCoursePanel({ onCourseAdded, courseToEdit, onCloseEdit }) {
    const { t } = useTranslation();
    const isEditMode = !!courseToEdit;

    const [isOpen, setIsOpen] = useState(isEditMode);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    // modes: 'course' | 'lesson' | 'lesson_edit'
    const [mode, setMode] = useState('course');
    
    const fileInputRef = useRef(null);

    const [courseForm, setCourseForm] = useState(() => 
        isEditMode ? {
            title: courseToEdit.title || '',
            description: courseToEdit.description || '',
            targetAudience: courseToEdit.targetAudience || '',
            imageUrl: courseToEdit.imageUrl || ''
        } : INITIAL_COURSE_FORM
    );

    const [courseLessons, setCourseLessons] = useState(() => 
        isEditMode ? courseToEdit.lessons || [] : []
    );

    const [lessonForm, setLessonForm] = useState(() => ({
        ...INITIAL_LESSON_FORM,
        courseId: isEditMode ? courseToEdit.id : ''
    }));

    const handleClose = () => {
        setIsOpen(false);
        if (isEditMode && onCloseEdit) {
            onCloseEdit();
        }
    };

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

    const handleImageUpload = async (e) => {
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
            console.error("Image upload failed:", error);
            alert(t('failed_upload_image'));
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmitCourse = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (isEditMode) {
                const payload = {
                    ...courseForm,
                    lessons: courseLessons
                };
                await updateCourse(courseToEdit.id, payload);
            } else {
                await createCourse(courseForm);
            }
            
            handleClose();
            if (onCourseAdded) onCourseAdded();
        } catch (error) {
            alert(isEditMode ? t('failed_delete_course') : t('failed_load_courses'));
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitLesson = async (e) => {
        e.preventDefault();
        if (!lessonForm.courseId) {
            alert("Please provide the exact Course ID.");
            return;
        }

        setIsSubmitting(true);
        try {
            let savedLesson;
            if (mode === 'lesson_edit') {
                savedLesson = await updateLesson(lessonForm.id, lessonForm);
                setCourseLessons(prevLessons => prevLessons.map(l => l.id === savedLesson.id ? savedLesson : l));
            } else {
                savedLesson = await createLesson(lessonForm);
                setCourseLessons(prevLessons => [...prevLessons, savedLesson]);
            }

            if (onCourseAdded) onCourseAdded();
            
            setLessonForm(prev => ({ 
                ...INITIAL_LESSON_FORM,
                courseId: prev.courseId, 
                orderIndex: (prev.orderIndex || 0) + 1 
            }));
            setMode('lesson');
            
        } catch (error) {
            alert("Failed to save lesson.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const editLesson = (lesson) => {
        setLessonForm({
            id: lesson.id,
            courseId: courseToEdit.id,
            title: lesson.title,
            contentBody: lesson.contentBody,
            videoUrl: lesson.videoUrl,
            videoProvider: lesson.videoProvider || 'DIRECT',
            durationMinutes: lesson.durationMinutes,
            orderIndex: lesson.orderIndex
        });
        setMode('lesson_edit');
    };

    if (!isOpen) {
        return (
            <div className="fixed bottom-24 right-6 z-50">
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-green-700 text-white rounded-full p-4 shadow-xl hover:bg-green-600 transition-colors flex items-center justify-center group cursor-pointer"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out">
                        {t('admin_education')}
                    </span>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header Navigation */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => setMode('course')}
                            className={`text-lg font-bold px-2 py-1 cursor-pointer ${mode === 'course' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {isEditMode ? t('edit_course') : t('add_course')}
                        </button>
                        <button 
                            onClick={() => {
                                setLessonForm(prev => ({...INITIAL_LESSON_FORM, courseId: prev.courseId, id: null, title: '', contentBody: '', videoUrl: '', durationMinutes: 0}));
                                setMode('lesson');
                            }}
                            className={`text-lg font-bold px-2 py-1 cursor-pointer ${(mode === 'lesson' || mode === 'lesson_edit') ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {mode === 'lesson_edit' ? t('edit_lesson') : t('add_lesson')}
                        </button>
                    </div>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Form Area */}
                <div className="p-6 overflow-y-auto flex-1">
                    
                    {/* COURSE FORM */}
                    {mode === 'course' && (
                        <div className="space-y-6">
                            <form id="course-form" onSubmit={handleSubmitCourse} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('course_title')}</label>
                                    <input required type="text" name="title" value={courseForm.title} onChange={handleCourseChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('target_audience')}</label>
                                    <input required type="text" name="targetAudience" value={courseForm.targetAudience} onChange={handleCourseChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g., Pediatricians, Residents" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('description')}</label>
                                    <textarea required name="description" rows="3" value={courseForm.description} onChange={handleCourseChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"></textarea>
                                </div>
                                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('upload_course_cover')}</label>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} className="block w-full text-sm text-gray-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700" />
                                    {isUploading && <span className="text-sm text-green-600 mt-1 block">{t('uploading')}</span>}
                                    {courseForm.imageUrl && <div className="mt-2"><img src={courseForm.imageUrl} alt="Preview" className="w-24 h-16 object-cover rounded border border-gray-300" /></div>}
                                </div>
                            </form>

                            {/* Existing Lessons List (Only visible when editing a course) */}
                            {isEditMode && courseLessons.length > 0 && (
                                <div className="mt-8 border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">{t('existing_lessons')}</h3>
                                    <div className="space-y-3">
                                        {courseLessons.sort((a,b) => a.orderIndex - b.orderIndex).map((lesson) => (
                                            <div key={lesson.id} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                                                <div className="flex items-center">
                                                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded mr-3">
                                                        #{lesson.orderIndex}
                                                    </span>
                                                    <span className="font-medium text-gray-800">{lesson.title}</span>
                                                </div>
                                                <button 
                                                    onClick={() => editLesson(lesson)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors cursor-pointer"
                                                >
                                                    {t('edit_lesson')}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* LESSON FORM */}
                    {(mode === 'lesson' || mode === 'lesson_edit') && (
                        <form id="lesson-form" onSubmit={handleSubmitLesson} className="space-y-4">
                            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md mb-4 shadow-sm">
                                <label className="block text-sm font-bold text-yellow-800 mb-1">Parent Course ID</label>
                                <input required type="text" name="courseId" value={lessonForm.courseId} onChange={handleLessonChange} className="w-full border border-yellow-300 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm font-mono text-gray-600 bg-yellow-100/50" readOnly={isEditMode} placeholder="e.g., 123e4567-..." />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('lesson_title')}</label>
                                    <input required type="text" name="title" value={lessonForm.title} onChange={handleLessonChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500" />
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('order_index')}</label>
                                    <input required type="number" min="1" name="orderIndex" value={lessonForm.orderIndex} onChange={handleLessonChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('video_provider')}</label>
                                <select name="videoProvider" value={lessonForm.videoProvider} onChange={handleLessonChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500">
                                    <option value="DIRECT">Direct Upload / Local File</option>
                                    <option value="YOUTUBE">YouTube (Embed Link)</option>
                                    <option value="VIMEO">Vimeo (Embed Link)</option>
                                </select>
                            </div>

                            {/* Dynamic Video Input based on Provider */}
                            <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    {lessonForm.videoProvider === 'DIRECT' ? 'Direct Video URL' : t('video_url')}
                                </label>
                                
                                {lessonForm.videoProvider !== 'DIRECT' && (
                                    <p className="text-xs text-gray-500 mb-2">{t('embed_url_hint')}</p>
                                )}
                                
                                <input type="text" name="videoUrl" value={lessonForm.videoUrl} onChange={handleLessonChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500" placeholder="https://..." />
                                
                                {lessonForm.videoProvider === 'DIRECT' && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Or Upload Video File (.mp4)</label>
                                        <input 
                                            type="file" 
                                            accept="video/mp4,video/webm" 
                                            onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if (!file) return;
                                                setIsUploading(true);
                                                try {
                                                    const data = await uploadVideo(file);
                                                    setLessonForm(prev => ({
                                                        ...prev,
                                                        videoUrl: data.videoUrl
                                                    }));
                                                } catch (error) {
                                                    console.error("Video upload failed:", error);
                                                    alert("Failed to upload video file.");
                                                } finally {
                                                    setIsUploading(false);
                                                }
                                            }} 
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 cursor-pointer" 
                                        />
                                        {isUploading && <span className="text-sm text-green-600 mt-1 block">{t('uploading')}</span>}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('duration_mins')}</label>
                                <input required type="number" min="0" name="durationMinutes" value={lessonForm.durationMinutes} onChange={handleLessonChange} className="w-32 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500" />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('lesson_content')}</label>
                                <textarea required name="contentBody" rows="5" value={lessonForm.contentBody} onChange={handleLessonChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"></textarea>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                    <button type="button" onClick={handleClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                        {t('cancel')}
                    </button>
                    <button 
                        type="submit" 
                        form={mode === 'course' ? 'course-form' : 'lesson-form'} 
                        disabled={isSubmitting || isUploading} 
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 disabled:opacity-50 cursor-pointer"
                    >
                        {isSubmitting ? t('saving') : (mode === 'course' ? (isEditMode ? t('update_case') : t('save_course')) : (mode === 'lesson_edit' ? t('edit_lesson') : t('save_lesson')))}
                    </button>
                </div>

            </div>
        </div>
    );
}