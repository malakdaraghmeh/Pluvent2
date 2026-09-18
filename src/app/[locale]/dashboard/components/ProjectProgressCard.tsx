"use client";

import type { ProjectProgress } from "../data/projectProgress";
import { ArrowIcon } from "@/assets";
import { useTranslations, useLocale } from "next-intl";

type ProjectProgressCardProps = ProjectProgress;

const ProjectProgressCard = ({
  title,
  status,
  progress,
  description,
  dueDate,
  paidAmount,
  totalAmount,
  warranty,
}: ProjectProgressCardProps) => {
  const locale = useLocale();
  const t = useTranslations("projectsPage");

  return (
    <div
      className="
        flex
        w-full
        flex-col
        gap-4
        rounded-[24px]
        border
        border-[#EEF0F4]
        bg-white
        p-4
        shadow-sm

        sm:p-5

        lg:h-[231px]
        lg:flex-row
        lg:items-center
        lg:gap-5
        lg:p-6
      "
    >
      {/* Progress Circle */}
      <div
        className="
          relative
          flex
          h-20
          w-20
          shrink-0
          items-center
          justify-center
          self-center

          sm:h-24
          sm:w-24

          lg:self-auto
        "
      >
        {/* Gradient Circle */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(
              from 180deg,
              #3634C7 0%,
              #39E1D7 ${progress}%,
              #EEF0F4 ${progress}%
            )`,
          }}
        />

        {/* Inner Circle */}
        <div className="absolute inset-[8px] rounded-full bg-white sm:inset-[9px]" />

        {/* Percentage */}
        <div className="relative text-center">
          <p
            className="
              text-[22px]
              font-bold
              text-[#1E293B]

              sm:text-[26px]
            "
          >
            {progress}%
          </p>

          <p
            className="
              text-[9px]
              font-semibold
              leading-tight
              text-[#64748B]

              sm:text-[10px]
            "
          >
            {t("overallProject.overall")}
            <br />
            {t("overallProject.project")}
          </p>
        </div>
      </div>

      {/* Project Content */}
      <div
        className="
          flex
          w-full
          min-w-0
          flex-1
          flex-col
          justify-center

          lg:h-[183px]
          lg:max-w-[400px]
        "
      >
        {/* Title + Status */}
        <div
          className="
            flex
            min-w-0
            items-start
            justify-between
            gap-2

            sm:gap-3
          "
        >
          {/* Title */}
          <h3
            className="
              min-w-0
              flex-1
              break-words
              text-[20px]
              font-bold
              text-[#0F172A]
            "
            title={title}
          >
            {title}
          </h3>

          {/* Status */}
          <span
            className="
              shrink-0
              whitespace-nowrap
              rounded-md
              bg-[#007AFF0D]
              px-2.5
              py-1.5

              text-[12px]
              font-normal
              text-[#007AFF]

              sm:px-3
            "
          >
            {status === "In Progress"
              ? t("status.inProgress")
              : status === "Completed"
                ? t("status.completed")
                : status}
          </span>
        </div>

        {/* Description */}
        <p
          className="
            mt-2
            line-clamp-2
            w-full
            break-words
            text-[14px]
            leading-[150%]
            tracking-[0%]
            text-[#7E8492]

            sm:mt-3

            lg:max-w-[400px]
          "
        >
          {description}
        </p>

        {/* Date + Payment */}
        <div
          className="
            mt-3
            flex
            min-h-[40px]
            w-full
            min-w-0
            items-center
            justify-between
            gap-2
            rounded-[8px]
            border-[0.5px]
            border-[#B1B4B6]/50
            bg-[#E2E8F0]/10
            p-2

            sm:mt-4

            lg:w-[400px]
          "
        >
          {/* Due Date */}
          <span
            className="
              min-w-0
              truncate
              text-[14px]
              font-normal
              text-[#64748B]
            "
          >
            {`Due ${dueDate}`}
          </span>

          {/* Payment */}
          <span
            className="
              shrink-0
              whitespace-nowrap
              text-[14px]
              font-normal
              text-[#1E293B]
            "
          >
            {paidAmount} / {totalAmount}
          </span>
        </div>

        {/* Warranty + Open Project */}
        <div
          className="
            mt-3
            flex
            min-w-0
            items-center
            justify-between
            gap-2

            sm:mt-4
            sm:gap-3
          "
        >
          {/* Warranty */}
          <p
            className="
              min-w-0
              truncate
              text-[14px]
              text-[#475569]
            "
          >
            {t("statusLabel.warranty")}:{" "}
            <span className="text-[#10B981]">
              {warranty}
            </span>
          </p>

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
              text-[16px]
              font-semibold
              text-[#2F1ABD]
            "
          >
            <span>{t("action.openProject")}</span>

            <span className={locale === "ar" ? "rotate-180" : ""}>
              <ArrowIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgressCard;