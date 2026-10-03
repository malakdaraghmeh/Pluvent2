import { useTranslation } from 'react-i18next';

import { Billing1, Billing2, Billing3, Billing4 } from '@/assets';

import { billingSummaryData } from '../data/billing';

const billingIcons = [Billing1, Billing2, Billing3, Billing4];
const iconBackgrounds = ['bg-[#EFF6FF]', 'bg-[#ECFDF5]', 'bg-[#FFF7ED]', 'bg-[#FEF2F2]'];

const BillingSummary = () => {
    const { t, i18n } = useTranslation('billingPage');
    const isArabic = i18n.language.startsWith('ar');

    return (
        <section className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {billingSummaryData.map((item, index) => {
                const Icon = billingIcons[index];

                return (
                    <div
                        key={item.id}
                        className="flex min-h-[96px] min-w-0 items-center gap-3 rounded-[20px] border border-[#ECEFF4] bg-white px-4 py-4"
                    >
                        <div
                            className={`flex size-12 shrink-0 items-center justify-center rounded-xl p-3 ${iconBackgrounds[index]}`}
                        >
                            <Icon className="size-6" />
                        </div>

                        <div
                            className={`min-w-0 flex-1 ${
                                isArabic ? 'text-right' : 'text-left'
                            }`}
                        >
                            <p className="whitespace-nowrap text-[12px] font-semibold leading-[18px] text-[#64748B]">
                                {t(`summary.${item.translationKey}.title`)}
                            </p>

                            <p className="whitespace-nowrap text-[15px] font-semibold leading-[21px] tracking-[-0.2px] text-[#0F172A] 3xl:text-[17px] 3xl:leading-[23px] 4xl:text-[19px] 4xl:leading-[25px]">
                                {t(`summary.${item.translationKey}.value`)}
                            </p>

                            <p className="whitespace-nowrap text-[11px] leading-[16px] text-[#94A3B8]">
                                {t(`summary.${item.translationKey}.description`)}
                            </p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default BillingSummary;