import React from "react";
import Link from "next/link";
import { ProjectProgress } from "../../data/projectProgress";
import { ArrowIcon } from "@/assets";

type ProjectDetailsProps = {
  project: ProjectProgress;
};

export default function ProjectDetails({
  project,
}: ProjectDetailsProps) {
  const isCompleted = project.status === "Completed";
  const isOnHold = project.status === "On Hold";

  const cardBorder = isCompleted
    ? "border-[#D8F1E5]"
    : isOnHold
      ? "border-[#FFE0DC]"
      : "border-[#D7F0EF]";

  const statusStyles = isCompleted
    ? "bg-[#EAFBF1] text-[#20A96B]"
    : isOnHold
      ? "bg-[#FFF3F1] text-[#FF5B4D]"
      : "bg-[#EEF8FF] text-[#007AFF]";

  const warrantyColor =
    project.warranty === "Suspended"
      ? "text-[#FF5B4D]"
      : project.warranty === "Valid"
        ? "text-[#20A96B]"
        : "text-[#20A96B]";

  return (
    <div
    className={`
    w-full
    rounded-[14px]
 
    bg-white
    p-3
    shadow-[0px_4px_20px_0px_#0000000D]
    transition-all

    sm:p-4

    ${cardBorder}
  `}
>
      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-center
        "
      >
        {/* ========================= */}
        {/* Progress Circle */}
        {/* ========================= */}

        <div
          className="
            flex
            shrink-0
            justify-center

            sm:justify-start
          "
        >
          <div
            className="
              relative
              flex
              h-[66px]
              w-[66px]
              items-center
              justify-center
              rounded-full

              sm:h-[72px]
              sm:w-[72px]
            "
            style={{
              background: `conic-gradient(
                from 180deg,
                #3634C7 0%,
                #39E1D7 ${project.progress}%,
                #EEF0F4 ${project.progress}% 100%
              )`,
            }}
          >
            {/* Inner Circle */}
            <div
              className="
                absolute
                inset-[7px]
                rounded-full
                bg-white
              "
            />

            {/* Percentage */}
            <div className="relative text-center">
              <p
                className="
                  font-[Sora]
                  text-[16px]
                  font-bold
                  leading-none
                  text-[#202533]
                "
              >
                {project.progress}%
              </p>

              <p
                className="
                  mt-0.5
                  font-[Sora]
                  text-[6px]
                  font-medium
                  leading-[1.1]
                  text-[#64748B]
                "
              >
                Overall
                <br />
                Project
              </p>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* Main Project Content */}
        {/* ========================= */}

        <div className="min-w-0 flex-1">
          {/* Top */}
          <div
            className="
              flex
              flex-col
              gap-2

              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            {/* Project title + description */}
            <div className="min-w-0 flex-1">
              <h2
                className="
                text-left
                  truncate
                  font-[Sora]
                  text-[20px]
                  font-bold
                  text-[#0F172A]

                  sm:text-[14px]
                "
                title={project.title}
              >
                {project.title}
              </h2>

              <p
                className="
                text-left
                  mt-1
                  line-clamp-1
                  font-[Sora]
                  text-[14px]
                  font-normal
                 
                  text-[#7E8492]

                  sm:text-[9px]
                "
              >
                {project.description}
              </p>
            </div>

            {/* Status */}
            <span
              className={`
                w-fit
                shrink-0
                rounded-[4px]
                px-2
                py-1
                font-[Sora]
                text-[12px]
                text-[#007AFF]

                sm:text-[8px]

                ${statusStyles}
              `}
            >
              {project.status}
            </span>
          </div>

         
        {/* ========================= */}
{/* Information Box */}
{/* ========================= */}

<div
  className="
    mt-3
    flex
    h-10
    w-full
    items-center
    justify-between
    rounded-[8px]
    border
    bg-[#E2E8F01A]
    border-[#B1B4B680]
    px-2
    py-2

    sm:px-3
  "
>
 {/* Due Date */}
<div className="flex items-center gap-2">
  <p
    className="
      font-[Sora]
      text-[14px]
      text-[#6B7280]
    "
  >
    {project.dateLabel}
  </p>

  <p
    className="
      font-[Sora]
      text-[14px]
      text-[#0F172A]
    "
  >
    {project.dueDate}
  </p>
</div>

  {/* Payment */}
  <div className="flex items-center gap-2">
 

  <p className="font-[Sora] text-[14px] font-medium text-[#0F172A]">
    {project.paidAmount} / {project.totalAmount}
  </p>
</div>
</div>

{/* ========================= */}
{/* Bottom Status + Action */}
{/* ========================= */}

<div
  className="
    mt-3
    flex
    items-center
    justify-between
  "
>
  {/* Project Status */}
  <p
    className="
      font-[Sora]
      text-[14px]
      text-[#475569]
    "
  >
    Project Status:{" "}
    <span className="text-[#10B981] text-[14px]">
      {project.warranty === "Valid" ? "Active" : project.warranty}
    </span>
  </p>

  {/* Action */}
  {isOnHold ? (
    <button
      type="button"
      className="
        inline-flex
        items-center
        gap-1
        font-[Sora]
        text-[9px]
        font-semibold
        text-[#FF5B4D]
        transition
        hover:opacity-70
      "
    >
      <span>Pay Now</span>

      <ArrowIcon className="h-3 w-3" />
    </button>
  ) : (
    <Link
      href={`/projects/${project.id}`}
      className="
        inline-flex
        items-center
        gap-1
        font-[Sora]
        text-[16px]
        font-semibold
        text-[#2F1ABD]
        transition
        hover:opacity-70
      "
    >
      <span>
        {isCompleted ? "View Project" : "Open Project"}
      </span>

      <ArrowIcon className="h-3 w-3" />
    </Link>
  )}
</div>

        </div>
      </div>
    </div>
  );
}
