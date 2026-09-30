import React from 'react';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function InvoiceTotalSummary({ onDownloadPdf, isRtl }) {
    const { t } = useTranslation('invoice');

    return (
        <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4">
            <button
                type="button"
                onClick={onDownloadPdf}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
                <Download className="w-4 h-4" />
                <span>{t('downloadPdf')}</span>
            </button>

            <div className={`mb-4 sm:mb-8 w-full sm:w-auto ${isRtl ? 'text-left' : 'text-right'}`}>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {t('totalAmountLabel')}
                </p>
                <p className="text-xl sm:text-2xl font-black text-[#00C4A0] my-0.5" dir="ltr">
                    {t('totalAmountValue')}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {t('totalVat')}
                </p>
            </div>
        </div>
    );
}