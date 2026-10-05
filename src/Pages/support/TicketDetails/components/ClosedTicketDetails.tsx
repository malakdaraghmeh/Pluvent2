import { useTranslation } from 'react-i18next';

import { SupportTicketReplyLogo } from '@/assets';
import ActionButton from '@/components/ui/ActionButton';

import type { ClosedTicketDetailsProps } from '../../../../utils/types/support-tickets.types';

export default function ClosedTicketDetails({ ticket, onReopenTicket }: ClosedTicketDetailsProps) {
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

            <section className="flex w-full flex-col gap-4 rounded-[24px] border border-[#ECEFF4] bg-white p-4 sm:p-5 lg:p-6">
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-[20px] font-semibold leading-[32px] tracking-normal text-[#2E2C34]">
                                {t('details.ticketNumber', {
                                    id: ticket.id,
                                })}
                            </h2>

                            <span className="flex h-[30px] min-w-[76px] shrink-0 items-center justify-center rounded-[4px] bg-[#F2F4F7] px-2 text-[14px] font-semibold leading-[18px] tracking-normal text-[#667085]">
                                {t('status.closed')}
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
                    className={`mt-2 flex min-h-[82px] w-full items-end ${
                        isArabic ? 'justify-start' : 'justify-end'
                    }`}
                >
                    <div
                        className={`flex max-w-full items-end gap-2 ${
                            isArabic ? 'flex-row-reverse' : 'flex-row'
                        }`}
                    >
                        <div
                            className={`flex min-w-0 flex-col ${
                                isArabic ? 'items-start' : 'items-end'
                            }`}
                        >
                            <div
                                className={`mb-1 flex h-[20px] items-center gap-4 px-1 ${
                                    isArabic ? 'flex-row-reverse' : 'flex-row'
                                }`}
                            >
                                <span className="text-[14px] font-semibold leading-[19.6px] text-[#12115C]">
                                    {t('details.responseAuthor')}
                                </span>

                                <span className="text-[12px] font-normal leading-[16.8px] text-[#6B7280]">
                                    {t('details.responseTime')}
                                </span>
                            </div>

                            <div className="relative flex min-h-[48px] w-full max-w-[532px] items-center rounded-[100px] bg-[#12115C] px-4 py-[14px]">
                                <p
                                    className={`w-full font-['Sora',sans-serif] text-[13px] font-normal leading-[18.2px] tracking-normal text-[#F7F6F7] ${
                                        isArabic ? 'text-right' : 'text-left'
                                    }`}
                                >
                                    {t('details.responseMessage')}
                                </p>

                                <span
                                    className={`absolute bottom-[-7px] h-[8px] w-[30px] bg-[#12115C] [clip-path:polygon(0_0,100%_0,100%_100%)] ${
                                        isArabic ? 'left-3 scale-x-[-1]' : 'right-3'
                                    }`}
                                />
                            </div>
                        </div>

                        <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[32px] bg-[#12115C] p-2">
                            <img
                                src={SupportTicketReplyLogo}
                                alt=""
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>
                </div>

                <div className={`mt-6 flex w-full ${isArabic ? 'justify-start' : 'justify-end'}`}>
                    <ActionButton
                        type="button"
                        onClick={onReopenTicket}
                        className="!h-[44px] !w-full !rounded-[16px] !border !border-[#12115C] !bg-white !px-5 !font-['Sora',sans-serif] !text-[18px] !font-normal !leading-[28px] !text-[#12115C] sm:!w-[240px] 3xl:!h-[44px] 3xl:!w-[240px] 3xl:!rounded-[16px] 3xl:!px-5 3xl:!text-[18px] 4xl:!h-[44px] 4xl:!w-[240px] 4xl:!rounded-[16px] 4xl:!px-5 4xl:!text-[18px]"
                    >
                        {t('details.form.reopenTicket')}
                    </ActionButton>
                </div>
            </section>
        </div>
    );
}
