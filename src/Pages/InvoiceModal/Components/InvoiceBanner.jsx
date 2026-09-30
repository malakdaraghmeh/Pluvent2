import React from 'react';
import { useTranslation } from 'react-i18next';

export default function InvoiceBanner({ isRtl }) {
    const { t } = useTranslation('invoice');

    return (
        <div className="bg-[#12115C] text-white rounded-lg p-4 sm:p-6 mb-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Invoice To */}
            <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest font-bold">
                    {t('invoiceTo')}
                </p>
                <h3 className="text-base font-bold text-white tracking-wide">
                    {t('clientName')}
                </h3>
                <p className="text-[11px] font-light" dir="ltr">
                    {t('clientPhone')}
                </p>
                <p className="text-[11px] font-light leading-snug whitespace-pre-line">
                    {t('clientAddress')}
                </p>
            </div>

            {/* Amount Due Card */}
            <div className={`bg-white rounded-lg p-4 shadow-sm w-full sm:w-auto sm:min-w-[210px] ${isRtl ? 'text-left' : 'text-right'}`}>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {t('amountDue')}
                </p>
                <p className="text-xl sm:text-2xl font-black text-[#00C4A0] my-0.5" dir="ltr">
                    {t('amountDueValue')}
                </p>
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mt-1">
                    <span>{t('vatNumber')}</span>
                    <span>{t('dateDueHeader')}</span>
                </div>
            </div>
        </div>
    );
}