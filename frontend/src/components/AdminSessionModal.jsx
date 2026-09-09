import React from 'react';
import { useTranslation } from 'react-i18next';

export function AdminSessionBadge({ formattedTime, remainingSeconds, onExtend }) {
    const { t } = useTranslation();
    const isUrgent = remainingSeconds <= 120;

    return (
        <div 
            className={`hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-xl border text-xs font-bold transition-all ${
                isUrgent 
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse' 
                    : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
            }`}
            title={`${t('session_expires_in')}: ${formattedTime}`}
        >
            <span className="flex h-2 w-2 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isUrgent ? 'bg-rose-400' : 'bg-emerald-400'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                    isUrgent ? 'bg-rose-500' : 'bg-emerald-500'
                }`}></span>
            </span>
            <span className="tracking-wide">
                ⏱️ {formattedTime}
            </span>
            <button
                onClick={onExtend}
                className="hover:text-white transition-colors cursor-pointer text-[11px] underline ml-0.5"
                title={t('extend_session')}
            >
                {t('extend_session')}
            </button>
        </div>
    );
}

export default function AdminSessionModal({ isOpen, remainingSeconds, onExtend, onLogout }) {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-amber-500/10 text-center relative overflow-hidden">
                {/* Glowing ambient warning blur */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h3 className="text-xl font-black text-white tracking-tight mb-2">
                    {t('session_warning_title')}
                </h3>

                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    {t('session_warning_desc', { seconds: remainingSeconds })}
                </p>

                {/* Big countdown badge */}
                <div className="inline-block bg-slate-950/80 border border-amber-500/30 px-6 py-2.5 rounded-2xl text-2xl font-black text-amber-400 mb-6 shadow-inner font-mono tracking-wider">
                    00:{String(remainingSeconds).padStart(2, '0')}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={onExtend}
                        className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition cursor-pointer border border-cyan-400/30"
                    >
                        {t('stay_logged_in')}
                    </button>
                    <button
                        onClick={onLogout}
                        className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-sm transition cursor-pointer border border-slate-700"
                    >
                        {t('logout_admin')}
                    </button>
                </div>
            </div>
        </div>
    );
}
