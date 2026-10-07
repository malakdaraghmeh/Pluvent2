import { useTranslation } from 'react-i18next';

import { SupportTicketRemindIcon } from '@/assets';
import ActionButton from '@/components/ui/ActionButton';

import type { PendingReplyTicketDetailsProps } from '../../../../../utils/types/support-tickets.types';

export default function PendingReplyTicketDetails({
    ticket,
    onCloseTicket,
    onRemind,
}: PendingReplyTicketDetailsProps) {
    const { t, i18n } = useTranslation('tickets');

    const isArabic = i18n.language.startsWith('ar');

    return (
        <div className="flex w-full flex-col gap-6">
            <h1
                className={`font-['Sora',sans-serif] text-[28px] font-semibold leading-[28px] tracking-normal text-[#12115C] ${
                    isArabic ? 'text-right' : 'text-left'
                }`}
            >
                {t('details.title')}
            </h1>

            <section className="flex w-full flex-col rounded-[24px] border border-[#ECEFF4] bg-white p-4 sm:p-5 lg:p-6">
                <div className="flex w-full flex-col gap-4">
                    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="text-[20px] font-semibold leading-[32px] tracking-normal text-[#2E2C34]">
                                    {t('details.ticketNumber', {
                                        id: ticket.id,
                                    })}
                                </h2>

                                <span className="flex h-[30px] w-fit min-w-[120px] shrink-0 items-center justify-center gap-1 rounded-[4px] bg-[#EFFDFC] px-2 py-[6px] text-[14px] font-semibold leading-[18px] tracking-normal text-[#2DB2AB]">
                                    {t('status.pendingReply')}
                                </span>
                            </div>

                            <p className="text-[18px] font-normal leading-[32px] tracking-normal text-[#6B7280]">
                                {t('details.uploadBy', {
                                    name: ticket.uploadedBy,
                                })}
                            </p>
                        </div>

                        <div
                            className={`flex shrink-0 flex-col gap-4 ${
                                isArabic ? 'items-start text-left' : 'items-end text-right'
                            }`}
                        >
                            <p className="text-[18px] font-bold leading-[20px] tracking-normal text-[#12115C]">
                                {t(`type.${ticket.type}`)}
                            </p>

                            <p className="text-[14px] font-normal leading-[20px] tracking-normal text-[#84818A]">
                                {t('details.postedAt', {
                                    time: ticket.date,
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-4">
                        <h3
                            className={`text-[18px] font-semibold leading-[14px] tracking-normal text-[#2E2C34] ${
                                isArabic ? 'text-right' : 'text-left'
                            }`}
                        >
                            {t('details.questionTitle')}
                        </h3>

                        <div
                            className={`flex w-full flex-col gap-4 text-[14px] font-normal leading-[20px] tracking-normal text-[#84818A] ${
                                isArabic ? 'text-right' : 'text-left'
                            }`}
                        >
                            <p>{t('details.questionParagraphOne')}</p>

                            <p>{t('details.questionParagraphTwo')}</p>

                            <p>{t('details.questionParagraphOne')}</p>
                        </div>
                    </div>

                    <div
                        className={`mt-6 flex w-full flex-col gap-3 sm:flex-row sm:items-center ${
                            isArabic ? 'sm:justify-start' : 'sm:justify-end'
                        } sm:gap-4`}
                    >
                        <ActionButton
                            type="button"
                            onClick={onCloseTicket}
                            className="!h-[44px] !w-full !rounded-[16px] !border !border-[#F23333] !bg-white !px-4 !font-['Sora',sans-serif] !text-[18px] !font-normal !leading-[28px] !text-[#F23333] sm:!w-[240px] 3xl:!h-[44px] 3xl:!w-[240px] 3xl:!rounded-[16px] 3xl:!px-4 3xl:!text-[18px] 4xl:!h-[44px] 4xl:!w-[240px] 4xl:!rounded-[16px] 4xl:!px-4 4xl:!text-[18px]"
                        >
                            {t('details.form.closeTicket')}
                        </ActionButton>

                        <ActionButton
                            type="button"
                            onClick={onRemind}
                            leadingIcon={<SupportTicketRemindIcon className="h-6 w-6 shrink-0" />}
                            className="!h-[44px] !w-full !gap-2 !rounded-[16px] !border !border-[#2DB2AB] !bg-white !px-4 !font-['Sora',sans-serif] !text-[18px] !font-normal !leading-[28px] !text-[#2DB2AB] sm:!w-[240px] 3xl:!h-[44px] 3xl:!w-[240px] 3xl:!gap-2 3xl:!rounded-[16px] 3xl:!px-4 3xl:!text-[18px] 4xl:!h-[44px] 4xl:!w-[240px] 4xl:!gap-2 4xl:!rounded-[16px] 4xl:!px-4 4xl:!text-[18px]"
                        >
                            {t('details.form.remindMe')}
                        </ActionButton>
                    </div>
                </div>
            </section>
        </div>
    );
}
