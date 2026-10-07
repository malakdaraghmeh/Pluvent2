import { useTranslation } from 'react-i18next';

export default function InvoiceBanner() {
    const { t, i18n } = useTranslation('invoiceModal');
    const isArabic = i18n.language.startsWith('ar');

    return (
        <div className="relative h-[142px] w-full shrink-0 rounded-[4px] bg-[#12115C]">
            <div
                className={`absolute top-[30px] w-[245px] ${
                    isArabic ? 'right-7 text-right' : 'left-7 text-left'
                }`}
            >
                <p className="text-[10px] font-semibold uppercase text-white">{t('invoiceTo')}</p>

                <h3 className="mt-1 text-[16px] font-semibold leading-5 text-white">
                    {t('client.name')}
                </h3>

                <p className="mt-1 text-[11px] leading-4 text-white">{t('client.phone')}</p>

                <p className="whitespace-pre-line text-[11px] leading-4 text-white">
                    {t('client.address')}
                </p>
            </div>

            <div
                className={`absolute top-[25px] flex h-[92px] w-[210px] flex-col justify-between rounded-[4px] bg-white px-4 py-3 text-right ${
                    isArabic ? 'left-7' : 'right-7'
                }`}
            >
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
