import { useTranslation } from 'react-i18next';
import BillingSummary from './components/BillingSummary';
import PaymentHistoryTable from './components/PaymentHistoryTable';
import UpcomingPaymentsTable from './components/UpcomingPaymentsTable';

const BillingPage = () => {
    const { t, i18n } = useTranslation('billingPage');
    const isArabic = i18n.language.startsWith('ar');

    return (
        <main className="custom-container w-full py-5">
            <div className="flex w-full flex-col gap-4">
                <div className="flex w-full min-w-0 flex-col gap-1">
                    <h1
                        className={`w-full min-w-0 text-[28px] font-semibold leading-[34px] text-[#12115C] ${
                            isArabic ? 'text-right' : 'text-left'
                        }`}
                    >
                        {t('title')}
                    </h1>

                    <p
                        className={`w-full min-w-0 whitespace-normal break-words text-[14px] leading-[22px] text-[#64748B] sm:text-[16px] sm:leading-[24px] ${
                            isArabic ? 'text-right' : 'text-left'
                        }`}
                    >
                        {t('description')}
                    </p>
                </div>

                <BillingSummary />
                <UpcomingPaymentsTable />
                <PaymentHistoryTable />
            </div>
        </main>
    );
};

export default BillingPage;
