"use client";

import { supportTickets } from "../data/supportTickets";
import { useTranslations } from "next-intl";

const SupportTickets = () => {
  const t = useTranslations("supportTickets");

  return (
    <section className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[20px] font-semibold text-[#12115C]">
          {t("title")}
        </h2>

        <button
          type="button"
          className="text-[16px] text-[#3634C7]"
        >
          {t("viewAll")}
        </button>
      </div>

      {/* Tickets */}
      <div className="space-y-3">
        {supportTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="
              flex
              w-full
              items-center
              justify-between
              gap-[12px]
              rounded-[12px]
              bg-[#F8FAFC]
              p-[12px]
            "
          >
            {/* Ticket Number */}
            <span
              className="
                shrink-0
                text-[11px]
                font-semibold
                text-[#94A3B8]
              "
            >
              {ticket.ticketNumber}
            </span>

            {/* Ticket Title */}
            <p
              className="
                min-w-0
                flex-1
                truncate
                text-center
                text-[13px]
                font-semibold
                text-[#12115C]
              "
              title={ticket.title}
            >
              {ticket.title}
            </p>

            {/* Status Badge */}
            <span
              className={`
                inline-flex
                h-[23px]
                w-[89px]
                shrink-0
                items-center
                justify-center
                rounded-[6px]
                px-[10px]
                py-[4px]
                text-[11px]
                font-medium
                leading-none
                sm:text-[12px]
                ${
                  ticket.status === "In Progress"
                    ? "bg-[#007AFF0D] text-[#007AFF]"
                    : "bg-[#FFF7E8] text-[#F59E0B]"
                }
              `}
            >
              {ticket.status === "In Progress"
  ? t("inProgress")
  : ticket.status === "In Review"
    ? t("inReview")
    : ticket.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportTickets;