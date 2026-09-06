import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ForPatients() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';

    const [openFaq, setOpenFaq] = useState(null);

    const guides = [
        {
            icon: '📏',
            title: {
                en: 'Short Stature & Growth Failure in Children',
                ru: 'Задержка роста и низкорослость у детей',
                uz: 'Bolalarda bo‘y pastligi va o‘sishdan ortda qolish'
            },
            desc: {
                en: 'When should parents worry? Normal annual growth rates (minimum 4–5 cm/year after age 4) and when to evaluate for growth hormone or thyroid deficiency.',
                ru: 'Когда родителям стоит насторожиться? Нормы ежегодной прибавки в росте и показания для обследования у эндокринолога.',
                uz: 'Ota-onalar qachon xavotirlanishi kerak? 4 yoshdan keyin yillik me’yoriy o‘sish (kamida 4–5 sm) va o‘sish gormoni yetishmovchiligi belgilari.'
            },
            keyTip: {
                en: 'Measure height every 6 months and plot on a standardized growth chart.',
                ru: 'Измеряйте рост ребенка каждые 6 месяцев и отмечайте на перцентильной кривой.',
                uz: 'Farzandingiz bo‘yini har 6 oyda bir marta aniq o‘lchab boring.'
            }
        },
        {
            icon: '🩸',
            title: {
                en: 'Type 1 Diabetes: Recognizing Early Symptoms',
                ru: 'Сахарный диабет 1 типа: первые признаки у детей',
                uz: '1-tur qandli diabet: bolalarda ilk alomatlar'
            },
            desc: {
                en: 'The crucial warning signs: excessive thirst (polydipsia), frequent urination including bedwetting (polyuria), weight loss despite eating, and fatigue.',
                ru: 'Ключевые симптомы: сильная жажда, частое мочеиспускание (включая энурез), потеря веса и вялость. Требуется срочный анализ сахара крови.',
                uz: 'Asosiy ogohlantiruvchi belgilar: chanqash, tez-tez siyish, kutilmagan vazn yo‘qotish va holsizlik. Zudlik bilan qon qandini tekshirish zarur.'
            },
            keyTip: {
                en: 'Never delay testing blood glucose if rapid weight loss or bedwetting occurs.',
                ru: 'Срочно проверьте глюкозу крови при внезапном ночном недержании и похудении.',
                uz: 'To‘satdan ozish va ko‘p suv ichish kuzatilsa, zudlik bilan qondagi qandni o‘lchang.'
            }
        },
        {
            icon: '🦋',
            title: {
                en: 'Thyroid Health, Goiter & Fatigue',
                ru: 'Заболевания щитовидной железы и зоб',
                uz: 'Qalqonsimon bez kasalliklari, buqoq va holsizlik'
            },
            desc: {
                en: 'Recognizing hypothyroidism (sluggishness, cold intolerance, dry skin, school difficulties) vs hyperthyroidism (sweating, rapid heartbeat, restlessness).',
                ru: 'Разница между гипотиреозом (зябкость, сухость кожи, утомляемость) и тиреотоксикозом (тахикардия, потеря веса, раздражительность).',
                uz: 'Gipotireoz (holsizlik, sovuqqa ta’sirchanlik, quruq teri) va gipertireoz (yurak tez urishi, asabiylik) belgilari.'
            },
            keyTip: {
                en: 'Adequate dietary iodine (iodized salt) is essential for developing brains.',
                ru: 'Иодированная соль — основа профилактики эндемического зоба у всей семьи.',
                uz: 'Osh tuzining yodlangan bo‘lishi qalqonsimon bez salomatligi uchun juda muhimdir.'
            }
        },
        {
            icon: '🥗',
            title: {
                en: 'Childhood Nutrition & Healthy Weight',
                ru: 'Детское питание и здоровый вес',
                uz: 'Bolalar to‘g‘ri ovqatlanishi va sog‘lom vazn'
            },
            desc: {
                en: 'Combating childhood obesity without extreme diets: balanced protein, reducing sweet drinks and ultra-processed snacks, and encouraging 60 min of daily play.',
                ru: 'Профилактика детского ожирения без строгих диет: ограничение сладких напитков, полноценный белок и 60 минут активности в день.',
                uz: 'Qat’iy parhezlarsiz me’yoriy vazn: shirin gazli ichimliklarni to‘xtatish, sifatli oqsil va kuniga 60 daqiqa harakatlanish.'
            },
            keyTip: {
                en: 'Liquid sugar (soda, sweetened juices) is the #1 driver of rapid pediatric weight gain.',
                ru: 'Сладкие напитки и соки — главная причина скрытого избытка калорий у детей.',
                uz: 'Shirin ichimliklar va sharbatlar bolalarda tez semirishning asosiy sababidir.'
            }
        },
        {
            icon: '🌱',
            title: {
                en: 'Pubertal Development: Early vs Late Changes',
                ru: 'Половое созревание: ранее или позднее развитие',
                uz: 'Jinsiy balog‘at davri: erta yoki kechikkan belgilar'
            },
            desc: {
                en: 'Normal puberty begins between 8–13 years in girls and 9–14 years in boys. Earlier appearance or complete absence past age 13–14 warrants evaluation.',
                ru: 'Нормальный пубертат начинается с 8–13 лет у девочек и с 9–14 лет у мальчиков. Отклонения требуют осмотра детского эндокринолога.',
                uz: 'Balog‘at qizlarda 8–13 yosh, o‘g‘illarda 9–14 yosh oralig‘ida boshlanadi. Muddatdan oldin yoki kech qolish sabablarini tekshirish zarur.'
            },
            keyTip: {
                en: 'A rapid growth spurt occurs during puberty; tracking growth velocity provides vital clues.',
                ru: 'Скачок роста сопровождает пубертат; регулярный мониторинг дает точные ответы.',
                uz: 'Balog‘at davrida bo‘y o‘sishi tezlashadi, shuning uchun tezlikni o‘lchab borish lozim.'
            }
        }
    ];

    const checklist = [
        {
            title: { en: 'Growth Record History', ru: 'История измерений роста и веса', uz: 'Bo‘y va vazn o‘lchovlari tarixi' },
            desc: { en: 'Bring baby health record book (emlov daftarchasi) with historical height/weight measurements since birth.', ru: 'Медицинская карта или выписка с данными о росте и весе ребенка с рождения.', uz: 'Tug‘ilganidan boshlab bolaning barcha bo‘y va vazn yozuvlari (emlov daftarchasi).' }
        },
        {
            title: { en: 'Previous Laboratory & Ultrasound Reports', ru: 'Предыдущие анализы и УЗИ', uz: 'Oldingi laboratoriya va UTT tahlillari' },
            desc: { en: 'Any thyroid panels (TSH, FT4), glucose, bone age X-rays, or endocrine ultrasound scans.', ru: 'Все ранее сданные гормональные анализы, снимки рентгенографии кистей, УЗИ.', uz: 'Avval topshirilgan gormonlar, rentgen suratlari va ultratovush tekshiruvlari xulosalari.' }
        },
        {
            title: { en: 'Biological Parents\' Exact Heights', ru: 'Точный рост биологических родителей', uz: 'Ota-onaning aniq bo‘y o‘lchovlari' },
            desc: { en: 'Essential for mid-parental target height calculation and genetic potential assessment.', ru: 'Необходимо для расчета генетического ростового коридора ребенка.', uz: 'Bolaning genetik bo‘y salohiyatini to‘g‘ri hisoblash uchun juda zarur.' }
        },
        {
            title: { en: 'Medication and Supplement History', ru: 'Список принимаемых препаратов', uz: 'Qabul qilinayotgan dorilar ro‘yxati' },
            desc: { en: 'Including vitamins, Vitamin D, calcium, steroids, or appetite stimulants.', ru: 'Включая витамин D, кальций, гормональные мази или ингаляторы.', uz: 'Vitamin D, kalsiy, gormon saqlovchi malhamlar yoki boshqa dori vositalari.' }
        }
    ];

    const faqs = [
        {
            q: {
                en: 'Can we give medication or growth hormone to make my child grow taller?',
                ru: 'Можно ли принимать таблетки или уколы, чтобы ребенок вырос?',
                uz: 'Bolaning bo‘yini o‘stiradigan dorilar yoki gormon ukollari bormi?'
            },
            a: {
                en: 'Growth hormone is only indicated for verified medical conditions (documented growth hormone deficiency, Turner syndrome, chronic renal insufficiency, small for gestational age without catch-up). It cannot be prescribed casually and requires comprehensive testing and specialist supervision.',
                ru: 'Гормон роста назначается исключительно по строгим медицинским показаниям (доказанный дефицит СТГ, синдром Шерешевского-Тернера и др.) после подтверждающих стимуляционных проб. Бесконтрольный прием опасен.',
                uz: 'O‘sish gormoni faqatgina maxsus laboratoriya sinovlari bilan tasdiqlangan holatlarda (gormon yetishmovchiligi, Terner sindromi va b.) qat’iy shifokor nazoratida tayinlanadi. O‘z bilgicha qabul qilish sog‘liq uchun xavfli.'
            }
        },
        {
            q: {
                en: 'What dose of Vitamin D should children take in Uzbekistan?',
                ru: 'В какой дозе детям в Узбекистане нужен витамин D?',
                uz: 'O‘zbekiston sharoitida bolalarga D vitamini qanday dozada beriladi?'
            },
            a: {
                en: 'Despite abundant sunshine, Vitamin D deficiency is prevalent due to indoor lifestyles and skin melanin. Preventive doses generally range from 400 to 1000 IU/day, but therapeutic treatment for deficiency requires an initial 25(OH)D blood test and personalized dosing.',
                ru: 'Несмотря на обилие солнца, дефицит витамина D очень распространен. Профилактическая доза обычно составляет 400–1000 МЕ в сутки, но лечебные дозы подбираются индивидуально по анализу 25(OH)D.',
                uz: 'Quyosh ko‘p bo‘lishiga qaramay, D vitamini yetishmovchiligi ko‘p uchraydi. Profilaktika uchun odatda kuniga 400–1000 XB tavsiya etiladi, davolash dozasi esa qon tahliliga qarab individual belgilanadi.'
            }
        },
        {
            q: {
                en: 'Can Type 1 diabetes in children be completely cured?',
                ru: 'Излечим ли полностью сахарный диабет 1 типа у детей?',
                uz: 'Bolalarda 1-tur qandli diabet butunlay tuzaladimi?'
            },
            a: {
                en: 'Currently, Type 1 diabetes is an autoimmune condition where the pancreas stops producing insulin. While it cannot yet be permanently cured, modern insulin therapy, continuous glucose monitors (CGM), and healthy nutrition allow children to live full, healthy, and unrestricted lives.',
                ru: 'Сахарный диабет 1 типа — аутоиммунное заболевание, требующее заместительной терапии инсулином. Современные помпы, сенсоры CGM и правильное обучение позволяют детям вести полноценную, активную жизнь.',
                uz: '1-tur diabet autoimmun holat bo‘lib, insulin yetishmovchiligini to‘ldirishni talab qiladi. Zamonaviy insulinlar, sensorlar va to‘g‘ri bilim orqali bola tengdoshlaridek sog‘lom va to‘laqonli hayot kechiradi.'
            }
        }
    ];

    return (
        <section id="for-patients" className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-100 text-emerald-800 mb-4 shadow-sm">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {t('patients_badge')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {t('patients_title')}
                    </h2>
                    <p className="mt-3 text-lg text-slate-600">
                        {t('patients_subtitle')}
                    </p>
                </div>

                {/* Educational Guides Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {guides.map((guide, idx) => (
                        <div 
                            key={idx}
                            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="text-3xl mb-3">{guide.icon}</div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2">
                                    {guide.title[currentLang] || guide.title.en}
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {guide.desc[currentLang] || guide.desc.en}
                                </p>
                            </div>
                            <div className="mt-6 p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl text-xs text-emerald-900">
                                <span className="font-bold block text-emerald-700">💡 {t('doctors_tip')}</span>
                                {guide.keyTip[currentLang] || guide.keyTip.en}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Appointment Preparation Checklist Card */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-10 mb-16">
                    <div className="max-w-2xl mb-8">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                            {t('checklist_badge')}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">
                            {t('appointment_prep_title')}
                        </h3>
                        <p className="text-slate-600 text-sm mt-1">
                            {t('appointment_prep_desc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {checklist.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                    ✓
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-900 text-sm">
                                        {item.title[currentLang] || item.title.en}
                                    </h5>
                                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                        {item.desc[currentLang] || item.desc.en}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
                        {t('faqs_title')}
                    </h3>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div 
                                    key={idx}
                                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition cursor-pointer"
                                    >
                                        <span>{faq.q[currentLang] || faq.q.en}</span>
                                        <span className={`text-slate-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}>
                                            ▼
                                        </span>
                                    </button>
                                    {isOpen && (
                                        <div className="px-6 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                                            {faq.a[currentLang] || faq.a.en}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
