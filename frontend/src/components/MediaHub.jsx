import React from 'react';
import { useTranslation } from 'react-i18next';

export default function MediaHub() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';

    const channels = [
        {
            platform: 'YouTube',
            iconColor: 'text-red-600 bg-red-50 border-red-200',
            btnColor: 'bg-red-600 hover:bg-red-700 text-white',
            title: {
                en: 'Video Lectures & Explainer Series',
                ru: 'Видеолекции и разборы клинических случаев',
                uz: 'Video ma’ruzalar va klinik holatlar tahlili'
            },
            desc: {
                en: 'In-depth lectures for physicians on CAH, GHD, and DSD, alongside animated patient education guides for parents on child growth and diabetes.',
                ru: 'Подробные видеолекции для врачей по эндокринологии и доступные видеоролики для родителей о росте и питании детей.',
                uz: 'Shifokorlar uchun klinik ma’ruzalar hamda ota-onalar uchun bolalar o‘sishi va diabeti haqida tushunarli video darslar.'
            },
            actionLabel: { en: 'Watch on YouTube', ru: 'Смотреть на YouTube', uz: 'YouTube’da tomosha qilish' },
            url: 'https://youtube.com/channel/UCUtQT0M8ti9QdDV-R2U_VeA?si=lvKoCgC0rtHzZnFO',
            highlights: [
                { en: 'Pediatric Growth Playlist', ru: 'Плейлист по росту детей', uz: 'Bolalar o‘sishi bo‘yicha videolar' },
                { en: 'CAH Clinical Management', ru: 'Клиническое ведение ВДКН', uz: 'CAH klinik boshqaruvi' },
                { en: 'Parents Q&A', ru: 'Вопросы и ответы родителям', uz: 'Ota-onalar savol-javoblari' }
            ]
        },
        {
            platform: 'Telegram',
            iconColor: 'text-sky-600 bg-sky-50 border-sky-200',
            btnColor: 'bg-sky-600 hover:bg-sky-700 text-white',
            title: {
                en: 'Official Clinical Telegram Channel',
                ru: 'Официальный Telegram-канал для врачей',
                uz: 'Rasmiy Telegram klinik kanali'
            },
            desc: {
                en: 'Real-time updates on latest international guidelines (ESPE, ISPAD, ADA), clinical decision calculator releases, and case debates.',
                ru: 'Оперативные новости мировой эндокринологии, свежие гайдлайны (ISPAD, ESPE), анонсы калькуляторов и обсуждение случаев.',
                uz: 'Xalqaro qo‘llanmalar (ISPAD, ESPE) yangiliklari, yangi kalkulyatorlar va amaliyotdagi murakkab holatlar tahlili.'
            },
            actionLabel: { en: 'Join Telegram Channel', ru: 'Подписаться в Telegram', uz: 'Telegram kanaliga obuna bo‘lish' },
            url: 'https://t.me/elbekendokrinolog',
            highlights: [
                { en: 'Weekly Guideline Digests', ru: 'Еженедельные дайджесты гайдлайнов', uz: 'Haftalik xalqaro qo‘llanmalar dayjesti' },
                { en: 'Interactive Case Quizzes', ru: 'Интерактивные клинические викторины', uz: 'Interaktiv klinik viktorinalar' },
                { en: 'Direct Clinical Alerts', ru: 'Клинические оповещения', uz: 'Tezkor klinik xabarnomalar' }
            ]
        },
        {
            platform: 'Instagram',
            iconColor: 'text-pink-600 bg-pink-50 border-pink-200',
            btnColor: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white',
            title: {
                en: 'Educational Infographics & Reels',
                ru: 'Инфографика и короткие видео в Instagram',
                uz: 'Tibbiy infografikalar va qisqa videolar'
            },
            desc: {
                en: 'Visual growth percentiles, practical tips on child nutrition, early signs of endocrine disorders, and clinic highlights.',
                ru: 'Наглядные ростовые таблицы, советы по правильному питанию детей, ранние признаки гормональных сбоев и рабочие будни.',
                uz: 'Vizual o‘sish jadvallari, to‘g‘ri ovqatlanish tavsiyalari va gormonal o‘zgarishlarning ilk belgilari bo‘yicha infografikalar.'
            },
            actionLabel: { en: 'Follow on Instagram', ru: 'Перейти в Instagram', uz: 'Instagram’da kuzatib borish' },
            url: 'https://www.instagram.com/elbek_endocrinologist?stkn=MXhzd2I1dDRwaHI3cw==',
            highlights: [
                { en: 'Visual Growth Guides', ru: 'Наглядные таблицы роста', uz: 'Ko‘rgazmali o‘sish jadvallari' },
                { en: 'Nutrition Tips', ru: 'Советы по питанию', uz: 'To‘g‘ri ovqatlanish tavsiyalari' },
                { en: 'Doctor Q&A Reels', ru: 'Короткие ответы доктора (Reels)', uz: 'Shifokor javoblari (Reels)' }
            ]
        },
        {
            platform: 'Facebook',
            iconColor: 'text-blue-700 bg-blue-50 border-blue-200',
            btnColor: 'bg-blue-700 hover:bg-blue-800 text-white',
            title: {
                en: 'Professional Medical Announcements',
                ru: 'Профессиональное сообщество в Facebook',
                uz: 'Facebook professional hamjamiyati'
            },
            desc: {
                en: 'Academic conference announcements, research publications, collaborative projects, and community endocrine health posts.',
                ru: 'Анонсы научных конференций, публикации статей, участие в международных конгрессах и полезные статьи.',
                uz: 'Xalqaro ilmiy konferensiyalar, ilmiy maqolalar nashrlari va professional tibbiy tavsiyalar.'
            },
            actionLabel: { en: 'Follow on Facebook', ru: 'Открыть в Facebook', uz: 'Facebook sahifasini ochish' },
            url: 'https://www.facebook.com/share/1Eqno9NpJu/?mibextid=wwXIfr',
            highlights: [
                { en: 'Scientific Articles', ru: 'Научные публикации', uz: 'Ilmiy maqolalar' },
                { en: 'Conference Reports', ru: 'Отчеты с конференций', uz: 'Konferensiya yangiliklari' },
                { en: 'Patient Stories', ru: 'Клинические наблюдения', uz: 'Klinik amaliyot hikoyalari' }
            ]
        }
    ];

    return (
        <section id="media" className="py-20 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-rose-100 text-rose-800 mb-4 shadow-sm">
                        <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        {t('media_badge')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {t('media_title')}
                    </h2>
                    <p className="mt-3 text-lg text-slate-600">
                        {t('media_subtitle')}
                    </p>
                </div>

                {/* Channels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {channels.map((ch, idx) => (
                        <div 
                            key={idx}
                            className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border ${ch.iconColor}`}>
                                        {ch.platform}
                                    </span>
                                    <span className="text-xs text-slate-500 font-medium">
                                        {t('official_channel')}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {ch.title[currentLang] || ch.title.en}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                    {ch.desc[currentLang] || ch.desc.en}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {ch.highlights.map((h, hIdx) => (
                                        <span key={hIdx} className="text-xs font-medium text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-lg">
                                            ✓ {h[currentLang] || h.en}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <a
                                    href={ch.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold transition shadow-sm cursor-pointer ${ch.btnColor}`}
                                >
                                    {ch.actionLabel[currentLang] || ch.actionLabel.en}
                                    <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
