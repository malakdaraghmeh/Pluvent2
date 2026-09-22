"use client";

import { useTranslations } from "next-intl";

import {
  Billing1,
  Billing2,
  Billing3,
  Billing4,
} from "@/assets";

import { billingSummaryData } from "../data/billing";

const billingIcons = [
  Billing1,
  Billing2,
  Billing3,
  Billing4,
];

const iconBgMap = [
  "bg-[#EFF6FF]",
  "bg-[#ECFDF5]",
  "bg-[#FFF7ED]",
  "bg-[#FEF2F2]",
];

const billingTitleKeys: Record<number, string> = {
  1: "totalOutstanding",
  2: "paidThisYear",
  3: "upcomingPayments",
  4: "overduePayments",
};

const BillingSummary = () => {
  const t = useTranslations("billingPage.summary");

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {billingSummaryData.map((item, index) => {
        const Icon = billingIcons[index];

        return (
          <div
            key={item.id}
            className="
              flex
              items-center
              gap-3
              rounded-[20px]
              border
              border-[#ECEFF4]
              bg-white
              px-4
              py-5
            "
          >
            <div
              className={`
                flex
                size-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                p-3
                ${iconBgMap[index]}
              `}
            >
              <Icon className="size-6" />
            </div>

            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-[#64748B]">
                {t(`${billingTitleKeys[item.id]}.title`)}
              </p>

              <p className="text-[20px] font-semibold text-[#0F172A]">
                {item.value}
              </p>

              <p className="text-[11px] leading-[10px] text-[#94A3B8]">
                {t(`${billingTitleKeys[item.id]}.description`)}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default BillingSummary;