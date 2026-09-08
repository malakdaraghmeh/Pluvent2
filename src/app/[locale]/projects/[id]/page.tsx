"use client";

import React, { useMemo, useState } from "react";
import ProjectDetails from "./components/ProjectDetails";
import { projectProgressData } from "../data/projectProgress";

type FilterType = "All" | "Completed" | "In Progress";

export default function Page() {
  const [activeTab, setActiveTab] = useState<FilterType>("All");

  const filteredProjects = useMemo(() => {
    if (activeTab === "All") {
      return projectProgressData;
    }

    return projectProgressData.filter(
      (project) => project.status === activeTab
    );
  }, [activeTab]);

  const tabs: {
    label: FilterType;
    count?: number;
  }[] = [
    {
      label: "All",
      count: projectProgressData.length,
    },
    {
      label: "Completed",
    },
    {
      label: "In Progress",
      count: projectProgressData.filter((p) => p.status === "In Progress").length,
    },
  ];

  return (
    <main
      className="
        min-h-screen
        w-full
        bg-[#F8F9FB]
        px-3
        py-5

        sm:px-5
        sm:py-6

        md:px-6

        lg:px-8
        lg:py-8
      "
    >
      {/* ========================= */}
      {/* Page Title */}
      {/* ========================= */}

      <div className="mb-5">
        <h1
          className="
            text-left
            font-[Sora]
            text-[20px]
            text-[#000000]

            sm:text-[22px]
            font-semibold
            lg:text-[24px]
          "
        >
          Projects
        </h1>

        <p
          className="
            mt-1
            text-left
            font-[Sora]
            text-[11px]
            text-[#7E8492]

            sm:text-[12px]
          "
        >
          Manage and track all your projects
        </p>
      </div>

      {/* ========================= */}
      {/* Projects Section */}
      {/* ========================= */}

      <div className="w-full">

        {/* Tabs & Content Wrapper */}
        
        <div className="relative w-full">
          
          {/* Tabs Navigation */}
          <div className="relative z-10 flex w-full items-end">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.label;

              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`
                    relative
                    flex
                    h-[40px]
                    w-full
                    items-center
                    justify-center
                    gap-1.5
                    px-3
                    font-[Sora]
                    text-[11px]
                    font-medium
                    transition-all

                    sm:h-[44px]
                    sm:text-[12px]

                    ${
                      isActive
                        ? `
                          z-20
                          border-t
                          border-x
                          border-[#39E1D7]
                          bg-white
                          rounded-t-[14px]
                          text-[#12115C]
                          text-[20px]
                        `
                        : `
                          bg-transparent
                          text-[#6B7280]
                          hover:text-[#12115C]
                        `
                    }
                  `}
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(189.2deg, rgba(57, 225, 215, 0.2) -36.41%, rgba(255, 255, 255, 1) 66.44%)",
                        }
                      : undefined
                  }
                >
                  {tab.label}

                  {tab.count !== undefined && (
                    <span
                      className={`
                        rounded-full
                        px-1.5
                        py-0.5
                        text-[8px]
                        font-semibold

                        ${
                          isActive
                            ? "bg-[#39E1D71A] text-[#2F1ABD]"
                            : "bg-[#F3F4F6] text-[#9297A3]"
                        }
                      `}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Card Container */}
          <div
            className={`
              relative
              z-0
              -mt-[1px]
              w-full
              border
              border-[#39E1D7]
              bg-white
              shadow-[0_2px_10px_rgba(0,0,0,0.02)]
              rounded-b-[18px]
              ${
                activeTab === "All"
                  ? "rounded-tr-[18px]"
                  : activeTab === "In Progress"
                  ? "rounded-tl-[18px]"
                  : "rounded-t-[18px]"
              }
            `}
          >
            {/* Projects List */}
            <div
              className="
                flex
                flex-col
                gap-3
                p-3

                sm:gap-4
                sm:p-4

                lg:p-5
              "
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectDetails
                    key={project.id}
                    project={project}
                  />
                ))
              ) : (
                <div
                  className="
                    flex
                    min-h-[180px]
                    items-center
                    justify-center
                    rounded-[14px]
                    border
                    border-dashed
                    border-[#E3E6EB]
                    bg-[#FAFBFC]
                  "
                >
                  <div className="text-center">
                    <p
                      className="
                        font-[Sora]
                        text-[13px]
                        font-semibold
                        text-[#303542]
                      "
                    >
                      No projects found
                    </p>

                    <p
                      className="
                        mt-1
                        font-[Sora]
                        text-[10px]
                        text-[#9297A3]
                      "
                    >
                      There are no projects in this category.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}