import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/assets';
import { paymentsData } from '../data/payments';

const Payments = () => {
    const { t } = useTranslation('payments');
    const { locale = 'en' } = useParams();

    return (
        <section className="flex w-full max-w-[380px] flex-col gap-6 rounded-[24px] bg-white px-8 py-6 shadow-[0px_10px_30px_0px_#0000000D]">
            <h2 className="text-[22px] font-semibold text-[#12115C]">{t('title')}</h2>

            <div className="flex w-full flex-col items-center justify-center gap-[6.77px] rounded-[16px] bg-[#ACF5EE80] py-2">
                <p className="text-[45px] font-semibold leading-none text-[#12115C]">$4,000</p>

                <p className="text-center text-[18px] text-[#6B7A99]">{t('totalPaid')}</p>
            </div>

            <div className="flex flex-col gap-3">
                {paymentsData.map(payment => (
                    <div
                        key={payment.id}
                        className="w-full overflow-hidden rounded-[16px] border border-[#F3F4F6] bg-white"
                    >
                        <div
                            className={`flex h-[15px] w-full items-center justify-center text-[9px] font-semibold text-white ${
                                payment.status === 'due' ? 'bg-[#FF3B30]' : 'bg-[#6B7280]'
                            }`}
                        >
                            {payment.status === 'due'
                                ? t('dueIn', { days: payment.days })
                                : t('after', { days: payment.days })}
                        </div>

                        <div className="flex items-center justify-between gap-3 px-5 py-4">
                            <div className="min-w-0">
                                <p className="text-[13px] text-[#9CA3AF]">{t('finalPayment')}</p>

                                <p
                                    className={`mt-1 text-[22px] font-semibold leading-none ${
                                        payment.status === 'due'
                                            ? 'text-[#12115C]'
                                            : 'text-[#5F6573]'
                                    }`}
                                >
                                    {payment.amount}
                                </p>
                            </div>

                            <Link
                                to={`/${locale}/billing`}
                                className={`flex shrink-0 items-center gap-2 text-[12px] font-medium transition-opacity hover:opacity-70 ${
                                    payment.status === 'due' ? 'text-[#2F1ABD]' : 'text-[#12115C]'
                                }`}
                            >
                                {t('payNow')}

                                <ArrowIcon
                                    className={`h-3 w-3 shrink-0 ${
                                        locale === 'ar' ? 'rotate-180' : ''
                                    }`}
                                />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Payments;
