
"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

import { upcomingPaymentsList } from "../data/upcomingPayments";
import { Arrow, SearchBilling } from "@/assets";

export default function UpcomingPaymentsTable() {
  const t = useTranslations("upcomingPayments");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");

  const filteredData = upcomingPaymentsList.filter((item) => {
    const matchesSearch =
      item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.installment.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedProject === "All Projects" ||
      item.project === selectedProject;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full max-w-[1086px] min-h-[366px] bg-white rounded-[16px] p-[24px] flex flex-col gap-[24px] shadow-sm">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-[22px] font-semibold text-[#12115C]">
          {t("title")}
        </h2>

        <div className="flex w-full sm:w-auto items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-[280px] sm:max-w-[280px]">
          <SearchBilling
            className="absolute left-3 top-1/2 -translate-y-1/2 shrink-0 text-[#9CA3AF]"
            />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full
                h-[38px]
                pl-[36px]
                pr-[16px]
                bg-white
                border
                border-[#ECEFF4]
                rounded-[12px]
                text-[14px]
                text-[#111827]
                placeholder:text-[#9CA3AF]
                focus:outline-none
              "
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-[139px] shrink-0">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="
                appearance-none
                w-full
                h-[38px]
                bg-white
                border
                border-[#ECEFF4]
                text-[#12115C]
                text-[14px]
                py-[8px]
                pl-[16px]
                pr-[36px]
                rounded-[12px]
                cursor-pointer
                focus:outline-none
              "
            >
              <option value="All Projects">
                {t("allProjects")}
              </option>

              <option value="Company Website Redesign">
                Company Website Redesign
              </option>
            </select>

            <ChevronDown
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                w-4
                h-4
                text-[#12115C]
                pointer-events-none
              "
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full max-w-[1038px] rounded-[8px] border border-[#00E5C820] overflow-x-auto bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr
              className="
                h-[48px]
                bg-white
                border-b
                border-[#00E5C820]
                text-[14px]
                font-semibold
                text-[#12115C]
              "
            >
              <th className="py-3 px-6">{t("project")}</th>
              <th className="py-3 px-4">{t("installment")}</th>
              <th className="py-3 px-4">{t("amount")}</th>
              <th className="py-3 px-4">{t("dueDate")}</th>
              <th className="py-3 px-4 whitespace-nowrap">
                {t("daysLeftLabel")}
              </th>
              <th className="py-3 px-6 whitespace-nowrap">
                {t("pay")}
              </th>
            </tr>
          </thead>

          <tbody className="text-[14px]">
            {filteredData.map((row, index) => (
              <tr
                key={row.id}
                className={`
                  transition-colors
                  border-b
                  border-[#00E5C815]
                  last:border-none
                  ${index % 2 === 0 ? "bg-[#00E5C805]" : "bg-white"}
                `}
              >
                <td className="py-4 px-6 font-semibold text-[#1F2937]">
                  {row.project}
                </td>

                <td className="py-4 px-4 text-[#8C94A3]">
                  {row.installment}
                </td>

                <td className="py-4 px-4 font-bold text-[#12115C]">
                  {row.amount}
                </td>

                <td className="py-4 px-4 text-[#8C94A3]">
                  {row.dueDate}
                </td>

                <td className="py-4 px-4 font-semibold">
                  <span
                    className={
                      row.daysLeft <= 3
                        ? "text-[#FF3B30]"
                        : "text-[#1AB24D]"
                    }
                  >
                    {t("dueIn", { days: row.daysLeft })}
                  </span>
                </td>

                <td className="py-4 px-6 text-right whitespace-nowrap">
                  <button
                    type="button"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      h-[40px]
                      px-5
                      bg-[#0F0C41]
                      hover:bg-[#1A165C]
                      text-white
                      font-medium
                      text-[14px]
                      rounded-full
                      transition-all
                      duration-200
                    "
                  >
                    <span className="shrink-0">
                      {t("payNow")}
                    </span>

                    <span className="shrink-0 flex items-center rtl:rotate-180">
                      <Arrow />
                    </span>
                  </button>
                </td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-[#8C94A3]"
                >
                  {t("noResults")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}