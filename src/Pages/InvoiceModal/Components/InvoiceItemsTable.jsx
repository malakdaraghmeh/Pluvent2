import React from 'react';
import { useTranslation } from 'react-i18next';

export default function InvoiceItemsTable() {
    const { t } = useTranslation('invoice');
    const items = t('items', { returnObjects: true }) || [];

    return (
        <div className="flex-1 mb-6 space-y-2">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 px-4 pb-1">
                <span>{t('description')}</span>
                <span>{t('total')}</span>
            </div>

            <div className="space-y-2">
                {Array.isArray(items) && items.map((item, index) => (
                    <div
                        key={index}
                        className={`flex justify-between items-center py-3.5 px-4 rounded-xl transition-colors ${
                            index % 2 === 0 ? 'bg-[#F6F8FC]' : 'bg-slate-50/70'
                        }`}
                    >
                        <span className="text-xs font-semibold text-slate-700">
                            {item.description}
                        </span>
                        <span className="text-xs font-bold text-slate-900" dir="ltr">
                            {item.total}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}