import React from 'react';
import { Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Header({ onNewTicket }) {
    const { t, i18n } = useTranslation('tickets');
    const isRtl = i18n.language === 'ar';

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div>
                <h1 className="text-[24px] font-semibold text-[#12115C] leading-none tracking-normal [leading-trim:cap-height] [text-box-trim:cap]">
                    {t('header.title')}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                    {t('header.subtitle')}
                </p>
            </div>
            <button
                onClick={onNewTicket}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0C1236] hover:bg-[#1A2356] text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-sm transition-colors cursor-pointer"
            >
                <Plus size={18} />
                <span>{t('header.newTicket')}</span>
                {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
        </div>
    );
}
