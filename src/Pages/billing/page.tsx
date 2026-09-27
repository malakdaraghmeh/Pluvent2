import BillingSummary from "./components/BillingSummary";
import UpcomingPaymentsTable from "./components/UpcomingPaymentsTable";
import PaymentHistoryTable from "./components/PaymentHistoryTable";
import { useTranslation } from "react-i18next";

const BillingPage = () => {
  const { t } = useTranslation("billingPage");

  return (
    <main className="min-h-screen p-4 sm:p-5 lg:p-6">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-[28px] font-semibold text-[#12115C]">
            {t("title")}
          </h1>

          <p className="text-[16px] text-[#64748B]">
            {t("description")}
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