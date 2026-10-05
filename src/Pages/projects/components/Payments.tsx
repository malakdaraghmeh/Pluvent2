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
            <section className="flex w-full min-w-0 flex-col gap-6 rounded-[24px] bg-white px-5 py-6 shadow-[0px_10px_30px_0px_#0000000D] sm:px-6 xl:px-8">
                <h2 className={`text-[22px] font-semibold text-[#12115C] ${textAlignment}`}>
                    {t('title')}
                </h2>
                <div className="flex w-full flex-col items-center justify-center gap-[6.77px] rounded-[16px] bg-[#ACF5EE80] py-2">
                    <p className="text-[40px] font-semibold leading-none text-[#12115C] sm:text-[45px]">
                        $4,000
                    </p>
                    <p className="text-center text-[16px] text-[#6B7A99] sm:text-[18px]">
                        {t('totalPaid')}
                    </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                    {paymentsData.map(payment => (
                        <div
                            key={payment.id}
                            className="w-full overflow-hidden rounded-[16px] border border-[#F3F4F6] bg-white"
                        >
                            <div
                                className={`flex h-[15px] w-full items-center justify-center text-[9px] font-semibold text-white ${payment.status === 'due' ? 'bg-[#FF3B30]' : 'bg-[#6B7280]'}`}
                            >
                                {payment.status === 'due'
                                    ? t('dueIn', { days: payment.days })
                                    : t('after', { days: payment.days })}
                            </div>
                            <div className="flex min-w-0 items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-5">
                                <div className={`min-w-0 ${textAlignment}`}>
                                    <p className="text-[13px] text-[#9CA3AF]">
                                        {t('finalPayment')}
                                    </p>
                                    <p
                                        className={`mt-1 text-[20px] font-semibold leading-none sm:text-[22px] ${payment.status === 'due' ? 'text-[#12115C]' : 'text-[#5F6573]'}`}
                                    >
                                        {payment.amount}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsPaymentFlowOpen(true)}
                                    className={`flex shrink-0 items-center gap-2 whitespace-nowrap text-[12px] font-medium transition-opacity hover:opacity-70 ${isArabic ? 'flex-row-reverse' : ''} ${payment.status === 'due' ? 'text-[#2F1ABD]' : 'text-[#12115C]'}`}
                                >
                                    <span>{t('payNow')}</span>
                                    <ArrowIcon
                                        className={`h-3 w-3 shrink-0 transition-transform ${isArabic ? 'rotate-180' : ''}`}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <PaymentFlow isOpen={isPaymentFlowOpen} onClose={() => setIsPaymentFlowOpen(false)} />
        </>
    );
};

export default Payments;
