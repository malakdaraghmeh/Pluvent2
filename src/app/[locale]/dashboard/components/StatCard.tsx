


import { DashboardStat } from "@/Pages/dashboard/data/dashboardStats";
import {
  folderIcon,
  paidIcon,
  upcomingIcon,
  absentIcon,
} from "@/assets";


import { useTranslation } from "react-i18next";

type StatCardProps = DashboardStat;

const iconMap = {
  projects: folderIcon,
  paid: paidIcon,
  upcoming: upcomingIcon,
  absent: absentIcon,
};

const cardStyleMap = {
  projects: {
    border:
      "border-[#3634C7] border-t-[0.5px] border-r-[0.5px] border-b-[0.5px] border-l-[1.5px]",
    iconBg: "bg-[#F4F3FF]",
    iconColor: "text-[#6262F6]",
    iconBorder: "border-[#3634C7]",
    descriptionColor: "text-[#64748B]",
  },

  paid: {
    border:
      "border-[#39E1D7] border-t-[0.5px] border-r-[0.5px] border-b-[0.5px] border-l-[1.5px]",
    iconBg: "bg-[#E9FBFB]",
    iconColor: "text-[#27BDBD]",
    iconBorder: "border-[#39E1D7]",
    descriptionColor: "text-gray-400",
  },

  upcoming: {
    border:
      "border-[#FF9500] border-t-[0.5px] border-r-[0.5px] border-b-[0.5px] border-l-[1.5px]",
    iconBg: "bg-[#FFF6E8]",
    iconColor: "text-[#F5A623]",
    iconBorder: "border-[#FF9500]",
    descriptionColor: "text-[#64748B]",
  },

  absent: {
    border:
      "border-[#FF3B30] border-t-[0.5px] border-r-[0.5px] border-b-[0.5px] border-l-[1.5px]",
    iconBg: "bg-[#FFF0F0]",
    iconColor: "text-[#FF5B5B]",
    iconBorder: "border-[#FF3B30]",
    descriptionColor: "text-[#64748B]",
  },
};

const StatCard = ({ value, icon }: StatCardProps) => {
  const { t } = useTranslation("dashboardStats");

  const Icon = iconMap[icon];
  const styles = cardStyleMap[icon];

  const hasDescriptionHighlight = icon === "upcoming";

  return (
    <div
      className={`
        h-[112px]
        w-full
        min-w-0
        rounded-2xl
        border
        bg-white
        px-4
        py-2.5
        transition
        duration-300
        hover:shadow-md
        ${styles.border}
      `}
    >
      {/* Top */}
      <div
        className="
          flex
          items-start
          justify-between
         
        "
      >
        {/* Title */}
        <p className="min-w-0 truncate font-semibold text-[16px] leading-[20px] text-[#000000]">
          {t(`${icon}.title`)}
        </p>

        {/* Icon */}
        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-[4px]
            border
            ${styles.iconBg}
            ${styles.iconBorder}
          `}
        >
          <Icon className={styles.iconColor} />
        </div>
      </div>

      {/* Value */}
      <h2
        className="
      
          text-[26px]
          font-semibold
         
          text-[#000000]
        "
      >
        {value}
      </h2>

      {/* Description */}
      <p className="min-w-0 truncate ">
        {hasDescriptionHighlight ? (
          <>
            <span className="text-[11px] text-[#3634C7]">
              {t(`${icon}.descriptionHighlight`)}{" "}
            </span>

            <span
              className={`text-[10px] ${styles.descriptionColor}`}
            >
              {t(`${icon}.description`)}
            </span>
          </>
        ) : (
          <span
            className={`text-[13px] ${styles.descriptionColor}`}
          >
            {t(`${icon}.description`)}
          </span>
        )}
      </p>
    </div>
  );
};

export default StatCard;