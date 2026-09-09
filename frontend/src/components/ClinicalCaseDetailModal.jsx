import React from 'react';
import { useTranslation } from 'react-i18next';
import { deleteClinicalCase } from '../api';

export default function ClinicalCaseDetailModal({ caseData, caseDetails, onClose, isAdmin, onEdit, onDelete }) {
    const { t } = useTranslation();
    const activeCase = caseData || caseDetails;
    if (!activeCase) return null;

    // Safely parse Lab Results JSON
    let labResultsParsed = {};
    try {
        if (activeCase.labResults) {
            // It might be a stringified JSON string inside the DB
            let parsed = JSON.parse(activeCase.labResults);
            // If it's a string, parse it again (sometimes happens with double stringification)
            if (typeof parsed === 'string') {
                parsed = JSON.parse(parsed);
            }
            labResultsParsed = parsed;
        }
    } catch (e) {
        console.error("Failed to parse lab results JSON", e);
        // Fallback to displaying it as a simple string if parsing fails
        labResultsParsed = { "Notes": activeCase.labResults };
    }

    const handleDeleteClick = async () => {
        if (window.confirm("Are you sure you want to delete this clinical case?")) {
            try {
                await deleteClinicalCase(activeCase.id);
                if (onDelete) onDelete();
                onClose();
            } catch (err) {
                alert("Failed to delete case.");
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center z-[100] p-4 sm:p-6 overflow-y-auto backdrop-blur-md">
            <div className="bg-slate-900 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col my-auto max-h-full border border-slate-800 text-white animate-fadeIn">
                
                {/* Header Actions */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-950/80 sticky top-0 z-10">
                    <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center rounded-xl bg-blue-500/15 border border-blue-400/30 px-3 py-1 text-xs font-bold text-cyan-300">
                            {activeCase.category || 'General'}
                        </span>
                        {isAdmin && (
                            <div className="flex space-x-2">
                                <button 
                                    onClick={onEdit}
                                    className="bg-slate-800 text-cyan-300 px-3 py-1 text-xs font-bold rounded-xl shadow hover:bg-slate-700 border border-slate-700 flex items-center cursor-pointer"
                                    title={t('edit_case')}
                                >
                                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    {t('edit')}
                                </button>
                                <button 
                                    onClick={handleDeleteClick}
                                    className="bg-slate-800 text-rose-400 px-3 py-1 text-xs font-bold rounded-xl shadow hover:bg-slate-700 border border-slate-700 flex items-center cursor-pointer"
                                    title={t('delete_case')}
                                >
                                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    {t('delete')}
                                </button>
                            </div>
                        )}
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl p-2 transition cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* Content Body */}
                <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
                    
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 leading-tight">
                            {activeCase.title}
                        </h2>
                    </div>

                    {/* Image Section (if available) */}
                    {activeCase.imageUrl && (
                        <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex justify-center items-center max-h-[500px]">
                            <img 
                                src={activeCase.imageUrl} 
                                alt="Clinical case" 
                                className="max-w-full max-h-[500px] object-contain"
                            />
                        </div>
                    )}

                    {/* Presentation */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <span className="text-cyan-400">📋</span>
                            {t('clinical_presentation')}
                        </h3>
                        <div className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800">
                            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                                {activeCase.presentation}
                            </p>
                        </div>
                    </div>

                    {/* Lab Results / Diagnostics */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <span className="text-cyan-400">🔬</span>
                            {t('diagnostics')}
                        </h3>
                        <div className="bg-slate-950/60 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
                            <table className="min-w-full divide-y divide-slate-800">
                                <tbody className="divide-y divide-slate-800">
                                    {Object.entries(labResultsParsed).map(([key, value], index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/40'}>
                                            <td className="whitespace-nowrap py-3 pl-4 pr-3 text-xs sm:text-sm font-semibold text-cyan-300 sm:pl-6 w-1/3">
                                                {key}
                                            </td>
                                            <td className="py-3 pl-3 pr-4 text-xs sm:text-sm text-slate-300 sm:pr-6 whitespace-pre-wrap">
                                                {value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Management */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <span className="text-emerald-400">💊</span>
                            {t('diagnosis_management')}
                        </h3>
                        <div className="bg-blue-950/40 rounded-2xl p-5 border border-blue-500/30">
                            <p className="text-cyan-200 leading-relaxed whitespace-pre-wrap text-sm sm:text-base font-medium">
                                {activeCase.management}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="border-t border-slate-800 px-6 py-4 bg-slate-950/80 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition cursor-pointer border border-slate-700"
                    >
                        {t('close_case')}
                    </button>
                </div>
            </div>
        </div>
    );
}
