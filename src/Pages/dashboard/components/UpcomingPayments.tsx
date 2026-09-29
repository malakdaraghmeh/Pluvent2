import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowIcon from '@icons/arrow.svg?react';
import { upcomingPayments } from '../data/upcomingPayments';

const UpcomingPayments = () => {
    const { t } = useTranslation('upcomingPayments');
    const { locale = 'en' } = useParams();

    const getDueText = (days: number) => t('dueIn').replace('{days}', String(days));

    return (
        <section className="box-border w-full min-w-0 rounded-[24px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.0314)] sm:p-5 lg:p-6 3xl:p-7 4xl:p-8">
            <div className="mb-4 flex w-full min-w-0 items-start justify-between gap-3 3xl:mb-5 4xl:mb-6">
                <h2 className="min-w-0 break-words text-start text-[18px] font-semibold leading-[24px] text-[#12115C] lg:text-[20px] 3xl:text-[22px] 3xl:leading-[28px] 4xl:text-[24px]">
                    {t('title')}
                </h2>

                <Link
                    to={`/${locale}/billing`}
                    className="shrink-0 text-[14px] leading-[20px] text-[#3634C7] transition-opacity hover:opacity-70 3xl:text-[15px] 4xl:text-[16px]"
                >
                    {t('viewAll')}
                </Link>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-4 3xl:gap-5 4xl:gap-6">
                {upcomingPayments.map(payment => (
                    <article
                        key={payment.id}
                        className="flex min-h-[122px] w-full min-w-0 flex-col justify-between rounded-[16px] border border-[#E5E7EB] p-4 sm:p-5 lg:p-6 3xl:min-h-[136px] 3xl:p-7 4xl:min-h-[148px] 4xl:p-8"
                    >
                        <div className="flex w-full min-w-0 flex-wrap items-start justify-between gap-x-3 gap-y-2">
                            <div className="min-w-0 flex-1">
                                <h3 className="break-words text-start text-[14px] font-semibold leading-[19px] text-[#12115C] 3xl:text-[15px] 3xl:leading-[21px] 4xl:text-[16px] 4xl:leading-[22px]">
                                    {payment.projectName}
                                </h3>

                                <p className="mt-2 break-words text-start text-[12px] leading-[16px] text-[#A0A8B8] 3xl:text-[13px] 4xl:text-[14px]">
                                    {t('finalPayment')}
                                </p>
                            </div>

                            <p
                                dir="ltr"
                                className="shrink-0 whitespace-nowrap text-[18px] font-semibold leading-[22px] text-[#12115C] [unicode-bidi:isolate] 3xl:text-[20px] 4xl:text-[22px]"
                            >
                                {payment.amount}
                            </p>
                        </div>

                        <div className="mt-4 flex w-full min-w-0 flex-wrap items-center justify-between gap-3">
                            <span
                                className={`shrink-0 rounded-[6px] px-[10px] py-1 text-[10px] font-medium leading-[14px] 3xl:text-[11px] 4xl:text-[12px] ${
                                    payment.dueType === 'danger'
                                        ? 'bg-[#FFF1F1] text-[#FF3B30]'
                                        : 'bg-[#FFF7E6] text-[#FF9500]'
                                }`}
                            >
                                {getDueText(payment.dueDays)}
                            </span>

                            <Link
                                to={`/${locale}/projects/${payment.id}`}
                                className="flex shrink-0 items-center gap-2 text-[11px] font-semibold leading-[16px] text-[#2217C7] transition-opacity hover:opacity-70 3xl:text-[12px] 4xl:text-[13px]"
                            >
                                <span>{t('openProject')}</span>

                                <ArrowIcon className="h-4 w-4 shrink-0 rtl:rotate-180 4xl:h-[18px] 4xl:w-[18px]" />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default UpcomingPayments;
