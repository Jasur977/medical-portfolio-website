import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { login } from '../api';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(username, password);
            onLoginSuccess();
            setUsername('');
            setPassword('');
        } catch (err) {
            setError(t('invalid_credentials'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center z-[100] p-4 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden text-white animate-fadeIn">
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/80">
                    <h2 className="text-lg font-bold text-white">{t('admin_login')}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="mb-4 bg-rose-950/40 text-rose-300 p-3 rounded-xl text-xs border border-rose-500/40">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('username')}</label>
                            <input 
                                type="text" 
                                required 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-2.5 text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('password')}</label>
                            <input 
                                type="password" 
                                required 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl shadow-inner p-2.5 text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" 
                            />
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/25 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 cursor-pointer transition-all"
                            >
                                {isLoading ? t('authenticating') : t('sign_in')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
