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
        <div id="education" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#0B1120] border-t border-slate-800/80 text-white scroll-mt-16">
            <div className="text-center mb-16">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-blue-500/15 border border-blue-500/30 px-3.5 py-1.5 rounded-full shadow-sm">
                    {t('medical_education_sub')}
                </span>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mt-3">
                    {t('medical_education')}
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
                    {t('medical_education_desc')}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                </div>
            ) : error ? (
                <div className="bg-rose-950/40 p-6 rounded-2xl border border-rose-500/40 text-center text-rose-300 max-w-md mx-auto">
                    <p className="font-semibold">{error}</p>
                    <button 
                        onClick={loadCourses} 
                        className="mt-3 px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                        {t('retry')}
                    </button>
                </div>
            ) : courses.length === 0 ? (
                <div className="bg-slate-900/80 p-12 rounded-2xl border border-slate-800 text-center shadow-xl max-w-2xl mx-auto">
                    <svg className="mx-auto h-12 w-12 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    <h3 className="text-lg font-bold text-white">{t('no_courses_available')}</h3>
                    <p className="mt-2 text-slate-400">{t('no_courses_desc')}</p>
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
                {courses.map(course => (
                    <div key={course.id} className="flex flex-col bg-slate-900/80 rounded-2xl shadow-xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all transform hover:-translate-y-1 relative group">
                        
                        {isAdmin && (
                            <div className="absolute top-3 right-3 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={(e) => handleEdit(e, course)}
                                    className="bg-slate-800 text-cyan-300 p-2 rounded-xl shadow-lg hover:bg-slate-700 border border-slate-700 cursor-pointer"
                                    title={t('edit_course')}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                </button>
                                <button 
                                    onClick={(e) => handleDelete(e, course.id)}
                                    className="bg-slate-800 text-rose-400 p-2 rounded-xl shadow-lg hover:bg-slate-700 border border-slate-700 cursor-pointer"
                                    title={t('delete')}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        )}

                        <div className="h-48 bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950 relative flex items-center justify-center">
                            {course.imageUrl ? (
                                <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300" />
                            ) : (
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path></svg>
                                </div>
                            )}
                            <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-800 shadow-lg">
                                {course.lessons?.length || 0} {t('lessons')}
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <div className="mb-2">
                                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{t('course')}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-cyan-300 transition">{course.title}</h3>
                            <p className="text-slate-400 text-xs sm:text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                                {course.description}
                            </p>
                            
                            <div className="border-t border-slate-800 pt-4 mt-auto">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-xs text-slate-400">
                                        <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                        <span className="truncate max-w-[150px]" title={course.targetAudience}>{course.targetAudience}</span>
                                    </div>
                                    <button 
                                        onClick={() => onSelectCourse(course)}
                                        className="inline-flex items-center text-xs font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer"
                                    >
                                        {t('start_course')} <svg className="ml-1 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
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