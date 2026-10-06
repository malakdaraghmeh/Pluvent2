import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft } from '@/assets';
import { upcomingPayments } from '../data/upcomingPayments';

const UpcomingPayments = () => {
    const { t } = useTranslation('upcomingPayments');
    const { locale = 'en' } = useParams();
    const isArabic = locale.startsWith('ar');

    return (
        <section className="box-border h-full w-full min-w-0 rounded-[24px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.0314)] sm:p-5 lg:p-6 min-[1920px]:p-7 min-[2500px]:p-8">
            <div
                className={`mb-4 flex w-full min-w-0 items-center justify-between gap-2 ${
                    isArabic ? 'flex-row-reverse' : 'flex-row'
                }`}
            >
                <h2
                    className={`shrink-0 whitespace-nowrap text-[20px] font-semibold leading-5 text-[#12115C] ${
                        isArabic ? 'text-right' : 'text-left'
                    }`}
                >
                    {t('title')}
                </h2>

                <Link
                    to={`/${locale}/billing`}
                    className="shrink-0 whitespace-nowrap text-[14px] font-normal leading-[14px] text-[#3634C7] transition-opacity hover:opacity-70"
                >
                    {t('viewAll')}
                </Link>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-4">
                {upcomingPayments.map(payment => (
                    <article
                        key={payment.id}
                        className="flex min-h-[122px] w-full min-w-0 flex-col justify-between rounded-[16px] border border-[#E5E7EB] p-4 sm:p-5"
                    >
                        <div
                            className={`grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-2 ${
                                isArabic ? '[direction:rtl]' : ''
                            }`}
                        >
                            <div
                                className={`min-w-0 ${
                                    isArabic ? 'text-right' : 'text-left'
                                }`}
                            >
                                <Link
                                    to={`/${locale}/projects/${payment.id}`}
                                    className="block min-w-0 text-[14px] font-semibold leading-[18px] text-[#12115C] transition-opacity hover:opacity-70 min-[1400px]:whitespace-nowrap"
                                >
                                    {t('projectName')}
                                </Link>

                                <p className="mt-1 text-[12px] font-normal leading-3 text-[#A0A8B8]">
                                    {t('finalPayment')}
                                </p>
                            </div>

                            <p className="shrink-0 whitespace-nowrap text-[22px] font-semibold leading-[22px] text-[#12115C] [unicode-bidi:isolate]">
                                {payment.amount}
                            </p>
                        </div>

                        <div
                            className={`mt-4 flex w-full min-w-0 items-center justify-between gap-3 ${
                                isArabic ? 'flex-row-reverse' : 'flex-row'
                            }`}
                        >
                            <span
                                className={`shrink-0 whitespace-nowrap rounded-[6px] px-[10px] py-1 text-[11px] font-semibold leading-[11px] ${
                                    payment.dueType === 'danger'
                                        ? 'bg-[#FFF1F1] text-[#FF3B30]'
                                        : 'bg-[#FFF7E6] text-[#FF9500]'
                                }`}
                            >
                                {t('dueIn', {
                                    days: payment.dueDays,
                                })}
                            </span>

                            <Link
                                to={`/${locale}/projects/${payment.id}`}
                                className={`flex shrink-0 items-center gap-2 whitespace-nowrap text-[12px] font-semibold leading-3 text-[#2F1ABD] transition-opacity hover:opacity-70 ${
                                    isArabic
                                        ? 'flex-row-reverse'
                                        : 'flex-row'
                                }`}
                            >
                                <span>{t('openProject')}</span>

                                <ChevronLeft
                                    className={`h-4 w-4 shrink-0 ${
                                        isArabic ? 'rotate-180' : ''
                                    }`}
                                />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default UpcomingPayments;