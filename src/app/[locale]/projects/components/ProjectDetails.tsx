"use client";

import type { ProjectDetails as ProjectDetailsType } from "../data/projectDetails";
import clockBg from "@/assets/images/clock-bg.png";
import cover from "@/assets/images/cover.png";
import { useTranslations } from "next-intl";

import { StartDate, Delivery } from "@/assets";

type ProjectDetailsProps = {
  project: ProjectDetailsType;
};

export default function ProjectDetails({
  project,
}: ProjectDetailsProps) {
  const t = useTranslations("projectDetails");

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
              shrink-0
              rounded-[6px]
              bg-[#007AFF0D]
              px-2
              py-1
              text-[12px]
              text-[#007AFF]
            "
          >
            {t(
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

      {/* Days Left */}
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
          backgroundImage: `url(${cover.src})`,
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
            backgroundImage: `url(${clockBg.src})`,
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
          <div className="flex flex-col items-center">
            <p
              className="
                text-[28px]
                font-semibold
                text-[#39E1D7]
              "
            >
              {project.daysLeft}
            </p>

            <p
              className="
                text-[16px]
                font-bold
                text-white
              "
            >
              {project.daysLeft > 0
                ? t("daysLeft")
                : t("completed")}
            </p>

            <p
              className="
                mt-1
                text-[16px]
                text-[#39E1D7]
              "
            >
              {project.daysLeft > 0
                ? t("toDeliver")
                : t("projectDelivered")}
            </p>
          </div>

          {/* Progress */}
          <div className="mt-auto flex w-full items-center gap-[2px]">
            {Array.from({ length: 46 }).map((_, index) => (
              <span
                key={index}
                className="
                  h-[7px]
                  flex-1
                  rounded-[1px]
                  bg-white
                "
              />
            ))}
          </div>

          {/* Last Updated */}
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
                {project.lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}