import PageHeader from '@/components/ui/PageHeader';
﻿import { useTranslation } from 'react-i18next';
import BillingSummary from './components/BillingSummary';
import PaymentHistoryTable from './components/PaymentHistoryTable';
import UpcomingPaymentsTable from './components/UpcomingPaymentsTable';

const BillingPage = () => {
    const { t } = useTranslation('billingPage');

    return (
        <main className="custom-container w-full py-5">
            <div className="flex w-full flex-col gap-4">
                <PageHeader
                    title={t('title')}
                    description={t('description')}
                    titleClassName="!text-[28px] !leading-[34px]"
                    descriptionClassName="!text-[14px] !leading-[22px] !text-[#64748B] sm:!text-[16px] sm:!leading-[24px]"
                />

                <BillingSummary />
                <UpcomingPaymentsTable />
                <PaymentHistoryTable />
            </div>
        </main>
    );
};

export default BillingPage;
