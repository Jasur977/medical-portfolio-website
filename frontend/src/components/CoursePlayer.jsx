import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminLessonPanel from './AdminLessonPanel';

export default function CoursePlayer({ course, onBack, isAdmin }) {
    const { t } = useTranslation();
    const sortedLessons = [...(course.lessons || [])].sort((a, b) => a.orderIndex - b.orderIndex);
    const [activeLesson, setActiveLesson] = useState(sortedLessons.length > 0 ? sortedLessons[0] : null);
    
    const [showLessonPanel, setShowLessonPanel] = useState(false);
    const [lessonToEdit, setLessonToEdit] = useState(null);

    if (!course) return null;

    const handleLessonAdded = () => {
        setShowLessonPanel(false);
        setLessonToEdit(null);
        alert("Lesson saved! Please click 'Back to Courses' and re-enter to see the updated syllabus.");
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20 relative">
            {/* Header / Navigation */}
            <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <button 
                        onClick={onBack}
                        className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        {t('back_to_courses', 'Back to Courses')}
                    </button>
                    <h2 className="text-lg font-bold text-gray-900 truncate max-w-lg hidden sm:block">
                        {course.title}
                    </h2>
                    <div className="w-24"></div> {/* Spacer */}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Mobile Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-6 sm:hidden">{course.title}</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Main Content Area */}
                    <div className="lg:w-2/3 flex flex-col gap-6">
                        <div className="bg-black rounded-xl overflow-hidden shadow-lg aspect-video relative flex items-center justify-center">
                            {activeLesson && activeLesson.videoUrl ? (
                                <iframe 
                                    className="absolute inset-0 w-full h-full"
                                    src={activeLesson.videoUrl} 
                                    title={activeLesson.title}
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="text-white text-center p-6">
                                    <svg className="mx-auto h-12 w-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                    <p className="text-lg font-medium">{t('no_video_available', 'No video available for this lesson.')}</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                            {activeLesson ? (
                                <>
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeLesson.title}</h2>
                                        {isAdmin && (
                                            <button 
                                                onClick={() => { setLessonToEdit(activeLesson); setShowLessonPanel(true); }}
                                                className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center bg-indigo-50 px-2 py-1 rounded border border-indigo-100"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                {t('edit_lesson', 'Edit Lesson')}
                                            </button>
                                        )}
                                    </div>
                                    {activeLesson.durationMinutes && (
                                        <p className="text-sm text-gray-500 mb-6 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            {activeLesson.durationMinutes} {t('mins', 'mins')}
                                        </p>
                                    )}
                                    <div className="prose max-w-none text-gray-700">
                                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-4">{t('lesson_notes', 'Lesson Notes')}</h3>
                                        <p className="whitespace-pre-wrap leading-relaxed">{activeLesson.contentBody}</p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-10 text-gray-500">{t('select_lesson_begin', 'Select a lesson from the syllabus to begin.')}</div>
                            )}
                        </div>

                    </div>

                    {/* Sidebar Syllabus */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-24 overflow-hidden flex flex-col max-h-[80vh]">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{t('course_syllabus', 'Course Syllabus')}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{sortedLessons.length} {t('modules', 'Modules')}</p>
                                </div>
                                {isAdmin && (
                                    <button 
                                        onClick={() => { setLessonToEdit(null); setShowLessonPanel(true); }}
                                        className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 p-2 rounded-full"
                                        title={t('add_new_lesson', 'Add New Lesson')}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                    </button>
                                )}
                            </div>
                            
                            <div className="overflow-y-auto flex-1">
                                {sortedLessons.length === 0 ? (
                                    <div className="p-6 text-center text-gray-500 text-sm">{t('no_lessons_found', 'No lessons found for this course.')}</div>
                                ) : (
                                    <ul className="divide-y divide-gray-100">
                                        {sortedLessons.map((lesson, index) => {
                                            const isActive = activeLesson && activeLesson.id === lesson.id;
                                            return (
                                                <li key={lesson.id}>
                                                    <button 
                                                        onClick={() => setActiveLesson(lesson)}
                                                        className={`w-full text-left px-6 py-4 transition-colors flex items-start ${
                                                            isActive ? 'bg-blue-50 hover:bg-blue-50' : 'hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold ${
                                                            isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                                                        }`}>
                                                            {index + 1}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className={`text-sm font-semibold mb-1 ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                                                                {lesson.title}
                                                            </h4>
                                                            <div className="flex items-center text-xs text-gray-500">
                                                                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                {t('video', 'Video')} • {lesson.durationMinutes || '--'} {t('mins', 'min')}
                                                            </div>
                                                        </div>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Admin Modal for Lessons */}
            {showLessonPanel && (
                <AdminLessonPanel 
                    courseId={course.id}
                    lessonToEdit={lessonToEdit}
                    onClose={() => { setShowLessonPanel(false); setLessonToEdit(null); }}
                    onLessonAdded={handleLessonAdded}
                />
            )}
        </div>
    );
}
