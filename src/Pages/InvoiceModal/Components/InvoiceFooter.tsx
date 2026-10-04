import { useTranslation } from 'react-i18next';

import { LogoPulvent } from '@/assets';
import type { InvoiceFooterProps } from '@/utils/types/invoice.types';

export default function InvoiceFooter({ isRtl }: InvoiceFooterProps) {
    const { t } = useTranslation('invoiceModal');

    return (
        <div className="mx-auto flex h-[54.02px] w-[499px] shrink-0 items-end justify-between">
            <div
                className={`text-[10px] leading-[14px] text-[#94A3B8] ${
                    isRtl ? 'text-right' : 'text-left'
                }`}
            >
                <p className="font-semibold">{t('agencyName')}</p>
                <p>{t('agencyWebsite')}</p>
                <p>{t('agencyContact')}</p>
            </div>

            <LogoPulvent className="h-10 w-10 shrink-0" />
        </div>
    );
}
