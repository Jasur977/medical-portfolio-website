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
        <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center z-[100] p-4 sm:p-6 overflow-y-auto backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col my-auto max-h-full">
                
                {/* Header Actions */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10">
                    <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                            {activeCase.category || 'General'}
                        </span>
                        {isAdmin && (
                            <div className="flex space-x-2">
                                <button 
                                    onClick={onEdit}
                                    className="bg-white text-blue-600 px-2 py-1 text-xs font-semibold rounded shadow hover:bg-blue-50 border border-blue-100 flex items-center cursor-pointer"
                                    title={t('edit_case')}
                                >
                                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    {t('edit')}
                                </button>
                                <button 
                                    onClick={handleDeleteClick}
                                    className="bg-white text-red-600 px-2 py-1 text-xs font-semibold rounded shadow hover:bg-red-50 border border-red-100 flex items-center cursor-pointer"
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
                        className="text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-100 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* Content Body */}
                <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
                    
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
                            {activeCase.title}
                        </h2>
                    </div>

                    {/* Image Section (if available) */}
                    {activeCase.imageUrl && (
                        <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex justify-center items-center max-h-[500px]">
                            <img 
                                src={activeCase.imageUrl} 
                                alt="Clinical case" 
                                className="max-w-full max-h-[500px] object-contain"
                            />
                        </div>
                    )}

                    {/* Presentation */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            {t('clinical_presentation')}
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {activeCase.presentation}
                            </p>
                        </div>
                    </div>

                    {/* Lab Results / Diagnostics */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                            {t('diagnostics')}
                        </h3>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200">
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {Object.entries(labResultsParsed).map(([key, value], index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6 w-1/3">
                                                {key}
                                            </td>
                                            <td className="py-3 pl-3 pr-4 text-sm text-gray-700 sm:pr-6 whitespace-pre-wrap">
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
                        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            {t('diagnosis_management')}
                        </h3>
                        <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                            <p className="text-blue-900 leading-relaxed whitespace-pre-wrap font-medium">
                                {activeCase.management}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer"
                    >
                        {t('close_case')}
                    </button>
                </div>
            </div>
        </div>
    );
}
