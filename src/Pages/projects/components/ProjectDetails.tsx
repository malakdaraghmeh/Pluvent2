


import type { ProjectDetails as ProjectDetailsType } from "../data/projectDetails";

import clockBg from "@/assets/images/clock-bg.png";
import cover from "@/assets/images/cover.png";

import { useTranslation } from 'react-i18next';
import { StartDate, Delivery } from "@/assets";

type ProjectDetailsProps = {
  project: ProjectDetailsType;

  // Optional values for Change Request Details page
  daysLeft?: number;
  lastUpdated?: string;
  progressPercent?: number;

  // Optional custom subtitle
  daysSubtitle?: string;

  // Optional custom progress bar color
  progressColor?: string;

  statusLabel?: string;
  statusBackgroundColor?: string;
  statusTextColor?: string;

  // Optional custom notice
  noticeTitle?: string;
  noticeMessage?: string;
};

export default function ProjectDetails({
  project,
  daysLeft,
  lastUpdated,
  progressPercent,
  daysSubtitle,
  noticeTitle,
  noticeMessage,
  progressColor = "#12115C",
  statusLabel,
  statusBackgroundColor,
  statusTextColor,
}: ProjectDetailsProps) {
  const { t } = useTranslation("projectDetails");

  // Use custom values if provided,
  // otherwise keep the original project values
  const displayedDaysLeft = daysLeft ?? project.daysLeft;

  const displayedLastUpdated =
    lastUpdated ?? project.lastUpdated;

  // Calculate filled progress bars (0 - 46)
  const filledBars =
    progressPercent === undefined
      ? 0
      : Math.round(
        (Math.min(100, Math.max(0, progressPercent)) / 100) *
        46
      );

  return (
    <div className="flex w-full flex-col items-stretch gap-6 lg:flex-row">
      {/* Project Information */}
      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          gap-6
          rounded-[24px]
          border-[0.5px]
          border-[#ECEFF4]
          bg-white
          p-6
          shadow-[0px_1px_3px_3px_#0000001A]
        "
      >
        {/* Top */}
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h1
              className="
                text-[28px]
                font-semibold
                text-[#3634C7]
              "
            >
              {t("projectName")}
            </h1>

            <p
              className="
                mt-1
                w-full
                text-[14px]
                leading-[22px]
                text-[#12115C]
              "
            >
              {project.description}
            </p>
          </div>

          {/* Status */}
          <span
            className="
                flex
                h-[26px]
                w-[101px]
                shrink-0
                items-center
                justify-center
                rounded-[6px]
                px-[10px]
                py-1
                text-[12px]
                font-medium
            "
            style={{
              backgroundColor:
                statusBackgroundColor ??
                (project.status === "In Progress"
                  ? "#007AFF0D"
                  : "#007AFF0D"),

              color: statusTextColor ?? "#007AFF",
            }}
          >
            {statusLabel ??
              t(
                project.status === "In Progress"
                  ? "status.inProgress"
                  : "status.completed"
              )}
          </span>
        </div>

        {/* Dates */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Start Date */}
          <div
            className="
              flex
              min-w-0
              flex-1
              items-center
              gap-2
              rounded-[16px]
              border
              border-[#00E5C810]
              px-2
              py-2
            "
            style={{
              background:
                "linear-gradient(146deg, #F1F1F1 0%, #FFFFFF 30.72%, #EEEBEB 100%)",
            }}
          >
            <span className="shrink-0 text-[#3634C7]">
              <StartDate />
            </span>

            <p
              className="
                min-w-0
                truncate
                text-[16px]
                text-[#3634C7]
              "
            >
              <span className="text-[16px] text-[#12115C]">
                {t("startDate")}:
              </span>{" "}
              {project.startDate}
            </p>
          </div>

          {/* Delivery */}
          <div
            className="
              flex
              min-w-0
              flex-1
              items-center
              gap-2
              rounded-[16px]
              border
              border-[#00E5C810]
              px-2
              py-2
            "
            style={{
              background:
                "linear-gradient(146deg, #F1F1F1 0%, #FFFFFF 30.72%, #EEEBEB 100%)",
            }}
          >
            <span className="shrink-0 text-[#3634C7]">
              <Delivery />
            </span>

            <p
              className="
                min-w-0
                truncate
                text-[16px]
                text-[#3634C7]
              "
            >
              <span className="text-[16px] text-[#12115C]">
                {t("delivery")}:
              </span>{" "}
              {project.deliveryDate}
            </p>
          </div>
        </div>
      </div>

      {/* Days Left / Warranty Period */}
      <div
        className="
          relative
          flex
          w-full
          flex-col
          items-center
          gap-6
          overflow-hidden
          rounded-[24px]
          border-[0.5px]
          border-[#39E1D7]
          bg-[#12115C]
          p-6
          shadow-[0px_1px_3px_3px_#0000001A]
          lg:w-[362px]
          lg:shrink-0
        "
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Clock Background */}
        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-center
            bg-no-repeat
          "
          style={{
            backgroundImage: `url(${clockBg})`,
          }}
        />

        {/* Content */}
        <div
          className="
            relative
            z-10
            flex
            h-full
            w-full
            flex-col
            items-center
          "
        >
          {/* Days */}
          <div className="mt-2 flex flex-col items-center">
            <p
              className="
                text-[40px]
                font-semibold
                text-[#39E1D7]
              "
            >
              {displayedDaysLeft}
            </p>

            <p
              className="
                text-center
                text-[16px]
                font-bold
                text-white
              "
            >
              {displayedDaysLeft > 0
                ? t("daysLeft")
                : t("completed")}
            </p>

            <p
              className="
                mt-1
                text-center
                text-[16px]
                text-[#39E1D7]
              "
            >
              {daysSubtitle ??
                (displayedDaysLeft > 0
                  ? t("toDeliver")
                  : t("projectDelivered"))}
            </p>
          </div>

          {/* Progress Bars */}
          <div className="mt-auto flex w-full items-center gap-[2px]">
            {Array.from({ length: 46 }).map((_, index) => (
              <span
                key={index}
                className="h-[7px] flex-1 rounded-[1px]"
                style={{
                  backgroundColor:
                    index < filledBars
                      ? progressColor
                      : "rgba(255, 255, 255, 0.8)",
                }}
              />
            ))}
          </div>

          {/* Bottom Section */}
          {noticeTitle && noticeMessage ? (
            /* After Warranty Ends Notice */
            <div
              className="
                mt-6
                flex
                w-full
                flex-col
                items-center
                overflow-hidden
                rounded-[16px]
                border
                border-[#39E1D7]
                bg-[#39E1D71A]
              "
            >
              {/* Notice Title */}
              <div
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-t-[16px]
                  bg-[#39E1D7]
                  px-4
                  py-1
                "
              >
                <p
                  className="
                    text-center
                    text-[16px]
                    font-semibold
                    text-[#12115C]
                  "
                >
                  {noticeTitle}
                </p>
              </div>

              {/* Notice Message */}
              <div
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  px-4
                  py-2
                "
              >
                <p
                  className="
                    text-center
                    text-[14px]
                    leading-[20px]
                    text-white
                  "
                >
                  {noticeMessage}
                </p>
              </div>
            </div>
          ) : (
            /* Original Last Updated */
            <div
              className="
                mt-6
                flex
                w-full
                flex-col
                items-center
                overflow-hidden
                rounded-[16px]
                border
                border-[#39E1D7]
                bg-[#39E1D71A]
              "
            >
              <div
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-t-[16px]
                  bg-[#39E1D7]
                  px-4
                  py-1
                "
              >
                <p
                  className="
                    text-[12px]
                    font-semibold
                    text-[#12115C]
                  "
                >
                  {t("lastUpdated")}
                </p>
              </div>

              <div
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  px-4
                  py-2
                "
              >
                <p
                  className="
                    text-[16px]
                    font-bold
                    text-white
                  "
                >
                  {displayedLastUpdated}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}