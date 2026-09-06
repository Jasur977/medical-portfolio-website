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
                    className="px-4 py-2 border rounded-md"
                />
                <button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
                    {isSearching ? '...' : '🔍'}
                </button>
            </form>

            {results && (
                <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-50">
                    <div className="p-4">
                        <h3 className="font-bold">{t('search_results')}</h3>
                        <div className="mt-2">
                            <h4 className="font-semibold">{t('courses')}</h4>
                            {results.courses.length > 0 ? (
                                <ul>
                                    {results.courses.map(course => (
                                        <li key={course.id} className="cursor-pointer hover:bg-gray-200 p-2" onClick={() => handleSelectCourse(course)}>
                                            {course.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : <p>{t('no_courses_found')}</p>}
                        </div>
                        <div className="mt-2">
                            <h4 className="font-semibold">{t('clinical_cases')}</h4>
                            {results.cases.length > 0 ? (
                                <ul>
                                    {results.cases.map(c => (
                                        <li key={c.id} className="cursor-pointer hover:bg-gray-200 p-2" onClick={() => handleSelectCase(c)}>
                                            {c.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : <p>{t('no_cases_found')}</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;