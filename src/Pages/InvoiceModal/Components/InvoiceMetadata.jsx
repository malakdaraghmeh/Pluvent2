import React from 'react';
import { useTranslation } from 'react-i18next';

export default function InvoiceMetadata() {
    const { t } = useTranslation('invoice');

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 py-3 px-2 border-b border-slate-100 text-center mb-5 bg-[#F6F8FC]">
            <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {t('invoiceIdLabel')}
                </p>
                <p className="text-xs font-bold text-slate-800 mt-1">
                    {t('invoiceIdValue')}
                </p>
            </div>
            <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {t('issuedDateLabel')}
                </p>
                <p className="text-xs font-bold text-slate-800 mt-1">
                    {t('issuedDateValue')}
                </p>
            </div>
            <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {t('dueDateLabel')}
                </p>
                <p className="text-xs font-bold text-slate-800 mt-1">
                    {t('dueDateValue')}
                </p>
            </div>
        </div>
    );
}