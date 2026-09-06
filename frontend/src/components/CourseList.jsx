import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchCourses, deleteCourse } from '../api';

const CourseList = forwardRef(({ onSelectCourse, isAdmin, onEditCourse }, ref) => {
    const { t } = useTranslation();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadCourses = () => {
        setLoading(true);
        fetchCourses()
            .then(data => {
                setCourses(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(t('failed_load_courses'));
                setLoading(false);
            });
    };

    useImperativeHandle(ref, () => ({
        refreshCourses: loadCourses
    }));

    useEffect(() => {
        loadCourses();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (window.confirm(t('confirm_delete_course'))) {
            try {
                await deleteCourse(id);
                loadCourses();
            } catch (err) {
                alert(t('failed_delete_course'));
            }
        }
    };

    const handleEdit = (e, course) => {
        e.stopPropagation();
        if (onEditCourse) {
            onEditCourse(course);
        }
    };

    return (
        <div id="education" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white border-t border-slate-200">
            <div className="text-center mb-16">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {t('medical_education_sub')}
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-3">
                    {t('medical_education')}
                </h2>
                <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                    {t('medical_education_desc')}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center text-red-600 max-w-md mx-auto">
                    <p className="font-semibold">{error}</p>
                    <button 
                        onClick={loadCourses} 
                        className="mt-3 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                        {t('retry')}
                    </button>
                </div>
            ) : courses.length === 0 ? (
                <div className="bg-white p-12 rounded-xl border border-gray-200 text-center shadow-sm max-w-2xl mx-auto">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    <h3 className="text-lg font-medium text-gray-900">{t('no_courses_available')}</h3>
                    <p className="mt-2 text-gray-500">{t('no_courses_desc')}</p>
                </div>
            ) : (
                <div className="grid gap-10 lg:grid-cols-3 md:grid-cols-2">
                {courses.map(course => (
                    <div key={course.id} className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 relative group">
                        
                        {isAdmin && (
                            <div className="absolute top-2 right-2 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={(e) => handleEdit(e, course)}
                                    className="bg-white text-green-600 p-1.5 rounded-md shadow hover:bg-green-50 border border-green-100"
                                    title={t('edit_course')}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                </button>
                                <button 
                                    onClick={(e) => handleDelete(e, course.id)}
                                    className="bg-white text-red-600 p-1.5 rounded-md shadow hover:bg-red-50 border border-red-100"
                                    title={t('delete')}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        )}

                        <div className="h-48 bg-gradient-to-r from-blue-700 to-blue-900 relative flex items-center justify-center">
                            {course.imageUrl ? (
                                <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover opacity-80" />
                            ) : (
                                <svg className="w-20 h-20 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            )}
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-blue-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                                {course.lessons?.length || 0} {t('lessons')}
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <div className="mb-2">
                                <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">{t('course')}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{course.title}</h3>
                            <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">
                                {course.description}
                            </p>
                            
                            <div className="border-t border-gray-100 pt-4 mt-auto">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                        <span className="truncate max-w-[150px]" title={course.targetAudience}>{course.targetAudience}</span>
                                    </div>
                                    <button 
                                        onClick={() => onSelectCourse(course)}
                                        className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
                                    >
                                        {t('start_course')} <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
});

export default CourseList;