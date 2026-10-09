import { useTranslation } from 'react-i18next';
import { changeRequestPaymentsData } from '../data/changeRequestPayments';
import VerifiedBadge from './VerifiedBadge';

const paymentTitleKeys: Record<number, string> = {
    1: 'changeRequestPayments.firstPayment',
    2: 'changeRequestPayments.secondPayment',
    3: 'changeRequestPayments.thirdPayment',
    4: 'changeRequestPayments.crPayment',
    5: 'changeRequestPayments.finalPayment',
};

const ChangeRequestPayments = () => {
    const { t, i18n } = useTranslation('supportTickets');
    const isArabic = i18n.language.startsWith('ar');

    return (
        <section className="flex h-full w-full flex-col gap-4 rounded-[24px] bg-white px-5 py-5 shadow-[0px_10px_30px_0px_#0000000D] sm:px-6 sm:py-6 lg:max-w-[380px] 3xl:max-w-[420px] 4xl:max-w-[460px]">
            <div
                className={`flex items-center justify-between gap-4 ${
                    isArabic ? 'flex-row-reverse' : 'flex-row'
                }`}
            >
                <h2
                    className={`text-[22px] font-semibold leading-[28px] text-[#12115C] ${
                        isArabic ? 'text-right' : 'text-left'
                    }`}
                >
                    {t('changeRequestPayments.title')}
                </h2>

                <VerifiedBadge />
            </div>

            <div className="flex w-full flex-1 flex-col justify-between">
                {changeRequestPaymentsData.map(payment => (
                    <div
                        key={payment.id}
                        className={`flex h-[61px] w-full items-center justify-between gap-4 rounded-[16px] border-[0.5px] border-[#B1B4B6] bg-white px-4 sm:px-6 ${
                            isArabic ? 'flex-row-reverse' : 'flex-row'
                        }`}
                    >
                        <p
                            className={`min-w-0 break-words text-[13px] text-[#9CA3AF] ${
                                isArabic ? 'text-right' : 'text-left'
                            }`}
                        >
                            {t(paymentTitleKeys[payment.id])}
                        </p>

                        <p className="shrink-0 text-[16px] font-semibold text-[#6B7280]">
                            {payment.amount}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ChangeRequestPayments;
