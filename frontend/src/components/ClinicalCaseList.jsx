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
        <div id="clinical-cases" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#070c18] border-t border-slate-800/80 text-white scroll-mt-16">
            <div className="text-center mb-14">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/25 shadow-sm">
                    {t('nav_clinical_cases')}
                </span>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mt-3">
                    {t('clinical_case_repo')}
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
                    {t('clinical_case_desc')}
                </p>
            </div>

            {!loading && cases.length > 0 && (
                <div className="flex justify-center mb-12 space-x-2 flex-wrap gap-y-2.5">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                selectedCategory === category 
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950' 
                                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'
                            }`}
                        >
                            {category === 'All' ? t('all_categories') : category}
                        </button>
                    ))}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                </div>
            ) : error ? (
                <div className="bg-rose-950/40 p-6 rounded-2xl border border-rose-500/40 text-center text-rose-300 max-w-md mx-auto">
                    <p className="font-semibold">{error}</p>
                    <button 
                        onClick={loadCases} 
                        className="mt-3 px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                        {t('retry')}
                    </button>
                </div>
            ) : cases.length === 0 ? (
                <div className="bg-slate-900/80 p-12 rounded-2xl border border-slate-800 text-center shadow-xl">
                    <svg className="mx-auto h-12 w-12 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <h3 className="text-lg font-bold text-white">{t('no_cases_available')}</h3>
                    <p className="mt-2 text-slate-400">{t('no_cases_desc')}</p>
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-2">
                    {filteredCases.map((clinicalCase) => (
                        <div key={clinicalCase.id} className="bg-slate-900/80 rounded-2xl shadow-xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all flex flex-col relative group">
                            
                            {isAdmin && (
                                <div className="absolute top-3 right-3 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={(e) => handleEdit(e, clinicalCase)}
                                        className="bg-slate-800 text-cyan-300 p-2 rounded-xl shadow-lg hover:bg-slate-700 border border-slate-700 cursor-pointer"
                                        title={t('edit_case')}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    </button>
                                    <button 
                                        onClick={(e) => handleDelete(e, clinicalCase.id)}
                                        className="bg-slate-800 text-rose-400 p-2 rounded-xl shadow-lg hover:bg-slate-700 border border-slate-700 cursor-pointer"
                                        title={t('delete_case')}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            )}

                            {clinicalCase.imageUrl && (
                                <div className="w-full h-48 bg-slate-950 relative overflow-hidden">
                                    <img 
                                        src={clinicalCase.imageUrl} 
                                        alt="Clinical imagery" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                </div>
                            )}

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-flex items-center rounded-lg bg-blue-500/15 border border-blue-400/30 px-2.5 py-1 text-xs font-bold text-cyan-300">
                                        {clinicalCase.category || 'General'}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition">{clinicalCase.title}</h3>
                                
                                <div className="space-y-4 text-xs sm:text-sm text-slate-400 flex-1">
                                    <div>
                                        <strong className="text-slate-200 block mb-1">{t('presentation')}</strong>
                                        <p className="line-clamp-2 leading-relaxed">{clinicalCase.presentation}</p>
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-800 flex justify-between items-center">
                                    <button 
                                        onClick={() => setSelectedCase(clinicalCase)}
                                        className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors flex items-center cursor-pointer text-sm"
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