"use client";

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
  True
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
          const isActive = item.id === 1;

          const Icon =
            timelineIcons[item.id as keyof typeof timelineIcons];

          return (
            <div
              key={item.id}
              className="
                relative
                flex
                min-w-0
                flex-1
                flex-col
                items-center
              "
            >
              {/* Icon */}
              <div
                className={`
                  relative
                  flex
                  aspect-square
                  w-[70px]
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
                {/* Check */}
              
                {isActive && (
                <span
                    className="
                    absolute
                    -right-[9px]
                    -top-[9px]
                    box-border
                    flex
                    h-[24px]
                    w-[24px]
                    items-center
                    justify-center
                    rounded-[40px]
                    border
                    border-[#3634C7]
                    bg-[#39E1D7]
                    p-[4px]
                    text-[13px]
                    font-bold
                    leading-none
                    text-white
                    "
                >
                   <True/>
                </span>
                )}
                {/* Icon */}
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
              <div
                className={`
                  relative
                  z-10
                  mt-2
                  h-[4px]
                  w-[70px]
                  shrink-0
                  rounded-[4px]
                  ${
                    isActive
                      ? "bg-[#3634C7]"
                      : "bg-transparent"
                  }
                `}
              />

              {/* Text */}
              <span
                className={`
                  mt-3
                  flex
                  min-h-[42px]
                  w-full
                  items-start
                  justify-center
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
            </div>
          );
        })}
      </div>
    </div>
  );
}