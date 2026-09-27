
"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

import {
  paymentHistoryList,
  type PaymentHistoryItem,
} from "../data/paymentHistory";

import { SearchBilling, DownloadBilling, Visa, Paypal, Apple, Instapay } from "@/assets";

const PaymentMethodBadge = ({ item }: { item: PaymentHistoryItem }) => {
    switch (item.methodType) {
      case "visa":
        return (
          <div className="flex items-center gap-2 text-[#12115C] font-medium text-[13px]">
            <Visa className=" h-auto shrink-0" />
            <span>{item.methodText}</span>
          </div>
        );
  
      case "paypal":
        return (
          <div className="flex items-center gap-1.5 text-[#0088FF] font-medium text-[13px]">
            <Paypal className=" h-auto shrink-0" />
            <span>{item.methodText}</span>
          </div>
        );
  
      case "applepay":
        return (
          <div className="flex items-center gap-1.5 text-[#111827] font-medium text-[13px]">
            <Apple className=" h-auto shrink-0" />
            <span>{item.methodText}</span>
          </div>
        );
  
      case "instapay":
        return (
          <div className="flex items-center gap-2 font-medium text-[13px]">
            <Instapay className=" h-auto shrink-0" />
            <span className="text-[#4B5563]">{item.methodText}</span>
          </div>
        );
  
      default:
        return (
          <span className="text-[#4B5563] text-[13px]">
            {item.methodText}
          </span>
        );
    }
  };

export default function PaymentHistoryTable() {
  const t = useTranslations("paymentHistory");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");

  const filteredData = paymentHistoryList.filter((item) => {
    const matchesSearch =
      item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.invoice.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedProject === "All Projects" ||
      item.project === selectedProject;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full max-w-[1086px] bg-white rounded-[16px] p-[24px] flex flex-col gap-[24px] shadow-sm">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-[22px] font-semibold text-[#12115C]">
          {t("title")}
        </h2>

        <div className="flex w-full sm:w-auto items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-[280px] sm:max-w-[280px]">
            <SearchBilling className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />

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
                font-semibold
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

      {/* Payment History Table */}
      <div className="w-full rounded-[8px] border border-[#00E5C820] bg-white overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="h-[48px] bg-white border-b border-[#00E5C820] font-bold text-[#12115C]">
              <th className="py-3 px-6 w-[22%] text-[13px]">
                {t("invoice")}
              </th>

              <th className="py-3 px-4 w-[28%] text-[14px]">
                {t("project")}
              </th>

              <th className="py-3 px-4 w-[20%] text-[14px]">
                {t("amount")}
              </th>

              <th className="py-3 px-4 w-[16%] text-[14px]">
                {t("method")}
              </th>

              <th className="py-3 px-4 w-[14%] text-[14px]">
                {t("date")}
              </th>

              <th className="py-3 px-6 w-[8%] text-center" />
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
                <td className="py-4 px-6 font-semibold text-[#12115C] truncate">
                  {row.invoice}
                </td>

                <td className="py-4 px-4 font-semibold text-[#1F2937] truncate">
                  {row.project}
                </td>

                <td className="py-4 px-4 font-bold text-[#12115C]">
                  {row.amount}
                </td>

                <td className="py-4 px-4">
                  <PaymentMethodBadge item={row} />
                </td>

                <td className="py-4 px-4 text-[#4B5563]">
                  {row.date}
                </td>

                <td className="py-4 px-6 text-center">
                  <button
                    type="button"
                    title={t("downloadInvoice")}
                    aria-label={t("downloadInvoice")}
                    className="p-1.5 text-[#12115C] hover:text-[#00E5C8] transition-colors rounded-lg"
                  >
                    <DownloadBilling />
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