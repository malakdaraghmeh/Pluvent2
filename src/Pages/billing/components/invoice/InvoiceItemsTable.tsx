import { useTranslation } from 'react-i18next';
import type { InvoiceItem } from '../../../../../utils/types/invoice.types';

export default function InvoiceItemsTable() {
    const { t } = useTranslation('invoiceModal');

    const items = t('items', {
        returnObjects: true,
    }) as InvoiceItem[];

    return (
        <div className="h-[192px] shrink-0 pt-2">
            <div className="flex h-6 items-center justify-between px-4 text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                <span>{t('description')}</span>
                <span>{t('total')}</span>
            </div>

            <div className="flex flex-col gap-2">
                {Array.isArray(items) &&
                    items.map((item, index) => (
                        <div
                            key={`${item.description}-${index}`}
                            className="flex h-[48px] items-center justify-between rounded-[8px] bg-[#F6F8FC] px-4 text-[12px] font-semibold text-[#334155]"
                        >
                            <span>{item.description}</span>

                            <span className="whitespace-nowrap font-bold text-[#1E293B]">
                                {item.total}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
}
