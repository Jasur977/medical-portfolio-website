import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ForPhysicians() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';

    const [activeAlgorithm, setActiveAlgorithm] = useState('short-stature');

    const guidelines = [
        {
            society: 'ISPAD 2024',
            title: {
                en: 'ISPAD Clinical Practice Consensus Guidelines 2024',
                ru: 'Клинические рекомендации ISPAD 2024 по сахарному диабету',
                uz: 'ISPAD 2024 Bolalar qandli diabeti bo‘yicha xalqaro konsensus'
            },
            desc: {
                en: 'Definitive international guidance on pediatric Type 1 diabetes, DKA protocols, continuous glucose monitoring, and insulin therapeutics.',
                ru: 'Международные стандарты ведения сахарного диабета 1 типа у детей, протоколы ДКА и современные технологии мониторинга.',
                uz: 'Bolalarda 1-tur qandli diabet, DKA protokollari, CGM monitoringi va insulin terapiyasi bo‘yicha xalqaro qo‘llanma.'
            },
            link: 'https://www.ispad.org/resources/ispad-clinical-practice-consensus-guidelines.html',
            badge: 'Diabetes & DKA'
        },
        {
            society: 'ESPE / GHRS',
            title: {
                en: 'Consensus Guidelines on Pediatric Growth Hormone Deficiency',
                ru: 'Консенсус ESPE/GHRS по диагностике и лечению дефицита СТГ',
                uz: 'ESPE/GHRS: Bolalarda o‘sish gormoni yetishmovchiligi konsensusi'
            },
            desc: {
                en: 'Standards for provocative GH testing, cutoff interpretations, MRI indications, and somatropin replacement titration.',
                ru: 'Критерии стимуляционных проб с СТГ, МРТ гипофиза и подбор дозы соматропина при низкорослости.',
                uz: 'GH stimulyatsiya testlari, gipofiz MRT ko‘rsatkichlari va somatropin dozasini to‘g‘ri tanlash standartlari.'
            },
            link: 'https://pubmed.ncbi.nlm.nih.gov/30349603/',
            badge: 'Growth & GHD'
        },
        {
            society: 'Endocrine Society',
            title: {
                en: 'Congenital Adrenal Hyperplasia (CAH) Clinical Guideline',
                ru: 'Клинические рекомендации по врожденной дисфункции коры надпочечников (ВДКН)',
                uz: 'Tug‘ma buyrak usti bezi po‘stlog‘i giperplaziyasi (CAH) qo‘llanmasi'
            },
            desc: {
                en: 'Management of 21-hydroxylase deficiency, neonatal screening, hydrocortisone and fludrocortisone dosing, and stress-dose prophylaxis.',
                ru: 'Ведение дефицита 21-гидроксилазы, скрининг новорожденных, дозирование глюко- и минералокортикоидов.',
                uz: '21-gidroksilaza defitsiti, yangi tug‘ilgan chaqaloqlar skriningi va gidrokortizon stress dozalash qoidalari.'
            },
            link: 'https://pubmed.ncbi.nlm.nih.gov/30295744/',
            badge: 'Adrenal & CAH'
        },
        {
            society: 'ADA 2026',
            title: {
                en: 'ADA Standards of Care in Diabetes — 2026',
                ru: 'Стандарты медицинской помощи при диабете ADA 2026',
                uz: 'ADA Qandli diabet bo‘yicha tibbiy yordam standartlari 2026'
            },
            desc: {
                en: 'Annual global standards for glycemic targets, eGFR/UACR kidney health evaluation, cardiovascular risk, and automated insulin delivery.',
                ru: 'Глобальные стандарты гликемических целей, контроля СКФ/альбуминурии и инсулиновых помп.',
                uz: 'Glikemik maqsadlar, eGFR/UACR buyrak salomatligi va avtomatlashtirilgan insulin tizimlari standartlari.'
            },
            link: 'https://diabetesjournals.org/care/issue/49/Supplement_1',
            badge: 'Glycemia & Renal'
        },
        {
            society: 'ATA / ETA',
            title: {
                en: 'Management of Thyroid Nodules and Congenital Hypothyroidism',
                ru: 'Рекомендации ATA по узлам щитовидной железы и гипотиреозу',
                uz: 'Qalqonsimon bez tugunlari va tug‘ma gipotireoz bo‘yicha ATA qo‘llanmasi'
            },
            desc: {
                en: 'Diagnostic algorithm for pediatric and adult nodules, TI-RADS risk stratifying, and prompt levothyroxine dosing in congenital hypothyroidism.',
                ru: 'Алгоритм оценки узлов, стратификация риска по TI-RADS и стартовое дозирование левотироксина новорожденным.',
                uz: 'UTT TI-RADS xavf tahlili, nozik ignali biopsiya va chaqaloqlarda levotiroksin boshlang‘ich dozalash.'
            },
            link: 'https://pubmed.ncbi.nlm.nih.gov/25078738/',
            badge: 'Thyroid'
        },
        {
            society: 'Chicago DSD Consensus',
            title: {
                en: 'Consensus on Differences of Sex Development (DSD)',
                ru: 'Чикагский консенсус по ведению нарушений формирования пола (НФП)',
                uz: 'Jinsiy rivojlanish farqlari (DSD) bo‘yicha xalqaro Chikago konsensusi'
            },
            desc: {
                en: 'Multidisciplinary diagnostic pathways, karyotyping, Prader/Quigley phenotypic scoring, and ethical endocrine management.',
                ru: 'Мультидисциплинарный диагностический маршрут, кариотипирование и стандартизированные шкалы гениталий.',
                uz: 'Kariotiplash, gormonal profillash va ko‘p tarmoqli tibbiy yordam ko‘rsatish standartlari.'
            },
            link: 'https://pubmed.ncbi.nlm.nih.gov/16882812/',
            badge: 'DSD & Puberty'
        }
    ];

    const algorithms = [
        {
            id: 'short-stature',
            title: {
                en: '1. Short Stature Diagnostic Workup',
                ru: '1. Диагностический алгоритм задержки роста',
                uz: '1. Bo‘y pastligi diagnostik algoritmi'
            },
            steps: [
                {
                    num: '1',
                    color: 'bg-indigo-500',
                    title: {
                        en: 'Clinical Assessment & Auxology',
                        ru: 'Клиническая оценка и ауксология',
                        uz: 'Klinik baholash va auksologiya'
                    },
                    desc: {
                        en: 'Identify height < -2.0 SD, height > 1.5 SD below target height, or annualized growth velocity < 25th percentile (<4 cm/yr prepubertal).',
                        ru: 'Выявление роста < -2.0 SD, отставания более 1.5 SD от целевого генетического роста или скорости роста < 25 перцентиля (<4 см/год до пубертата).',
                        uz: 'Bo‘y < -2.0 SD, maqsadli genetik bo‘ydan 1.5 SD pastlik yoki o‘sish tezligining < 25 persentil (<4 sm/yil) ekanligini aniqlash.'
                    },
                    connector: {
                        en: '↓ Order Baseline Radiograph',
                        ru: '↓ Рентгенография костного возраста',
                        uz: '↓ Suyak yoshi rentgenografiyasini o‘tkazish'
                    }
                },
                {
                    num: '2',
                    color: 'bg-indigo-500',
                    title: {
                        en: 'Bone Age Radiograph (Left Hand & Wrist)',
                        ru: 'Определение костного возраста (левая кисть)',
                        uz: 'Suyak yoshini aniqlash (chap qo‘l kafti rentgeni)'
                    },
                    desc: {
                        en: 'Greulich-Pyle assessment. If bone age delayed > 2 years: Constitutional delay vs Endocrine etiology (Hypothyroidism, GHD, Cushing). If bone age normal: Genetic short stature / Skeletal dysplasia.',
                        ru: 'Оценка по Грейлиху-Пайлу. Задержка > 2 лет указывает на конституциональную задержку или эндокринную патологию (гипотиреоз, дефицит СТГ, синдром Кушинга). Нормальный костный возраст: семейная низкорослость или скелетная дисплазия.',
                        uz: 'Greylix-Payl bo‘yicha baholash. Suyak yoshi > 2 yil kechikkan bo‘lsa: konstitutsional kechikish yoki endokrin sabablar (gipotireoz, GH yetishmovchiligi, Kushing). Normal bo‘lsa: oilaviy past bo‘ylilik yoki suyak displaziyasi.'
                    },
                    connector: {
                        en: '↓ Baseline Biochemical Screen',
                        ru: '↓ Базовый биохимический скрининг',
                        uz: '↓ Birlamchi laborator skrining'
                    }
                },
                {
                    num: '3',
                    color: 'bg-indigo-500',
                    title: {
                        en: 'Systemic Screening & Hormone Axis',
                        ru: 'Системный скрининг и гормональный профиль',
                        uz: 'Tizimli skrining va gormonal tahlillar'
                    },
                    desc: {
                        en: 'CBC, ESR, creatinine, electrolytes, celiac anti-tTG IgA, TSH, Free T4, IGF-1, IGFBP-3. Karyotype mandatory in all short females to rule out Turner Syndrome (45,X0).',
                        ru: 'ОАК, СОЭ, креатинин, электролиты, целиакия (anti-tTG IgA), ТТГ, св. Т4, ИФР-1, ИФР-СБ3. Обязательное кариотипирование всех девочек с низкорослостью для исключения синдрома Шерешевского-Тернера (45,X0).',
                        uz: 'Qon umumiy tahlili, EChJ, kreatinin, elektrolitlar, seliakiya (anti-tTG IgA), TSH, erkin T4, IGF-1, IGFBP-3. Past bo‘yli barcha qizlarda Terner sindromini (45,X0) inkor etish uchun kariotip tekshiruvi shart.'
                    },
                    connector: {
                        en: '↓ Provocative Stimulatory Testing',
                        ru: '↓ Провокационные стимуляционные пробы',
                        uz: '↓ Provokatsion stimulyatsiya sinamalari'
                    }
                },
                {
                    num: '4',
                    color: 'bg-emerald-500',
                    title: {
                        en: 'Dual GH Stimulation Tests & Sellar MRI',
                        ru: 'Два стимуляционных теста с СТГ и МРТ гипофиза',
                        uz: 'Ikkita GH stimulyatsiya testi va gipofiz MRT tekshiruvi'
                    },
                    desc: {
                        en: 'Two provocative tests (Clonidine, Arginine, Glucagon, Insulin). Peak GH < 7.0–10.0 ng/mL confirms GHD. Perform pituitary MRI prior to recombinant somatropin initiation.',
                        ru: 'Два провокационных теста (клонидин, аргинин, инсулин). Пик СТГ < 7.0–10.0 нг/мл подтверждает дефицит СТГ. Обязательна МРТ гипофиза до начала терапии рекомбинантным соматропином.',
                        uz: 'Ikkita provokatsion test (klonidin, arginin, insulin). GH cho‘qqisi < 7.0–10.0 ng/ml bo‘lsa STH yetishmovchiligi tasdiqlanadi. Rekombinant somatropin boshlashdan oldin gipofiz MRT tekshiruvi shart.'
                    }
                }
            ]
        },
        {
            id: 'adrenal-crisis',
            title: {
                en: '2. CAH & Acute Adrenal Crisis Protocol',
                ru: '2. ВДКН и протокол острой надпочечниковой недостаточности',
                uz: '2. CAH va o‘tkir buyrak usti bezi inqirozi protokoli'
            },
            steps: [
                {
                    num: '!',
                    color: 'bg-red-500',
                    title: {
                        en: 'Emergency Identification (Do NOT delay treatment for labs!)',
                        ru: 'Экстренное распознавание (НЕ откладывать лечение ради анализов!)',
                        uz: 'Shoshilinch holatni aniqlash (Tahlillar kutib davolashni kechiktirmang!)'
                    },
                    desc: {
                        en: 'Hypotension, shock refractory to fluid, unexplained lethargy, persistent vomiting, hyponatremia + hyperkalemia in known CAH / Addison patient.',
                        ru: 'Гипотония, рефрактерный к инфузиям шок, выраженная вялость, неукротимая рвота, гипонатриемия + гиперкалиемия у пациентов с ВДКН или болезнью Аддисона.',
                        uz: 'Gipotenziya, suyuqlikka javob bermaydigan shok, lanjlik, to‘xtovsiz qusish, CAH yoki Addison bilan og‘rigan bemorlarda giponatriyemiya + giperkaliyemiya.'
                    },
                    connector: {
                        en: '↓ Stat Intravenous Access',
                        ru: '↓ Немедленный венозный доступ',
                        uz: '↓ Tezkor venaga kirish yo‘li'
                    }
                },
                {
                    num: '1',
                    color: 'bg-red-500',
                    title: {
                        en: 'Hydrocortisone Sodium Succinate IV/IM Stat',
                        ru: 'Гидрокортизон натрия сукцинат в/в или в/м немедленно',
                        uz: 'Gidrokortizon natriy suksinat darhol v/v yoki m/o'
                    },
                    desc: {
                        en: 'Bolus: <3 yrs: 25 mg IV; 3–12 yrs: 50 mg IV; >12 yrs and adults: 100 mg IV stat. Followed by continuous IV infusion (50–100 mg/m²/day) or divided doses q6h.',
                        ru: 'Болюс: <3 лет: 25 мг в/в; 3–12 лет: 50 мг в/в; >12 лет и взрослые: 100 мг в/в струйно. Далее инфузия 50–100 мг/м²/сутки или дробно каждые 6 часов.',
                        uz: 'Bolus: <3 yosh: 25 mg v/v; 3–12 yosh: 50 mg v/v; >12 yosh va kattalarga: 100 mg v/v tezkor. Keyin uzluksiz infuziya (50–100 mg/m²/kun) yoki har 6 soatda bo‘lib berish.'
                    },
                    connector: {
                        en: '↓ Fluid Resuscitation',
                        ru: '↓ Инфузионная регидратация',
                        uz: '↓ Infuzion regidratatsiya'
                    }
                },
                {
                    num: '2',
                    color: 'bg-indigo-500',
                    title: {
                        en: 'Isotonic Saline & Glucose Resuscitation',
                        ru: 'Инфузия изотонического физраствора и глюкозы',
                        uz: 'Izotonik natriy xlorid va glyukoza infuziyasi'
                    },
                    desc: {
                        en: '0.9% Normal Saline 20 mL/kg bolus over 1 hour. Add 5% or 10% Dextrose if hypoglycemic. Avoid potassium-containing fluids.',
                        ru: '0.9% NaCl болюс 20 мл/кг в течение 1 часа. Добавить 5% или 10% глюкозу при гипогликемии. Категорически исключить калийсодержащие растворы!',
                        uz: '0.9% NaCl eritmasi 20 ml/kg 1 soat davomida. Gipoglikemiya bo‘lsa 5% yoki 10% glyukoza qo‘shiladi. Kaliy saqlovchi eritmalarni qat’iyan qo‘llamang!'
                    }
                }
            ]
        },
        {
            id: 'thyroid-nodule',
            title: {
                en: '3. Pediatric Thyroid Nodule Evaluation',
                ru: '3. Диагностика узлов щитовидной железы у детей',
                uz: '3. Bolalarda qalqonsimon bez tugunlarini baholash'
            },
            steps: [
                {
                    num: '1',
                    color: 'bg-indigo-500',
                    title: {
                        en: 'Serum TSH & Neck Ultrasound (with cervical lymph nodes)',
                        ru: 'ТТГ крови и УЗИ шеи (с оценкой лимфоузлов)',
                        uz: 'Qon TSH tahlili va bo‘yin UTT (limfa tugunlari bilan)'
                    },
                    desc: {
                        en: 'If TSH suppressed: Perform technetium/radioiodine scan to identify autonomous hot nodule. If TSH normal or elevated: Proceed to ultrasound risk stratification.',
                        ru: 'Если ТТГ снижен: сцинтиграфия для исключения автономного «горячего» узла. Если ТТГ в норме или повышен: стратификация риска по УЗИ.',
                        uz: 'Agar TSH pasaygan bo‘lsa: «issiq» avtonom tugunni aniqlash uchun ssintigrafiya. Agar TSH me’yorda yoki baland bo‘lsa: UTT xavf tahliliga o‘tiladi.'
                    },
                    connector: {
                        en: '↓ TI-RADS Ultrasound Features',
                        ru: '↓ Признаки TI-RADS по УЗИ',
                        uz: '↓ TI-RADS UTT xususiyatlari'
                    }
                },
                {
                    num: '2',
                    color: 'bg-indigo-500',
                    title: {
                        en: 'ACR TI-RADS & Size Thresholds for FNA',
                        ru: 'ACR TI-RADS и показания к ТАБ биопсии',
                        uz: 'ACR TI-RADS va biopsiya (TAB) ko‘rsatkichlari'
                    },
                    desc: {
                        en: 'Evaluate composition, echogenicity, shape (taller-than-wide), margins, and echogenic foci. In children, nodules have a higher malignancy risk (~22–26% vs ~10% in adults), lowering FNA threshold.',
                        ru: 'Оценка эхогенности, контуров, формы («выше, чем шире») и микрокальцинатов. У детей риск малигнизации выше (~22–26% против ~10% у взрослых), поэтому порог биопсии снижен.',
                        uz: 'Exogenlik, konturlar, shakli («uzunasi enidan katta») va mikrokalsinatlar baholanadi. Bolalarda xavflilik darajasi yuqori (~22–26%, kattalarda ~10%), shuning uchun biopsiya o‘tkazish chegarasi pastroq.'
                    },
                    connector: {
                        en: '↓ Cytopathology Bethesda Category',
                        ru: '↓ Цитология по классификации Bethesda',
                        uz: '↓ Bethesda tasnifi bo‘yicha sitologiya'
                    }
                },
                {
                    num: '3',
                    color: 'bg-emerald-500',
                    title: {
                        en: 'Bethesda I–VI Cytopathology Management',
                        ru: 'Тактика ведения по категориям Bethesda I–VI',
                        uz: 'Bethesda I–VI toifalari bo‘yicha klinik taktika'
                    },
                    desc: {
                        en: 'Bethesda II (Benign): Ultrasound follow-up. Bethesda III/IV (Indeterminate): Molecular testing or diagnostic lobectomy. Bethesda V/VI (Malignant): Endocrine surgical resection with lymph node evaluation.',
                        ru: 'Bethesda II (доброкачественный): УЗИ наблюдение. Bethesda III/IV (неопределенный): молекулярное тестирование или диагностическая лобэктомия. Bethesda V/VI (злокачественный): операция с лимфодиссекцией.',
                        uz: 'Bethesda II (xavfsiz): UTT nazorati. Bethesda III/IV (noaniq): molekulyar test yoki diagnostik lobektomiya. Bethesda V/VI (xavfli): limfa tugunlari rezeksiyasi bilan endokrin jarrohlik amaliyoti.'
                    }
                }
            ]
        }
    ];

    const currentAlgorithmData = algorithms.find(a => a.id === activeAlgorithm) || algorithms[0];

    return (
        <section id="for-physicians" className="py-20 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-indigo-100 text-indigo-800 mb-4 shadow-sm">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        {t('physicians_badge')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {t('physicians_title')}
                    </h2>
                    <p className="mt-3 text-lg text-slate-600">
                        {t('physicians_subtitle')}
                    </p>
                </div>

                {/* International Guidelines Grid */}
                <div className="mb-20">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span>📚</span> {t('guidelines_library_title')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {guidelines.map((g, idx) => (
                            <div 
                                key={idx}
                                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md hover:border-indigo-300 transition-all group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                                            {g.society}
                                        </span>
                                        <span className="text-xs font-semibold text-slate-500">
                                            {g.badge}
                                        </span>
                                    </div>
                                    <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition">
                                        {g.title[currentLang] || g.title.en}
                                    </h4>
                                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                                        {g.desc[currentLang] || g.desc.en}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                                    <a
                                        href={g.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group-hover:underline"
                                    >
                                        {t('access_guideline')}
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive Diagnostic Flowcharts & Clinical Decision Algorithms */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
                    <div className="max-w-3xl mb-8">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                            {t('decision_support_badge')}
                        </span>
                        <h3 className="text-2xl font-bold mt-1">
                            {t('decision_pathways_title')}
                        </h3>
                        <p className="text-slate-400 text-sm mt-1">
                            {t('decision_pathways_desc')}
                        </p>
                    </div>

                    {/* Algorithm Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
                        {algorithms.map(algo => (
                            <button
                                key={algo.id}
                                onClick={() => setActiveAlgorithm(algo.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                                    activeAlgorithm === algo.id
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                            >
                                {algo.title[currentLang] || algo.title.en}
                            </button>
                        ))}
                    </div>

                    {/* Flowchart Content */}
                    <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
                        <div className="space-y-4 text-sm">
                            {currentAlgorithmData.steps.map((step, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="flex items-start gap-4">
                                        <div className={`w-8 h-8 rounded-full ${step.color} flex items-center justify-center font-bold flex-shrink-0 text-white`}>
                                            {step.num}
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-white">
                                                {step.title[currentLang] || step.title.en}
                                            </h5>
                                            <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">
                                                {step.desc[currentLang] || step.desc.en}
                                            </p>
                                        </div>
                                    </div>
                                    {step.connector && (
                                        <div className="border-l-2 border-slate-700 ml-4 pl-8 py-2">
                                            <span className="text-xs font-mono text-indigo-400">
                                                {step.connector[currentLang] || step.connector.en}
                                            </span>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Consultation & Case Referral Banner */}
                <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="max-w-2xl">
                        <h4 className="text-xl font-bold text-slate-900">
                            {t('consultation_title')}
                        </h4>
                        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                            {t('consultation_desc')}
                        </p>
                    </div>
                    <a
                        href="#contact"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition shadow-md whitespace-nowrap cursor-pointer"
                    >
                        {t('refer_patient_btn')}
                    </a>
                </div>

            </div>
        </section>
    );
}
