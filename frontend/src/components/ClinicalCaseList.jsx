import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchClinicalCases, deleteClinicalCase } from '../api';
import ClinicalCaseDetailModal from './ClinicalCaseDetailModal';

const ClinicalCaseList = forwardRef(({ isAdmin, onEditCase }, ref) => {
    const { t } = useTranslation();
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // State for the modal
    const [selectedCase, setSelectedCase] = useState(null);

    const loadCases = () => {
        setLoading(true);
        setError(null);
        fetchClinicalCases()
            .then(data => {
                setCases(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(t('failed_load_cases'));
                setLoading(false);
            });
    };

    useImperativeHandle(ref, () => ({
        refreshCases: loadCases
    }));

    useEffect(() => {
        loadCases();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (window.confirm(t('confirm_delete_case'))) {
            try {
                await deleteClinicalCase(id);
                loadCases(); 
            } catch (err) {
                alert(t('failed_delete_case'));
            }
        }
    };

    const handleEdit = (e, clinicalCase) => {
        e.stopPropagation();
        if (onEditCase) {
            onEditCase(clinicalCase);
        }
    };

    const categories = ['All', ...new Set(cases.map(c => c.category).filter(Boolean))];

    const filteredCases = selectedCategory === 'All' 
        ? cases 
        : cases.filter(c => c.category === selectedCategory);

    return (
        <div id="clinical-cases" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gray-50">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {t('clinical_case_repo')}
                </h2>
                <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                    {t('clinical_case_desc')}
                </p>
            </div>

            {!loading && cases.length > 0 && (
                <div className="flex justify-center mb-10 space-x-2 flex-wrap gap-y-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedCategory === category 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            {category === 'All' ? t('all_categories') : category}
                        </button>
                    ))}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center text-red-600 max-w-md mx-auto">
                    <p className="font-semibold">{error}</p>
                    <button 
                        onClick={loadCases} 
                        className="mt-3 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                        {t('retry')}
                    </button>
                </div>
            ) : cases.length === 0 ? (
                <div className="bg-white p-12 rounded-xl border border-gray-200 text-center shadow-sm">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <h3 className="text-lg font-medium text-gray-900">{t('no_cases_available')}</h3>
                    <p className="mt-2 text-gray-500">{t('no_cases_desc')}</p>
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-2">
                    {filteredCases.map((clinicalCase) => (
                        <div key={clinicalCase.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col relative group">
                            
                            {isAdmin && (
                                <div className="absolute top-2 right-2 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={(e) => handleEdit(e, clinicalCase)}
                                        className="bg-white text-blue-600 p-1.5 rounded-md shadow hover:bg-blue-50 border border-blue-100"
                                        title={t('edit_case')}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    </button>
                                    <button 
                                        onClick={(e) => handleDelete(e, clinicalCase.id)}
                                        className="bg-white text-red-600 p-1.5 rounded-md shadow hover:bg-red-50 border border-red-100"
                                        title={t('delete_case')}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            )}

                            {clinicalCase.imageUrl && (
                                <div className="w-full h-48 bg-gray-100 relative overflow-hidden">
                                    <img 
                                        src={clinicalCase.imageUrl} 
                                        alt="Clinical imagery" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                </div>
                            )}

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-0.5 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        {clinicalCase.category || 'General'}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{clinicalCase.title}</h3>
                                
                                <div className="space-y-4 text-sm text-gray-600 flex-1">
                                    <div>
                                        <strong className="text-gray-900 block mb-1">{t('presentation')}</strong>
                                        <p className="line-clamp-2">{clinicalCase.presentation}</p>
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                                    <button 
                                        onClick={() => setSelectedCase(clinicalCase)}
                                        className="text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center cursor-pointer"
                                    >
                                        {t('read_full_case')}
                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedCase && (
                <ClinicalCaseDetailModal 
                    caseData={selectedCase} 
                    onClose={() => setSelectedCase(null)} 
                />
            )}
        </div>
    );
});

export default ClinicalCaseList;