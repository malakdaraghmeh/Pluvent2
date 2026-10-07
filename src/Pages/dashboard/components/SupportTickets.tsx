import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supportTickets } from '../data/supportTickets';

const SupportTickets = () => {
    const { t } = useTranslation('supportTickets');
    const { locale = 'en' } = useParams();
    const isArabic = locale.startsWith('ar');

    return (
        <section className="relative flex h-[210px] w-full min-w-0 flex-col gap-4 rounded-[24px] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.0314)] min-[1920px]:h-[234px] min-[1920px]:p-7 min-[2500px]:h-[260px] min-[2500px]:p-8">
            <div className={`flex w-full min-w-0 items-center justify-between gap-3 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                <h2 className={`min-w-0 text-[20px] font-semibold leading-5 text-[#12115C] ${isArabic ? 'text-right' : 'text-left'}`}>
                    {t('title')}
                </h2>
                <Link
                    to={`/${locale}/support`}
                    className="shrink-0 whitespace-nowrap text-[14px] font-normal leading-[14px] text-[#3634C7] transition-opacity hover:opacity-70"
                >
                    {t('viewAll')}
                </Link>
            </div>
            <div className="flex w-full min-w-0 flex-col gap-4">
                {supportTickets.map(ticket => {
                    const isInProgress = ticket.status === 'In Progress';
                    const titleKey = ticket.titleKey ?? (ticket.id === 1 ? 'first' : 'second');

                    return (
                        <Link
                            key={ticket.id}
                            to={`/${locale}/support/${ticket.id}`}
                            className={`grid h-[47px] w-full min-w-0 items-center gap-2 rounded-[12px] bg-[#F8FAFC] px-3 py-2 transition-colors hover:bg-[#F3F6FA] ${isArabic ? 'grid-cols-[76px_minmax(0,1fr)_55px]' : 'grid-cols-[55px_minmax(0,1fr)_76px]'}`}
                        >
                            <span className={`shrink-0 whitespace-nowrap text-[10px] font-semibold leading-[10px] text-[#94A3B8] ${isArabic ? 'col-start-3 row-start-1 text-right' : 'col-start-1 row-start-1 text-left'}`}>
                                {ticket.ticketNumber}
                            </span>
                            <span className={`col-start-2 row-start-1 min-w-0 overflow-hidden whitespace-nowrap pe-2 text-[11px] font-semibold leading-[13px] text-[#12115C] ${isArabic ? 'text-right [unicode-bidi:plaintext]' : 'text-left text-ellipsis'}`}>
    {isArabic
        ? `${t(`tickets.${titleKey}`).slice(0, 18)}...`
        : t(`tickets.${titleKey}`)}
</span>
                            <span
                                className={`flex h-[23px] shrink-0 items-center justify-center whitespace-nowrap rounded-[6px] px-1 text-[11px] font-normal leading-[11px] ${isArabic ? 'col-start-1 row-start-1' : 'col-start-3 row-start-1'} ${isInProgress ? 'w-[76px] bg-[#007AFF0D] text-[#007AFF]' : 'w-[68px] bg-[#F59E0B0D] text-[#F59E0B]'}`}
                            >
                                {isInProgress ? t('inProgress') : t('inReview')}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default SupportTickets;


