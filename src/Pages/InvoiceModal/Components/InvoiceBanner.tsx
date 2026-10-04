import { useTranslation } from 'react-i18next';

import type { InvoiceBannerProps } from '@/utils/types/invoice.types';

export default function InvoiceBanner({ isRtl }: InvoiceBannerProps) {
    const { t } = useTranslation('invoiceModal');

    return (
        <div className="flex h-[142px] w-full shrink-0 items-center justify-between rounded-[4px] bg-[#12115C] px-7 py-[30px]">
            <div
                className={`flex min-w-0 flex-1 flex-col gap-1 ${
                    isRtl ? 'text-right' : 'text-left'
                }`}
            >
                <p className="text-[10px] font-semibold uppercase text-white">
                    {t('invoiceTo')}
                </p>

                <h3 className="text-[16px] font-semibold leading-5 text-white">
                    {t('client.name')}
                </h3>

                <p className="text-[11px] leading-4 text-white">
                    {t('client.phone')}
                </p>

                <p className="whitespace-pre-line text-[11px] leading-4 text-white">
                    {t('client.address')}
                </p>
            </div>

            <div className="flex h-[92px] w-[210px] shrink-0 flex-col justify-between rounded-[4px] bg-white px-4 py-3 text-right">
                <p className="text-[10px] font-semibold uppercase text-[#94A3B8]">
                    {t('amountDue')}
                </p>

                <p className="whitespace-nowrap text-[24px] font-black leading-7 text-[#00C4A0]">
                    {t('amountDueValue')}
                </p>

                <div className="flex items-center justify-between gap-2 text-[10px] font-semibold text-[#94A3B8]">
                    <span>{t('vatNumber')}</span>
                    <span>{t('dateDueHeader')}</span>
                </div>
            </div>
        </div>
    );
}
