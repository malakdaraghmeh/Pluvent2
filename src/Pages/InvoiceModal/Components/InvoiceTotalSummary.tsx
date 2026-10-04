import { useTranslation } from 'react-i18next';

import { DownloadBilling } from '@/assets';
import type { InvoiceTotalSummaryProps } from '@/utils/types/invoice.types';

export default function InvoiceTotalSummary({
    onDownloadPdf,
}: InvoiceTotalSummaryProps) {
    const { t } = useTranslation('invoiceModal');

    return (
        <div className="flex h-[80px] shrink-0 items-center justify-between border-t border-[#E8ECF4]">
            <button
                type="button"
                onClick={onDownloadPdf}
                className="inline-flex items-center gap-2 text-[12px] font-bold text-[#12115C]"
            >
                <DownloadBilling className="size-4 shrink-0" />
                <span>{t('pdfButton')}</span>
            </button>

            <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                    {t('totalAmount')}
                </p>

                <p className="whitespace-nowrap text-[24px] font-black leading-7 text-[#00C4A0]">
                    {t('totalAmountValue')}
                </p>

                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                    {t('totalVat')}
                </p>
            </div>
        </div>
    );
}
