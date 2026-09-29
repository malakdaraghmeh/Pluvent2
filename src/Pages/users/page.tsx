
import React, { useState } from "react";
import { Add, Arrow } from "@/assets";
import { useTranslation } from "react-i18next";
import UserMetricsGrid from "./components/UserMetricsGrid";
import UsersTable from "./components/UsersTable";
import { usersTableData } from "./data/usersTable";
import AddUserModal from "./components/AddUserModal";
import { usersMetricsData } from "./data/usersMetrics";

export default function UsersPage() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const { t } = useTranslation("usersPage");

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-[1086px] space-y-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] font-semibold text-[#12115C]">
              {t("titleUser")}
            </h1>

            <p className="text-[12px] text-[#7E8492]">
              {t("description")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddUserOpen(true)}
            className="
              inline-flex
              h-[44px]
              items-center
              justify-center
              gap-[8px]
              rounded-[16px]
              bg-[#12115C]
              px-[20px]
              text-[18px]
              text-white
              transition-all
              hover:opacity-90
              active:scale-95
            "
          >
            {/* Add Icon */}
            <span className="flex shrink-0 items-center justify-center leading-none">
              <Add />
            </span>

            {/* Label */}
            <span className="flex items-center leading-none">
              {t("addUser")}
            </span>

            {/* Arrow */}
            <span className="flex shrink-0 items-center justify-center leading-none rtl:rotate-180">
              <Arrow />
            </span>
          </button>
        </div>

        {/* Metrics Grid */}
        <UserMetricsGrid metrics={usersMetricsData} />

        {/* Users Table */}
        <UsersTable users={usersTableData} />

        {/* Modal */}
        <AddUserModal
          isOpen={isAddUserOpen}
          onClose={() => setIsAddUserOpen(false)}
        />
      </div>
    </main>
  );
}