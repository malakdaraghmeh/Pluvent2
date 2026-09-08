import type { DashboardStat } from "../data/dashboardStats";

import {
  folderIcon,
  paidIcon,
  upcomingIcon,
  absentIcon,
} from "@/assets";

type StatCardProps = DashboardStat;

const iconMap = {
  projects: folderIcon,
  paid: paidIcon,
  upcoming: upcomingIcon,
  absent: absentIcon,
};

const StatCard = ({
  title,
  value,
  description,
  icon,
  borderColor,
  iconBg,
  iconColor,
  iconBorderColor,
  descriptionColor,
  descriptionHighlight,
descriptionHighlightColor,
}: StatCardProps) => {
  const Icon = iconMap[icon];

  return (
    <div
      className={`
        min-h-[140px]
        rounded-2xl
        border
        bg-white
        p-4
        transition
        duration-300
        hover:shadow-md
        ${borderColor}
      `}
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <p className="text-[16px] font-semibold text-[#000000]">
          {title}
        </p>

        {/* Icon */}
        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-[4px]
            border
            ${iconBg}
            ${iconBorderColor}
          `}
        >
          <Icon className={iconColor} />
        </div>
      </div>

      {/* Value */}
      <h2 className="mt-3 text-left text-[26px] font-semibold text-[#000000]">
        {value}
      </h2>

      {/* Description */}
      <p
  className={`
    mt-2
    text-left
    text-[13px]
    ${descriptionColor}
  `}
>
  {descriptionHighlight && (
    <span className={descriptionHighlightColor}>
      {descriptionHighlight}{" "}
    </span>
  )}

  {description}
</p>
    </div>
  );
};

export default StatCard;