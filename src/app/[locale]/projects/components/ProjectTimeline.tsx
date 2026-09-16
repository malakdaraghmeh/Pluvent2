"use client";

import { useState } from "react";
import {
  projectTimelineData,
  type TimelineItem,
} from "../data/projectTimeline";

import {
  TimelineItem1,
  TimelineItem2,
  TimelineItem3,
  TimelineItem4,
  TimelineItem5,
  TimelineItem6,
} from "@/assets";

const timelineIcons = {
  1: TimelineItem1,
  2: TimelineItem2,
  3: TimelineItem3,
  4: TimelineItem4,
  5: TimelineItem5,
  6: TimelineItem6,
};

export default function ProjectTimeline() {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <div
      className="
        box-border
        flex
        w-full
        max-w-[1086px]
        flex-col
        gap-8
        rounded-[12px]
        bg-white
        p-6
        shadow-[0px_1px_3px_3px_#0000001A]
      "
    >
      {/* Title */}
      <h2
        className="
          text-left
          text-[22px]
          font-semibold
          text-[#12115C]
        "
      >
        Project Timeline
      </h2>

      {/* Timeline */}
      <div
        className="
          flex
          w-full
          items-start
          justify-between
          gap-2
        "
      >
        {projectTimelineData.map((item: TimelineItem) => {
          const isActive = activeId === item.id;

          const Icon =
            timelineIcons[item.id as keyof typeof timelineIcons];

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className="
                relative
                flex
                min-w-0
                flex-1
                flex-col
                items-center
                gap-3
                outline-none
              "
            >
              {/* Icon */}
              <div
                className={`
                  flex
                  w-[70px]
                  aspect-square
                  shrink-0
                  items-center
                  justify-center
                  rounded-[8px]
                  border
                  border-[#F2F2F2]
                  ${
                    isActive
                      ? "bg-[#3634C7]"
                      : "bg-gradient-to-br from-[#F1F1F1] via-white to-[#EEEBEB]"
                  }
                `}
                style={{
                  boxShadow:
                    "0px 0px 0px 10px #FFFFFF, 0px 4px 10px 0px #EAF7FF",
                }}
              >
                <span
                  className="block"
                  style={
                    isActive
                      ? {
                          filter: "brightness(0) invert(1)",
                        }
                      : {
                          filter:
                            "invert(42%) sepia(74%) saturate(1043%) hue-rotate(178deg) brightness(87%) contrast(91%)",
                        }
                  }
                >
                  <Icon />
                </span>
              </div>

              {/* Active Line */}
              {isActive && (
                <span
                  className="
                    h-[4px]
                    w-[70px]
                    shrink-0
                    rounded-[4px]
                    bg-[#3634C7]
                  "
                />
              )}

              {/* Text */}
              <span
                className={`
                  w-full
                  text-center
                  text-[14px]
                  font-semibold
                  leading-[150%]
                  ${
                    isActive
                      ? "text-[#3634C7]"
                      : "text-[#377DCE]"
                  }
                `}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}