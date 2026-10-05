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
    const { t } = useTranslation('supportTickets');

    return (
        <section className="flex h-full w-full min-w-0 flex-col gap-4 rounded-[24px] bg-white p-5 shadow-[0px_10px_30px_0px_#0000000D] sm:p-6 xl:h-[444px]">
            <div className="flex min-h-[28px] items-center justify-between gap-4">
                <h2 className="text-[22px] font-semibold leading-[28px] text-[#12115C]">
                    {t('changeRequestPayments.title')}
                </h2>

                <VerifiedBadge />
            </div>

            <div className="flex w-full flex-col gap-4">
                {changeRequestPaymentsData.map(payment => (
                    <div
                        key={payment.id}
                        className="flex h-[52px] w-full items-center justify-between gap-4 rounded-[16px] border-[0.5px] border-[#B1B4B6] bg-white px-6"
                    >
                        <p className="min-w-0 break-words text-[13px] text-[#9CA3AF]">
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