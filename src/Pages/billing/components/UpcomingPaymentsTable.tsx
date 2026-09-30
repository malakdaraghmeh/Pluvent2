"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

import { upcomingPaymentsList } from "../data/upcomingPayments";
import { Arrow, SearchBilling } from "@/assets";
import { useTranslation } from "react-i18next";
import CreditDebitCardModal from "./CreditDebitCardModal";

export default function UpcomingPaymentsTable() {
  const { t } = useTranslation("upcomingPayments");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

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
    <>
      <div className="flex min-h-[366px] w-full max-w-[1086px] flex-col gap-[24px] rounded-[16px] bg-white p-[24px] shadow-sm">
        {/* Header & Filter Controls */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-[22px] font-semibold text-[#12115C]">
            {t("title")}
          </h2>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-[280px] sm:max-w-[280px]">
              <SearchBilling
                className="
                  absolute
                  left-3
                  top-1/2
                  shrink-0
                  -translate-y-1/2
                  text-[#9CA3AF]
                "
              />

              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  h-[38px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#ECEFF4]
                  bg-white
                  pl-[36px]
                  pr-[16px]
                  text-[14px]
                  text-[#111827]
                  placeholder:text-[#9CA3AF]
                  focus:outline-none
                "
              />
            </div>

            {/* Filter */}
            <div className="relative w-[139px] shrink-0">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="
                  h-[38px]
                  w-full
                  cursor-pointer
                  appearance-none
                  rounded-[12px]
                  border
                  border-[#ECEFF4]
                  bg-white
                  py-[8px]
                  pl-[16px]
                  pr-[36px]
                  text-[14px]
                  text-[#12115C]
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
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-[#12115C]
                "
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full max-w-[1038px] overflow-x-auto rounded-[8px] border border-[#00E5C820] bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr
                className="
                  h-[48px]
                  border-b
                  border-[#00E5C820]
                  bg-white
                  text-[14px]
                  font-semibold
                  text-[#12115C]
                "
              >
                <th className="px-6 py-3">
                  {t("project")}
                </th>

                <th className="px-4 py-3">
                  {t("installment")}
                </th>

                <th className="px-4 py-3">
                  {t("amount")}
                </th>

                <th className="px-4 py-3">
                  {t("dueDate")}
                </th>

                <th className="whitespace-nowrap px-4 py-3">
                  {t("daysLeftLabel")}
                </th>

                <th className="whitespace-nowrap px-6 py-3">
                  {t("pay")}
                </th>
              </tr>
            </thead>

            <tbody className="text-[14px]">
              {filteredData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`
                    border-b
                    border-[#00E5C815]
                    transition-colors
                    last:border-none
                    ${index % 2 === 0 ? "bg-[#00E5C805]" : "bg-white"}
                  `}
                >
                  {/* Project */}
                  <td className="px-6 py-4 font-semibold text-[#1F2937]">
                    {row.project}
                  </td>

                  {/* Installment */}
                  <td className="px-4 py-4 text-[#8C94A3]">
                    {row.installment}
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-4 font-bold text-[#12115C]">
                    {row.amount}
                  </td>

                  {/* Due Date */}
                  <td className="px-4 py-4 text-[#8C94A3]">
                    {row.dueDate}
                  </td>

                  {/* Days Left */}
                  <td className="px-4 py-4 font-semibold">
                    <span
                      className={
                        row.daysLeft <= 3
                          ? "text-[#FF3B30]"
                          : "text-[#1AB24D]"
                      }
                    >
                      {t("dueIn", {
                        days: row.daysLeft,
                      })}
                    </span>
                  </td>

                  {/* Pay */}
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setIsPaymentModalOpen(true)}
                      className="
                        inline-flex
                        h-[40px]
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        bg-[#0F0C41]
                        px-5
                        text-[14px]
                        font-medium
                        text-white
                        transition-all
                        duration-200
                        hover:bg-[#1A165C]
                      "
                    >
                      <span className="shrink-0">
                        {t("payNow")}
                      </span>

                      <span className="flex shrink-0 items-center rtl:rotate-180">
                        <Arrow />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}

              {/* No Results */}
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

      {/* Payment Modal */}
      <CreditDebitCardModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </>
  );
}