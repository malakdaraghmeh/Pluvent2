"use client";

import { MetricItem } from "@/Pages/users/data/usersMetrics";
import React from "react";

import { useTranslation } from "react-i18next";

interface UserMetricsGridProps {
  metrics: MetricItem[];
}

const cardStyleMap: Record<
  string,
  {
    badgeBg: string;
  }
> = {
  outstanding: {
    badgeBg: "bg-[#00E5C810]",
  },
  active: {
    badgeBg: "bg-[#34C75933]",
  },
  pending: {
    badgeBg: "bg-[#00E5C810]",
  },
  rejected: {
    badgeBg: "bg-[#E9544033]",
  },
};

export const UserMetricsGrid: React.FC<UserMetricsGridProps> = ({
  metrics,
}) => {
  const { t } = useTranslation("usersPage");


  return (
    <div className="grid w-full grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((item) => {
        const Icon = item.icon;
        const styles = cardStyleMap[item.id];

        return (
          <div
            key={item.id}
            className="flex w-full min-w-0 items-center gap-[12px] rounded-[20px] border border-[#ECEFF4] bg-white px-[16px] py-[20px] shadow-sm transition-all hover:shadow-md"
          >
            {/* Icon Wrapper (48x48px, Rounded 24px) */}
            <div
              className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[24px] ${
                styles?.badgeBg || "bg-gray-50"
              }`}
            >
              <Icon />
            </div>

            {/* Metric Content */}
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <span className="truncate text-[14px] font-medium leading-[20px] text-[#64748B] lg:text-[15px]">
                {t(`metrics.${item.id}`)}
              </span>

              <span className="mt-[4px] text-[24px] font-semibold leading-[28px] text-[#0F172A]">
                {item.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserMetricsGrid;