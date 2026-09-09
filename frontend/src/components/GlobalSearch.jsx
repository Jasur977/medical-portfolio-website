import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { searchEverything } from '../api';

const GlobalSearch = ({ onSelectCourse, onSelectCase }) => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            setResults(null);
            return;
        }
        setIsSearching(true);
        try {
            const data = await searchEverything(query);
            setResults(data);
        } catch (error) {
            console.error("Search failed:", error);
            setResults({ courses: [], cases: [] });
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectCourse = (course) => {
        onSelectCourse(course);
        setResults(null);
        setQuery('');
    };

    const handleSelectCase = (c) => {
        onSelectCase(c);
        setResults(null);
        setQuery('');
    };

    return (
        <div className="relative">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('search_placeholder')}
                    className="w-48 sm:w-60 pl-3.5 pr-8 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-inner"
                />
                <button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
                    {isSearching ? '...' : '🔍'}
                </button>
            </form>

            {results && (
                <div className="absolute mt-2 w-72 sm:w-80 right-0 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl z-50 text-white overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">{t('search_results')}</h3>
                            <button onClick={() => setResults(null)} className="text-xs text-slate-400 hover:text-white cursor-pointer">✕</button>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                                <span>🎓</span> {t('courses')}
                            </h4>
                            {results.courses.length > 0 ? (
                                <ul className="space-y-1">
                                    {results.courses.map(course => (
                                        <li key={course.id} className="cursor-pointer hover:bg-slate-800/80 p-2 rounded-xl text-xs font-medium text-slate-200 hover:text-cyan-300 transition" onClick={() => handleSelectCourse(course)}>
                                            {course.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : <p className="text-xs text-slate-500 italic py-1">{t('no_courses_found')}</p>}
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-800">
                            <h4 className="text-xs font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                                <span>📋</span> {t('clinical_cases')}
                            </h4>
                            {results.cases.length > 0 ? (
                                <ul className="space-y-1">
                                    {results.cases.map(c => (
                                        <li key={c.id} className="cursor-pointer hover:bg-slate-800/80 p-2 rounded-xl text-xs font-medium text-slate-200 hover:text-cyan-300 transition" onClick={() => handleSelectCase(c)}>
                                            {c.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : <p className="text-xs text-slate-500 italic py-1">{t('no_cases_found')}</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;