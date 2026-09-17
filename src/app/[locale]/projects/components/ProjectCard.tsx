"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowIcon } from "@/assets";
import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
    const locale = useLocale();
    const t = useTranslations("projectsPage");
  return (
    <div
    className="
      flex
      w-full
      flex-col
      gap-5
      rounded-[24px]
      border
      bg-white
      p-6
      shadow-[0px_4px_20px_0px_#0000000D]
      lg:h-[213px]
      lg:flex-row
      lg:items-center
    "
    style={{
      borderColor:
        project.warranty === "On Hold" ||
        project.warranty === "Suspended"
          ? "#FF3B3033"
          : project.warranty === "Valid"
            ? "#34C75933"
            : "#00E5C810",
    }}
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
              #39E1D7 ${project.progress}%,
              #EEF0F4 ${project.progress}%
            )`,
          }}
        />

        {/* Inner Circle */}
        <div
          className="
            absolute
            inset-[8px]
            rounded-full
            bg-white

            sm:inset-[9px]
          "
        />

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
            {project.progress}%
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
        "
      >
        {/* Title + Status */}
        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          {/* Title */}
          <h3
            className="
              min-w-0
              flex-1
              truncate
              text-[20px]
              font-bold
             text-start
              text-[#0F172A]
            "
            title={project.title}
          >
            {project.title}
          </h3>

          {/* Status */}
          <span
            className={`
              shrink-0
              rounded-md
              px-2.5
              py-1.5
              text-[12px]
              
              sm:px-3

              ${
                project.status === "Completed"
                  ? "bg-[#2ECC710D] text-[#2ECC71]"
                  : "bg-[#007AFF0D] text-[#007AFF]"
              }
            `}
          >
              {project.status === "Completed"
    ? t("status.completed")
    : t("status.inProgress")}
          </span>
        </div>

        {/* Description */}
        <p
          className="
            mt-2
            line-clamp-2
            w-full
            
            text-[14px]
            tracking-[0%]
            text-[#7E8492]
            text-start
            sm:mt-3
          "
        >
          {project.description}
        </p>

        {/* Date + Payment */}
        <div
          className="
            mt-3
            flex
            min-h-[40px]
            w-full
            items-center
            justify-between
            rounded-[8px]
            border-[0.5px]
            border-[#B1B4B6]/50
            bg-[#E2E8F0]/10
            p-2

            sm:mt-4
          "
        >
          {/* Date */}
          <span
            className="
              min-w-0
              truncate
              text-[14px]
              font-normal
              text-[#64748B]
            "
          >
            {project.dateLabel} {project.dueDate}
          </span>

          {/* Payment */}
          <span
            className="
              shrink-0
              whitespace-nowrap
              text-[14px]

              text-[#0F172A]
            "
          >
            {project.paidAmount} / {project.totalAmount}
          </span>
        </div>

        {/* Warranty + Open Project */}
        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            gap-3
            sm:mt-4
          "
        >
          {/* Warranty */}
          <p
  className="
    min-w-0
    text-start
    text-[14px]
    text-[#475569]
  "
>
  {project.statusLabel === "Project Status"
    ? t("statusLabel.projectStatus")
    : t("statusLabel.warranty")}
  :{" "}

  <span
    className={
      project.warranty === "On Hold" ||
      project.warranty === "Suspended"
        ? "text-[#FF3B30]"
        : "text-[#10B981]"
    }
  >
    {project.warranty === "Active"
      ? t("warranty.active")
      : project.warranty === "Valid"
        ? t("warranty.valid")
        : project.warranty === "On Hold"
          ? t("warranty.onHold")
          : t("warranty.suspended")}
  </span>
</p>

          {/* Open / View Project */}
          <Link
href={`/${locale}/projects/${project.id}`}
  className={`
    inline-flex
    shrink-0
    items-center
    justify-center
    gap-1.5
    text-[16px]
    font-semibold
    ${
      project.action === "Pay Now"
        ? "text-[#FF3B30]"
        : "text-[#3634C7]"
    }
  `}
>
<span>
  {project.action === "Open Project"
    ? t("action.openProject")
    : project.action === "Pay Now"
      ? t("action.payNow")
      : t("action.viewProject")}
</span>

<span className={locale === "ar" ? "rotate-180" : ""}>
      <ArrowIcon />
    </span>
</Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;