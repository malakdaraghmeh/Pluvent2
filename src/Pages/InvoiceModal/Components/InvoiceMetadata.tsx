import { useTranslation } from 'react-i18next';

export default function InvoiceMetadata() {
    const { t } = useTranslation('invoiceModal');

    return (
        <div className="grid h-[64px] shrink-0 grid-cols-3 items-center rounded-[4px] bg-[#F6F8FC] text-center">
            <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                    {t('invoiceId')}
                </p>

                <p className="mt-1 text-[12px] font-bold text-[#1E293B]">
                    {t('invoiceIdValue')}
                </p>
            </div>

            <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                    {t('issuedDate')}
                </p>

                <p className="mt-1 text-[12px] font-bold text-[#1E293B]">
                    {t('issuedDateValue')}
                </p>
            </div>

            <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                    {t('dueDate')}
                </p>

                <p className="mt-1 text-[12px] font-bold text-[#1E293B]">
                    {t('dueDateValue')}
                </p>
            </div>
        </div>
    );
}
