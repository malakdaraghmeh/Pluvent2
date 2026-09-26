"use client";

import React, { useState } from "react";
import UserMetricsGrid from "./components/UserMetricsGrid";
import { usersMetricsData } from "./data/usersMetrics";
import { Add, Arrow } from "@/assets"; 
import UsersTable from "./components/UsersTable";
import { usersTableData } from "./data/usersTable";
import AddUserModal from "./components/AddUserModal"; 

export default function UsersPage() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-[1086px] space-y-6">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] sm:text-[24px] font-semibold text-[#12115C]">
              User Management
            </h1>
            <p className="text-[12px] text-[#7E8492]">
              Support is available for completed projects within their active warranty period.
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
  {/* Left Icon: Add */}
  <span className="flex items-center justify-center shrink-0 leading-none">
    <Add />
  </span>

  {/* Label */}
  <span className="flex items-center leading-none ">
    Add User
  </span>

  {/* Right Icon: Arrow */}
  <span className="flex items-center justify-center shrink-0 leading-none rtl:rotate-180">
    <Arrow />
  </span>
</button>
        </div>

        {/* Metrics Grid Section */}
        <UserMetricsGrid metrics={usersMetricsData} />
        <UsersTable users={usersTableData} />

        {/* Modal Window */}
        <AddUserModal
          isOpen={isAddUserOpen}
          onClose={() => setIsAddUserOpen(false)}
        />
      </div>
    </main>
  );
}