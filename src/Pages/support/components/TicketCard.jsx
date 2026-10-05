import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TicketReplyStatus from './TicketReplyStatus';
import { useTranslation } from 'react-i18next';

export default function TicketCard({ ticket }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation('tickets');
    const lang = i18n.language;
    const isRtl = lang === 'ar';

    return (
        <div className="bg-white border-y border-r border-l-4 border-[var(--bg-icon-2,#00E5C810)] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.08)] rounded-2xl p-4 sm:p-6 transition-all hover:shadow-md">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                    <h2 className="font-['Primary_2',sans-serif] font-semibold text-[20px] leading-[32px] tracking-normal align-middle text-[#111827] [leading-trim:cap-height] [text-box-trim:cap]">
                        {t('card.ticketNumber', { id: ticket.id })}
                    </h2>
                    <span
                        className={`text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md ${ticket.statusColor}`}
                    >
                        {t(`status.${ticket.statusKey}`, ticket.status)}
                    </span>
                </div>
                <div className="text-left sm:text-right">
                    <div className="text-sm sm:text-base font-bold text-[#12115C]">
                        {t(`type.${ticket.typeKey}`, ticket.type)}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                        {ticket.date}
                    </div>
                </div>
            </div>

            {/* Uploaded By */}
            <p className="text-xs sm:text-sm font-medium text-slate-500 mb-3 sm:mb-4">
                {t('card.uploadedBy', { name: ticket.uploadedBy })}
            </p>

            {/* Content Box */}
            <div className="bg-[#F8FAFC] border border-slate-100 rounded-xl p-3 sm:p-4 text-xs sm:text-sm leading-relaxed text-slate-500 mb-4 sm:mb-5 break-words">
                {ticket.content}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <TicketReplyStatus replyStatus={ticket.replyStatus} />
                <button
                    onClick={() => navigate(`/${lang}/support/${ticket.id}`)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0C1236] hover:bg-[#1A2356] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0"
                >
                    <span>{t('card.viewTicket')}</span>
                    {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
                
            </div>
        </div>
    );
}