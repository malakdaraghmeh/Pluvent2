import { useTranslation } from 'react-i18next';

import { SupportTicketNewTicketArrowIcon, SupportTicketNewTicketPlusIcon } from '@/assets';
import ActionButton from '@/components/ui/ActionButton';

import type { HeaderProps } from '../../../utils/types/support-tickets.types';

const Header = ({ onNewTicket }: HeaderProps) => {
    const { t, i18n } = useTranslation('tickets');
    const isArabic = i18n.language.startsWith('ar');

    return (
        <header className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div
                className={`flex min-w-0 flex-1 flex-col gap-3 ${
                    isArabic ? 'text-right' : 'text-left'
                }`}
            >
                <h1 className="text-[24px] font-semibold leading-[24px] tracking-normal text-[#12115C]">
                    {t('header.title')}
                </h1>

                <p className="w-full max-w-[855px] font-['Sora',sans-serif] text-[12px] font-normal leading-[18px] tracking-normal text-[#7E8492]">
                    {t('header.subtitle')}
                </p>
            </div>

            <ActionButton
                onClick={onNewTicket}
                leadingIcon={<SupportTicketNewTicketPlusIcon className="h-5 w-5 shrink-0" />}
                trailingIcon={
                    <SupportTicketNewTicketArrowIcon
                        className={`h-4 w-4 shrink-0 ${isArabic ? 'rotate-180' : ''}`}
                    />
                }
                className="!h-[44px] !w-full !shrink-0 !gap-2 !rounded-[16px] !bg-[#12115C] !px-5 !font-['Sora',sans-serif] !text-[18px] !font-normal !leading-[28px] sm:!w-[191px] 3xl:!h-[44px] 3xl:!w-[191px] 3xl:!gap-2 3xl:!rounded-[16px] 3xl:!px-5 3xl:!text-[18px] 4xl:!h-[44px] 4xl:!w-[191px] 4xl:!gap-2 4xl:!rounded-[16px] 4xl:!px-5 4xl:!text-[18px]"
            >
                {t('header.newTicket')}
            </ActionButton>
        </header>
    );
};

export default Header;
