


import { useTranslation } from 'react-i18next';

import { changeRequestPaymentsData } from "../data/changeRequestPayments";
import VerifiedBadge from "./VerifiedBadge";

const ChangeRequestPayments = () => {
  const { t } = useTranslation("supportTickets.changeRequestPayments");

  const paymentTitleKeys: Record<number, string> = {
    1: "firstPayment",
    2: "secondPayment",
    3: "thirdPayment",
    4: "crPayment",
    5: "finalPayment",
  };

  return (
    <section
      className="
        flex
        w-full
        max-w-[380px]
        shrink-0
        flex-col
        gap-6
        rounded-[24px]
        bg-white
        px-6
        py-6
        shadow-[0px_10px_30px_0px_#0000000D]
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2
          className="
            text-[22px]
            font-semibold
            text-[#12115C]
          "
        >
          {t("title")}
        </h2>

        <VerifiedBadge />
      </div>

      {/* Payments List */}
      <div className="flex w-full flex-col gap-3">
        {changeRequestPaymentsData.map((payment) => (
          <div
            key={payment.id}
            className="
              flex
              w-full
              items-center
              justify-between
              rounded-[16px]
              border-[0.5px]
              border-[#B1B4B6]
              bg-white
              px-6
              py-4
            "
          >
            {/* Payment Name */}
            <p
              className="
                text-[13px]
                text-[#9CA3AF]
              "
            >
              {t(paymentTitleKeys[payment.id])}
            </p>

            {/* Payment Amount */}
            <p
              className="
                text-[16px]
                font-semibold
                text-[#6B7280]
              "
            >
              {payment.amount}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChangeRequestPayments;