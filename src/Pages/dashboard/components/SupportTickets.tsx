import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChatDecorationIcon, ChatIcon } from '@/assets';
import { supportTickets } from '../data/supportTickets';

const SupportTickets = () => {
    const { t } = useTranslation('supportTickets');
    const { locale = 'en' } = useParams();

    return (
        <section className="relative flex w-full min-w-0 flex-1 flex-col rounded-[24px] bg-white p-4 pb-10 shadow-[0_4px_20px_rgba(0,0,0,0.0314)] sm:p-5 sm:pb-10 lg:p-6 lg:pb-10 3xl:p-7 3xl:pb-12 4xl:p-8 4xl:pb-14">
            <div className="mb-6 flex w-full min-w-0 items-start justify-between gap-3 3xl:mb-7 4xl:mb-8">
                <h2 className="min-w-0 break-words text-start text-[18px] font-semibold leading-[24px] text-[#12115C] lg:text-[20px] 3xl:text-[22px] 3xl:leading-[28px] 4xl:text-[24px]">
                    {t('title')}
                </h2>

                <Link
                    to={`/${locale}/support`}
                    className="shrink-0 text-[14px] leading-[20px] text-[#3634C7] transition-opacity hover:opacity-70 3xl:text-[15px] 4xl:text-[16px]"
                >
                    {t('viewAll')}
                </Link>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-6 3xl:gap-7 4xl:gap-8">
                {supportTickets.map(ticket => (
                    <Link
                        key={ticket.id}
                        to={`/${locale}/support/${ticket.id}`}
                        className="grid min-h-[54px] w-full min-w-0 grid-cols-[58px_minmax(0,1fr)_82px] items-center gap-3 rounded-[12px] bg-[#F8FAFC] px-3 py-3 transition-colors hover:bg-[#F3F6FA] 3xl:min-h-[60px] 3xl:grid-cols-[64px_minmax(0,1fr)_90px] 3xl:px-4 4xl:min-h-[66px] 4xl:grid-cols-[70px_minmax(0,1fr)_96px] 4xl:px-5"
                    >
                        <span className="text-[10px] font-medium leading-[14px] text-[#94A3B8] 3xl:text-[11px] 4xl:text-[12px]">
                            {ticket.ticketNumber}
                        </span>

                        <span className="min-w-0 whitespace-normal break-words text-start text-[10px] font-semibold leading-[14px] text-[#12115C] sm:text-[11px] 3xl:text-[12px] 4xl:text-[13px]">
                            {ticket.title}
                        </span>

                        <span
                            className={`w-[82px] justify-self-end rounded-[6px] px-2 py-[5px] text-center text-[10px] font-medium leading-[14px] 3xl:w-[90px] 3xl:text-[11px] 4xl:w-[96px] 4xl:text-[12px] ${
                                ticket.status === 'In Progress'
                                    ? 'bg-[#007AFF0D] text-[#007AFF]'
                                    : 'bg-[#FF95000D] text-[#FF9500]'
                            }`}
                        >
                            {ticket.status === 'In Progress' ? t('inProgress') : t('inReview')}
                        </span>
                    </Link>
                ))}
            </div>

            <Link
                to={`/${locale}/messages`}
                aria-label="Chat"
                className="absolute bottom-[-8px] end-[8px] z-30 h-[65px] w-[77px] 3xl:h-[72px] 3xl:w-[84px] 4xl:h-[78px] 4xl:w-[90px]"
            >
                <span className="absolute bottom-0 end-0 flex h-[52px] w-[52px] flex-col items-center justify-center rounded-full bg-[#12115C] shadow-[0_4px_12px_rgba(18,17,92,0.25)] 3xl:h-[58px] 3xl:w-[58px] 4xl:h-[64px] 4xl:w-[64px]">
                    <ChatIcon className="h-8 w-8 shrink-0 3xl:h-9 3xl:w-9 4xl:h-10 4xl:w-10" />

                    <span className="-mt-1 text-[10px] font-semibold leading-none text-white 3xl:text-[11px] 4xl:text-[12px]">
                        chat
                    </span>
                </span>

                <ChatDecorationIcon className="absolute end-[-2px] top-0 h-8 w-8 3xl:h-9 3xl:w-9 4xl:h-10 4xl:w-10" />
            </Link>
        </section>
    );
};

export default SupportTickets;
