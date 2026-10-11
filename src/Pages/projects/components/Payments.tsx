import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/assets';
import PaymentFlow from '@/Pages/billing/components/PaymentFlow';
import { paymentsData } from '../data/payments';

const Payments = () => {
    const { t, i18n } = useTranslation('payments');
    const [isPaymentFlowOpen, setIsPaymentFlowOpen] = useState(false);

    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';

    return (
        <>
            <section className="flex h-full w-full min-w-0 flex-col gap-4 rounded-[24px] bg-white px-5 py-6 shadow-[0px_10px_30px_0px_#0000000D] sm:px-6 xl:px-8">
                <div className="flex min-h-[32px] w-full items-center">
                    <h2
                        className={`text-[22px] font-semibold leading-[28px] text-[#12115C] ${textAlignment}`}
                    >
                        {t('title')}
                    </h2>
                </div>

                <div className="flex min-h-[103px] w-full flex-col items-center justify-center gap-[6.77px] rounded-[16px] bg-[#ACF5EE80] py-2">
                    <p className="text-[40px] font-semibold leading-none text-[#12115C] sm:text-[45px]">
                        $4,000
                    </p>

                    <p className="text-center text-[16px] text-[#6B7A99] sm:text-[18px]">
                        {t('totalPaid')}
                    </p>
                </div>

                <div className="flex w-full flex-col gap-4">
                    {paymentsData.map(payment => {
                        const isDue = payment.status === 'due';

                        return (
                            <div
                                key={payment.id}
                                className={`h-[96px] w-full overflow-hidden rounded-[16px] border bg-white ${
                                    isDue ? 'border-[#FF3B30]' : 'border-[#B1B4B6]'
                                }`}
                            >
                                <div
                                    className={`flex h-[15px] w-full items-center justify-center text-[9px] font-semibold leading-none text-white ${
                                        isDue ? 'bg-[#FF3B30]' : 'bg-[#6B7280]'
                                    }`}
                                >
                                    {isDue
                                        ? t('dueIn', {
                                              days: payment.days,
                                          })
                                        : t('after', {
                                              days: payment.days,
                                          })}
                                </div>

                                <div className="flex h-[80px] min-w-0 items-center justify-between gap-3 px-6">
                                    <div className={`min-w-0 ${textAlignment}`}>
                                        <p className="text-[13px] leading-[18px] text-[#9CA3AF]">
                                            {t('finalPayment')}
                                        </p>

                                        <p
                                            className={`mt-1 text-[20px] font-semibold leading-none sm:text-[22px] ${
                                                isDue ? 'text-[#12115C]' : 'text-[#5F6573]'
                                            }`}
                                        >
                                            {payment.amount}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (isDue) {
                                                setIsPaymentFlowOpen(true);
                                            }
                                        }}
                                        className={`flex shrink-0 items-center gap-2 whitespace-nowrap text-[12px] font-medium ${
                                            isArabic ? 'flex-row-reverse' : 'flex-row'
                                        } ${
                                            isDue
                                                ? 'cursor-pointer text-[#2F1ABD] transition-opacity hover:opacity-70'
                                                : 'cursor-default text-[#12115C]'
                                        }`}
                                    >
                                        <span>{t('payNow')}</span>

                                        <ArrowIcon
                                            className={`h-3 w-3 shrink-0 ${
                                                isArabic ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <PaymentFlow isOpen={isPaymentFlowOpen} onClose={() => setIsPaymentFlowOpen(false)} />
        </>
    );
};

export default Payments;
