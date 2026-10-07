import { useTranslation } from 'react-i18next';

import {
    Add,
    SupportTicketViewArrowIcon,
} from '@/assets';

import type { HeaderProps } from '../../../../utils/types/support-tickets.types';

const Header = ({ onNewTicket }: HeaderProps) => {
    const { t, i18n } = useTranslation('tickets');
    const isArabic = i18n.language.startsWith('ar');

    const headerDirection = isArabic ? 'sm:flex-row-reverse' : '';
    const textAlignment = isArabic ? 'text-right' : 'text-left';
    const buttonDirection = isArabic ? 'flex-row-reverse' : '';

    return (
        <div
            className={
                'flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ' +
                headerDirection
            }
        >
            <div className={'min-w-0 ' + textAlignment}>
                <h1 className="text-[24px] font-semibold leading-[32px] text-[#12115C]">
                    {t('header.title')}
                </h1>

                <p className="mt-1 text-[14px] font-normal leading-[20px] text-[#84818A]">
                    {t('header.subtitle')}
                </p>
            </div>

            <button
                type="button"
                onClick={onNewTicket}
                className={
                    'inline-flex h-[44px] w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[16px] bg-[#12115C] px-5 text-[16px] font-normal text-white transition-opacity hover:opacity-90 sm:w-auto sm:min-w-[174px] ' +
                    buttonDirection
                }
            >
                <Add
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0"
                />

                <span className="shrink-0 whitespace-nowrap">
                    {t('header.newTicket')}
                </span>

                <SupportTicketViewArrowIcon
                    aria-hidden="true"
                    className={
                        'h-4 w-4 shrink-0 ' +
                        (isArabic ? 'rotate-180' : '')
                    }
                />
            </button>
        </div>
    );
};

export default Header;
