import { useTranslation } from 'react-i18next';

import { SupportTicketReplyLogo } from '@/assets';

import type { TicketReplyStatusProps } from '../../../../utils/types/support-tickets.types';

const TicketReplyStatus = ({ replyStatus }: TicketReplyStatusProps) => {
    const { t } = useTranslation('tickets');

    if (replyStatus.type === 'repliedPreview') {
        return (
            <div className="flex w-full min-w-0 items-center gap-2 sm:h-[44px] sm:w-[459px]">
                <div className="flex min-h-[44px] min-w-0 flex-1 items-center gap-4 rounded-[8px] bg-[rgba(0,229,200,0.0627)] px-3 py-2 sm:h-[44px] sm:py-0">
                    <img
                        src={SupportTicketReplyLogo}
                        alt=""
                        className="h-[25px] w-[20px] shrink-0 object-contain"
                    />

                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <p className="text-[10px] font-semibold leading-[12px] text-[#12115C]">
                            {t('reply.supportTeamReplied')}
                        </p>

                        {replyStatus.textKey && (
                            <p className="mt-[2px] w-full break-words text-[14px] font-normal leading-[18px] text-[#08040B]">
                                {t(replyStatus.textKey)}
                            </p>
                        )}
                    </div>
                </div>

                {replyStatus.badge !== undefined && (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[25px] border border-white bg-[#4CD964] text-[9px] font-semibold leading-none text-white">
                        {replyStatus.badge}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="flex min-h-[44px] min-w-0 items-center gap-2">
            <img
                src={SupportTicketReplyLogo}
                alt=""
                className="h-[25px] w-[20px] shrink-0 object-contain"
            />

            <span className="text-[18px] font-normal leading-[28px] text-[#08040BCC]">
                {replyStatus.type === 'waiting'
                    ? t('reply.waiting')
                    : t('reply.supportTeamReplied')}
            </span>
        </div>
    );
};

export default TicketReplyStatus;
