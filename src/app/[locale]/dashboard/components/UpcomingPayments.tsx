"use client";

import { upcomingPayments } from "../data/upcomingPayments";
import { Icon } from "@/assets";
import { useTranslations,useLocale } from "next-intl";

const UpcomingPayments = () => {
    const locale = useLocale();
  const t = useTranslations("upcomingPayments");

  return (
    <section
      className="
        w-full
        rounded-[24px]
        bg-white
        p-4

        sm:p-5
        lg:h-[351px]
        lg:p-6
      "
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          className="
            min-w-0
            text-[22px]
            font-semibold
            text-[#12115C]
          "
        >
          {t("title")}
        </h2>

        <button
          type="button"
          className="
            text-[16px]
            text-[#3634C7]
          "
        >
          {t("viewAll")}
        </button>
      </div>

      {/* Payments */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {upcomingPayments.map((payment) => (
          <div
            key={payment.id}
            className="
              w-full
              rounded-[16px]
              border
              border-[#E5E7EB]
              p-4

              sm:p-5
              lg:h-[122px]
              lg:p-6
            "
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-3">
              {/* Project Info */}
              <div className="min-w-0 flex-1">
                <h3
                  className="
                    truncate
                   
                    text-[16px]
                    font-semibold
                    text-[#12115C]
                  "
                  title={payment.projectName}
                >
                  {payment.projectName}
                </h3>

                <p
                  className="
                    mt-1
                   
                    text-[13px]
                    text-[#9CA3AF]
                  "
                >
                  {t("finalPayment")}
                </p>
              </div>

              {/* Amount */}
              <span
                className="
                  shrink-0
                  whitespace-nowrap
                  text-[22px]
                  font-semibold
                  text-[#12115C]
                "
              >
                {payment.amount}
              </span>
            </div>

            {/* Bottom */}
            <div
              className="
                mt-3
                flex
                items-center
                justify-between
                gap-3
              "
            >
              {/* Due Status */}
              <span
                className={`
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  rounded-[6px]
                  px-[10px]
                  py-[4px]
                  text-[11px]
                  font-semibold
                  leading-none
                  ${
                    payment.dueType === "danger"
                      ? "bg-[#FF3B300D] text-[#FF3B30]"
                      : "bg-[#FFF7E8] text-[#F59E0B]"
                  }
                `}
              >
                {t("dueIn", { days: payment.dueDays })}
              </span>

              {/* Open Project */}
              <button
                type="button"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-1.5
                  whitespace-nowrap
                  text-[12px]
                  font-semibold
                  text-[#2F1ABD]
                "
              >
                <span>{t("openProject")}</span>
                <span className={locale === "ar" ? "rotate-180" : ""}>
                <Icon />
                  </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingPayments;