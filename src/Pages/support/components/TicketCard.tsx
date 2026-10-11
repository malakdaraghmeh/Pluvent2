import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { SupportTicketViewArrowIcon } from '@/assets';
import ActionButton from '@/components/ui/ActionButton';

import type {
    TicketCardProps,
    TicketDetailsLocationState,
} from '../../../../utils/types/support-tickets.types';

import TicketReplyStatus from './TicketReplyStatus';

export default function TicketCard({ ticket }: TicketCardProps) {
    const navigate = useNavigate();
    const { locale } = useParams();
    const { t, i18n } = useTranslation('tickets');

    const isArabic = i18n.language.startsWith('ar');
    const currentLocale = locale || (isArabic ? 'ar' : 'en');

    const getStatusClassName = () => {
        switch (ticket.status) {
            case 'open':
                return 'bg-[#2F1ABD10] text-[#2F1ABD]';
            case 'inProgress':
                return 'bg-[#FFF8E7] text-[#E6A700]';
            case 'pendingReply':
                return 'bg-[#EFFDFC] text-[#2DB2AB]';
            case 'closed':
                return 'bg-[#FF3B301A]/10 text-[#FF3B30]';
            default:
                return 'bg-[#F2F4F7] text-[#667085]';
        }
    };

    const handleViewTicket = () => {
        const state: TicketDetailsLocationState = {
            ticket,
        };

        navigate(`/${currentLocale}/support/${ticket.id}`, {
            state,
        });
    };

    return (
        <article className="w-full rounded-[24px] border border-[#ECEFF4] bg-white p-4 sm:p-5 lg:p-6">
            <div className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-[20px] font-semibold leading-[32px] tracking-normal text-[#2E2C34]">
                                {t('card.ticketNumber', {
                                    id: ticket.id,
                                })}
                            </h2>

                            <span
                                className={`flex h-[30px] w-fit shrink-0 items-center justify-center rounded-[4px] px-2 text-[14px] font-semibold leading-[18px] tracking-normal ${
                                    ticket.status === 'pendingReply'
                                        ? 'min-w-[120px]'
                                        : ''
                                } ${getStatusClassName()}`}
                            >
                                {t(`status.${ticket.status}`)}
                            </span>
                        </div>

                        <p className="text-[18px] font-normal leading-[32px] tracking-normal text-[#6B7280]">
                            {t('card.uploadedBy', {
                                name: ticket.uploadedBy,
                            })}
                        </p>
                    </div>

                    <div
                        className={`flex shrink-0 flex-col gap-2 items-center ${
                            isArabic
                                ? 'items-start text-left'
                                : 'items-end text-right'
                        }`}
                    >
                        <p className="text-[18px] font-bold leading-[20px] tracking-normal text-[#12115C]">
                            {t(`type.${ticket.type}`)}
                        </p>

                        <p className="text-[14px] font-normal leading-[20px] tracking-normal text-[#84818A]">
                            {t('card.postedAt', {
                                time: ticket.date,
                            })}
                        </p>
                    </div>
                </div>

                <p
                    className={`w-full text-[16px] font-normal leading-[32px] tracking-normal text-[#84818A] ${
                        isArabic ? 'text-right' : 'text-left'
                    }`}
                >
                    {t(ticket.contentKey)}
                </p>

                <TicketReplyStatus replyStatus={ticket.replyStatus} />

                <div
                    className={`flex w-full ${
                        isArabic ? 'justify-start' : 'justify-end'
                    }`}
                >
                    <ActionButton
                        type="button"
                        onClick={handleViewTicket}
                        trailingIcon={
                            <SupportTicketViewArrowIcon
                                className={`h-4 w-4 shrink-0 ${
                                    isArabic ? 'rotate-180' : ''
                                }`}
                            />
                        }
                        className={`!h-[44px] !w-full !shrink-0 !gap-2 !rounded-[16px] !px-5 !font-['Sora',sans-serif] !text-[18px] !font-normal !leading-[28px] sm:!w-[191px] ${isArabic ? '!flex-row-reverse' : ''}`}
                    >
                        {t('card.viewTicket')}
                    </ActionButton>
                </div>
            </div>
        </article>
    );
}