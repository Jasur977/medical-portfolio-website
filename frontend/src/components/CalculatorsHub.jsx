import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CALCULATORS_DATA } from '../data/calculatorsEngine';

// Translation dictionary for calculator input fields and options
const FIELD_TRANSLATIONS = {
    // Growth & Anthropometry
    'Measured Height': { ru: 'Измеренный рост', uz: 'O‘lchangan bo‘y' },
    'Height': { ru: 'Рост', uz: 'Bo‘y' },
    'Initial Height': { ru: 'Первоначальный рост', uz: 'Boshlang‘ich bo‘y' },
    'Current Height': { ru: 'Текущий рост', uz: 'Hozirgi bo‘y' },
    'Interval Between Visits': { ru: 'Интервал между визитами', uz: 'Tashriflar oralig‘i' },
    'Weight': { ru: 'Масса тела', uz: 'Tana vazni' },
    'Patient Weight': { ru: 'Вес пациента', uz: 'Bemor vazni' },
    'Age': { ru: 'Возраст', uz: 'Yoshi' },
    'Chronological Age': { ru: 'Хронологический возраст', uz: 'Xronologik yoshi' },
    'Bone Age': { ru: 'Костный возраст', uz: 'Suyak yoshi' },
    'Bone Age (Greulich-Pyle)': { ru: 'Костный возраст (Грейлих-Пайл)', uz: 'Suyak yoshi (Greylix-Payl)' },
    'Radiographic Bone Age': { ru: 'Рентгенологический костный возраст', uz: 'Rentgenologik suyak yoshi' },
    "Father's Height": { ru: 'Рост отца', uz: 'Otasining bo‘yi' },
    "Mother's Height": { ru: 'Рост матери', uz: 'Onasining bo‘yi' },
    'Sitting Height': { ru: 'Рост сидя', uz: 'O‘tirgan holatdagi bo‘y' },
    'Total Standing Height': { ru: 'Общий рост стоя', uz: 'Umumiy tik turgan bo‘y' },
    'Sex': { ru: 'Пол', uz: 'Jinsi' },
    "Child's Sex": { ru: 'Пол ребенка', uz: 'Bolaning jinsi' },
    'Boy (Male)': { ru: 'Мальчик (муж.)', uz: 'O‘g‘il bola' },
    'Girl (Female)': { ru: 'Девочка (жен.)', uz: 'Qiz bola' },
    'Boy (+13 cm)': { ru: 'Мальчик (+13 см)', uz: 'O‘g‘il bola (+13 sm)' },
    'Girl (-13 cm)': { ru: 'Девочка (-13 см)', uz: 'Qiz bola (-13 sm)' },
    'Boy': { ru: 'Мальчик', uz: 'O‘g‘il bola' },
    'Girl': { ru: 'Девочка', uz: 'Qiz bola' },
    'Male': { ru: 'Мужской', uz: 'Erkak' },
    'Female': { ru: 'Женский', uz: 'Ayol' },
    'Clinical Indication': { ru: 'Клиническое показание', uz: 'Klinik ko‘rsatma' },

    // Hormones & Lab measurements
    'Serum Creatinine': { ru: 'Креатинин сыворотки', uz: 'Zardob kreatinini' },
    'Blood Glucose': { ru: 'Глюкоза крови', uz: 'Qon glyukozasi' },
    'HbA1c': { ru: 'Гликированный гемоглобин HbA1c', uz: 'Glikirlangan gemoglobin HbA1c' },
    'Total Cholesterol': { ru: 'Общий холестерин', uz: 'Umumiy xolesterin' },
    'HDL Cholesterol': { ru: 'Холестерин ЛПВП', uz: 'HDL xolesterin' },
    'LDL Cholesterol': { ru: 'Холестерин ЛПНП', uz: 'LDL xolesterin' },
    'Triglycerides': { ru: 'Триглицериды', uz: 'Triglitseridlar' },
    'TSH': { ru: 'Тиреотропный гормон (ТТГ)', uz: 'Tireotrop gormon (TSH)' },
    'Free T4': { ru: 'Свободный Т4', uz: 'Erkin T4' },
    'Total Calcium': { ru: 'Общий кальций', uz: 'Umumiy kalsiy' },
    'Serum Albumin': { ru: 'Альбумин сыворотки', uz: 'Zardob albumini' },
    'Serum Phosphorus': { ru: 'Фосфор сыворотки', uz: 'Zardob fosfori' },
    'Serum Sodium': { ru: 'Натрий сыворотки', uz: 'Zardob natriysi' },
    'Serum Potassium': { ru: 'Калий сыворотки', uz: 'Zardob kaliysi' },
    'Systolic BP': { ru: 'Систолическое АД', uz: 'Sistolik qon bosimi' },
    'Diastolic BP': { ru: 'Диастолическое АД', uz: 'Diastolik qon bosimi' },
    'Physical Activity Level': { ru: 'Уровень физической активности', uz: 'Jismoniy faollik darajasi' }
};

export default function CalculatorsHub() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';

    const [activeCat, setActiveCat] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCalc, setSelectedCalc] = useState(null);

    // Interactive Calculator form states
    const [calcInputs, setCalcInputs] = useState({});
    const [calcResult, setCalcResult] = useState(null);
    const [showEvidence, setShowEvidence] = useState(false);

    // Pagination / Limit states (show 6 by default)
    const INITIAL_LIMIT = 6;
    const [visibleLimit, setVisibleLimit] = useState(INITIAL_LIMIT);

    // Reset pagination when category or search changes
    useEffect(() => {
        setVisibleLimit(INITIAL_LIMIT);
    }, [activeCat, searchQuery]);

    const categories = [
        { id: 'all', label: t('all_categories'), count: 50 },
        { id: 'growth', label: t('cat_growth'), count: 15 },
        { id: 'puberty', label: t('cat_puberty'), count: 7 },
        { id: 'adrenal', label: t('cat_adrenal'), count: 7 },
        { id: 'diabetes', label: t('cat_diabetes'), count: 8 },
        { id: 'nutrition', label: t('cat_nutrition'), count: 6 },
        { id: 'thyroid', label: t('cat_thyroid'), count: 4 },
        { id: 'metabolic', label: t('cat_metabolic'), count: 3 }
    ];

    // Helper for translating input and option labels
    const getTranslatedLabel = (label) => {
        if (!label) return '';
        if (FIELD_TRANSLATIONS[label] && FIELD_TRANSLATIONS[label][currentLang]) {
            return FIELD_TRANSLATIONS[label][currentLang];
        }
        return label;
    };

    // Filter calculators based on Category and Search Query
    const filteredCalculators = useMemo(() => {
        return CALCULATORS_DATA.filter(calc => {
            const matchesCat = activeCat === 'all' || calc.cat === activeCat;
            if (!matchesCat) return false;

            if (!searchQuery.trim()) return true;

            const q = searchQuery.toLowerCase();
            const title = (calc.title[currentLang] || calc.title.en).toLowerCase();
            const desc = (calc.desc[currentLang] || calc.desc.en).toLowerCase();
            const formula = (calc.formula || '').toLowerCase();
            const guideline = (calc.guideline || '').toLowerCase();

            return title.includes(q) || desc.includes(q) || formula.includes(q) || guideline.includes(q) || calc.id.includes(q);
        });
    }, [activeCat, searchQuery, currentLang]);

    // Open calculator and automatically initialize default inputs & initial calculation
    const handleOpenCalculator = (calc) => {
        const initialInputs = {};
        if (calc.fields) {
            calc.fields.forEach(f => {
                initialInputs[f.id] = f.default !== undefined ? f.default : '';
            });
        }
        setSelectedCalc(calc);
        setCalcInputs(initialInputs);
        setShowEvidence(false);

        if (calc.calculate) {
            try {
                const res = calc.calculate(initialInputs);
                setCalcResult(res);
            } catch (err) {
                console.error('Calculation error on init:', err);
                setCalcResult(null);
            }
        }
    };

    // Live update of calculation when input changes
    const handleInputChange = (fieldId, value) => {
        const updated = {
            ...calcInputs,
            [fieldId]: value
        };
        setCalcInputs(updated);

        if (selectedCalc && selectedCalc.calculate) {
            try {
                const res = selectedCalc.calculate(updated);
                setCalcResult(res);
            } catch (err) {
                console.error('Calculation error:', err);
            }
        }
    };

    const handleRunCalculation = () => {
        if (selectedCalc && selectedCalc.calculate) {
            try {
                const res = selectedCalc.calculate(calcInputs);
                setCalcResult(res);
            } catch (err) {
                console.error('Manual calculation error:', err);
            }
        }
    };

    return (
        <section id="calculators" className="py-20 bg-[#0B1120] border-t border-slate-800/80 text-white scroll-mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-500/15 border border-blue-400/30 text-cyan-300 mb-4 shadow-lg backdrop-blur-md">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        {t('calculators_badge')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {t('platform_title')}
                    </h2>
                    <p className="mt-3 text-base sm:text-lg text-slate-400">
                        {t('platform_subtitle')}
                    </p>
                </div>

                {/* Quick Search Bar */}
                <div className="max-w-xl mx-auto mb-10 relative">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('search_calculators_placeholder')}
                            className="block w-full pl-11 pr-10 py-3.5 border border-slate-700/80 rounded-2xl bg-slate-900/90 text-white placeholder-slate-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm transition"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    {categories.map(cat => {
                        const isActive = activeCat === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCat(cat.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm ${
                                    isActive
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950'
                                        : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800 hover:border-slate-700'
                                }`}
                            >
                                <span>{cat.label}</span>
                                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-blue-800/80 text-cyan-200' : 'bg-slate-800 text-slate-400'}`}>
                                    {cat.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Calculators Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCalculators.slice(0, visibleLimit).map(calc => {
                        const title = calc.title[currentLang] || calc.title.en;
                        const desc = calc.desc[currentLang] || calc.desc.en;
                        return (
                            <div 
                                key={calc.id} 
                                className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800 shadow-lg hover:shadow-2xl hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all flex flex-col justify-between p-6 group hover:-translate-y-0.5"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-slate-500 group-hover:text-cyan-400 transition font-mono">
                                            #{calc.num}
                                        </span>
                                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                            {t('live_tool')}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition line-clamp-1">
                                        {title}
                                    </h3>
                                    <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                        {desc}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                                    <span className="text-[11px] font-medium text-slate-400 truncate max-w-[160px]" title={calc.guideline}>
                                        📚 {calc.guideline}
                                    </span>
                                    <button
                                        onClick={() => handleOpenCalculator(calc)}
                                        className="inline-flex items-center text-xs font-bold text-cyan-300 group-hover:text-white bg-blue-500/15 hover:bg-blue-600/80 border border-blue-400/30 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer"
                                    >
                                        {t('run_calculator')}
                                        <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Show More / Show Less & Counter */}
                {filteredCalculators.length > INITIAL_LIMIT && (
                    <div className="mt-12 flex flex-col items-center justify-center gap-3.5">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {visibleLimit < filteredCalculators.length ? (
                                <button
                                    type="button"
                                    onClick={() => setVisibleLimit(prev => Math.min(prev + 6, filteredCalculators.length))}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-blue-500/25 cursor-pointer"
                                >
                                    <span>{t('show_more_calculators')}</span>
                                    <span className="text-xs bg-slate-950/40 px-2 py-0.5 rounded-full font-bold">
                                        +{Math.min(6, filteredCalculators.length - visibleLimit)}
                                    </span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setVisibleLimit(INITIAL_LIMIT);
                                        const el = document.getElementById('calculators');
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
                                >
                                    <span>{t('show_less_calculators')}</span>
                                    <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                            )}

                            {visibleLimit < filteredCalculators.length && filteredCalculators.length > visibleLimit + 6 && (
                                <button
                                    type="button"
                                    onClick={() => setVisibleLimit(filteredCalculators.length)}
                                    className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition cursor-pointer"
                                >
                                    {t('see_all')} ({filteredCalculators.length})
                                </button>
                            )}
                        </div>

                        <p className="text-xs text-slate-500 font-medium">
                            {t('showing_calculators', { count: Math.min(visibleLimit, filteredCalculators.length), total: filteredCalculators.length })}
                        </p>
                    </div>
                )}

                {filteredCalculators.length === 0 && (
                    <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-slate-800">
                        <p className="text-slate-400 font-medium">{t('no_cases_found')}</p>
                        <button 
                            onClick={() => { setSearchQuery(''); setActiveCat('all'); }}
                            className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-500 cursor-pointer"
                        >
                            {t('reset_filters')}
                        </button>
                    </div>
                )}
            </div>

            {/* ========================================================= */}
            {/* Interactive Calculator Modal (Compact, Professional)       */}
            {/* ========================================================= */}
            {selectedCalc && (
                <div 
                    className="fixed inset-0 bg-slate-950/80 z-[100] flex items-center justify-center p-3 sm:p-4 backdrop-blur-md overflow-y-auto"
                    onClick={(e) => { if (e.target === e.currentTarget) setSelectedCalc(null); }}
                >
                    <div className="bg-slate-900 rounded-3xl shadow-2xl w-full max-w-xl sm:max-w-2xl overflow-hidden flex flex-col my-auto max-h-[92vh] border border-slate-800 text-white animate-fadeIn">
                        
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex justify-between items-center">
                            <div>
                                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                                    {t('tool_number')} #{selectedCalc.num} • {selectedCalc.cat.toUpperCase()}
                                </span>
                                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                                    {selectedCalc.title[currentLang] || selectedCalc.title.en}
                                </h3>
                            </div>
                            <button 
                                onClick={() => setSelectedCalc(null)} 
                                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                                aria-label="Close"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto space-y-4 flex-1">
                            
                            {/* Compact Clinical Disclaimer Alert */}
                            <div className="py-2.5 px-3.5 bg-amber-950/40 border border-amber-500/30 rounded-xl text-[11px] text-amber-200 flex items-center gap-2">
                                <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                <span><strong className="font-semibold text-amber-300">{t('clinical_disclaimer_badge')}:</strong> {t('clinical_disclaimer_text')}</span>
                            </div>

                            {/* Inputs Section */}
                            <div className="bg-slate-950/60 border border-slate-800/90 p-5 rounded-2xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                                        <span>⚙️</span> {t('inputs')}
                                    </h4>
                                    <span className="text-[11px] text-cyan-400">
                                        {t('live_calculation')}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {selectedCalc.fields && selectedCalc.fields.map(field => (
                                        <div key={field.id} className={field.options && field.options.length > 3 ? 'sm:col-span-2' : ''}>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                {getTranslatedLabel(field.label)}
                                            </label>

                                            {field.type === 'select' ? (
                                                <select
                                                    value={calcInputs[field.id] !== undefined ? calcInputs[field.id] : field.default}
                                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                    className="w-full border border-slate-700 rounded-xl py-2.5 px-3 text-xs sm:text-sm bg-slate-900 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                                                >
                                                    {field.options.map(opt => (
                                                        <option key={opt.value} value={opt.value}>{getTranslatedLabel(opt.label)}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <div className="relative flex items-center">
                                                    <input
                                                        type={field.type || 'number'}
                                                        step={field.step || 'any'}
                                                        value={calcInputs[field.id] !== undefined ? calcInputs[field.id] : ''}
                                                        placeholder={field.placeholder || ''}
                                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                        className={`w-full border border-slate-700 rounded-xl py-2.5 pl-3 ${field.unit ? 'pr-14' : 'pr-3'} text-xs sm:text-sm bg-slate-900 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none`}
                                                    />
                                                    {field.unit && (
                                                        <span className="absolute right-2.5 text-[11px] font-semibold text-slate-400 pointer-events-none bg-slate-800 px-1.5 py-0.5 rounded">
                                                            {field.unit}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-5 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleRunCalculation}
                                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-500/25 cursor-pointer flex items-center gap-1.5"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                        {t('calculate')}
                                    </button>
                                </div>
                            </div>

                            {/* Result Display Section */}
                            {calcResult && (
                                <div className={`p-5 rounded-2xl border transition-all ${
                                    calcResult.status === 'alert'
                                        ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                                        : calcResult.status === 'warning'
                                        ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                                        : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                                }`}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                                            <span>📊</span> {t('result')}
                                        </h4>
                                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                                            calcResult.status === 'alert'
                                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                                : calcResult.status === 'warning'
                                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                        }`}>
                                            {calcResult.status === 'alert' ? t('status_alert') : calcResult.status === 'warning' ? t('status_warning') : t('status_normal')}
                                        </span>
                                    </div>

                                    <div className="text-2xl sm:text-3xl font-black tracking-tight my-1.5 text-white">
                                        {calcResult.value}
                                    </div>

                                    {calcResult.secondary && (
                                        <div className="text-xs font-semibold text-slate-300 mb-2">
                                            {calcResult.secondary}
                                        </div>
                                    )}

                                    {calcResult.interpretation && (
                                        <div className="text-xs font-medium text-slate-300 pt-2.5 border-t border-slate-800/80 leading-relaxed">
                                            <strong className="font-bold text-white">{t('interpretation')}:</strong> {calcResult.interpretation}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Collapsible Evidence Layer Accordion */}
                            <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
                                <button
                                    type="button"
                                    onClick={() => setShowEvidence(!showEvidence)}
                                    className="w-full px-4 py-3 bg-slate-900/80 hover:bg-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-200 transition cursor-pointer"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <span>📖</span> {t('evidence_layer')} ({t('guideline_and_formula')})
                                    </span>
                                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${showEvidence ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>

                                {showEvidence && (
                                    <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-2.5 text-xs">
                                        <div>
                                            <span className="font-bold text-slate-400 block">{t('guideline_reference')}:</span>
                                            <span className="text-white font-semibold">{selectedCalc.guideline}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-slate-400 block">{t('formula_used')}:</span>
                                            <span className="text-cyan-300 font-mono text-[11px] bg-slate-900 px-2.5 py-1 rounded inline-block border border-slate-800 mt-1">
                                                {selectedCalc.formula}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-slate-400 block">{t('target_population')}:</span>
                                            <span className="text-slate-300">{selectedCalc.population || 'Pediatric & Adult Endocrinology'}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-slate-400 block">{t('pubmed_link')}:</span>
                                            {selectedCalc.pubmed ? (
                                                <a 
                                                    href={selectedCalc.pubmed} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="text-cyan-400 hover:text-cyan-300 underline font-semibold inline-flex items-center gap-1 mt-0.5"
                                                >
                                                    {t('view_pubmed')}
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                                </a>
                                            ) : (
                                                <span className="text-slate-500">{t('intl_consensus')}</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800 flex justify-end">
                            <button
                                onClick={() => setSelectedCalc(null)}
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer border border-slate-700"
                            >
                                {t('close_case')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

