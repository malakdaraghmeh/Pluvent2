"use client";

import React, { useMemo, useState } from "react";

import { UserTableItem } from "../data/usersTable";
import { DropDown, MoreVertical } from "@/assets";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface UsersTableProps {
  users: UserTableItem[];
}

export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const t = useTranslations("usersPage");

  // Get unique roles from users data
  const roles = useMemo(
    () => Array.from(new Set(users.map((user) => user.role))),
    [users]
  );

  // Filter users by selected role
  const filteredUsers = useMemo(() => {
    if (!selectedRole) return users;

    return users.filter((user) => user.role === selectedRole);
  }, [users, selectedRole]);

  return (
    <div
      className="
        flex
        w-full
        flex-col
        gap-4
        rounded-[8px]
        bg-white
        p-4
        sm:gap-5
        sm:p-5
        md:gap-6
        md:p-6
      "
    >
      {/* Header */}
      <div
        className="
          flex
          w-full
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* Title */}
        <h2 className=" text-[22px] font-semibold text-[#12115C]">
          {t("title")}
        </h2>

        {/* Search & Filter */}
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          {/* Search Input */}
          <div className="relative flex w-full items-center sm:w-[280px]">
            <Search   className="
            pointer-events-none
            absolute
            left-4
            h-4
            w-4
            text-[#9CA3AF]
            rtl:left-auto
            rtl:right-4
  " />

            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="
                h-[38px]
                w-full
                rounded-[12px]
                border
                border-[#ECEFF4]
                bg-white
                pl-[40px]
                pr-[16px]
                py-[10px]
                text-[14px]
                text-[#9CA3AF]
                 rtl:pl-[16px]
      rtl:pr-[40px]
              "
            />
          </div>

          {/* Role Filter Button */}
          <div className="relative w-full sm:w-[89px]">
            <button
              type="button"
              aria-expanded={isRoleOpen}
              onClick={() => setIsRoleOpen((prev) => !prev)}
              className="
                flex
                h-[38px]
                w-full
                items-center
                justify-between
                gap-[8px]
                rounded-[12px]
                border
                border-[#ECEFF4]
                bg-white
                px-[16px]
                py-[10px]
                text-[14px]
                font-semibold
                text-[#12115C]
                transition-colors
              "
            >
              <span className="truncate">
                {selectedRole
                  ? t(`roles.${selectedRole}`)
                  : t("role")}
              </span>

              <span
                className={`shrink-0 transition-transform ${
                  isRoleOpen ? "rotate-180" : ""
                }`}
              >
                <DropDown />
              </span>
            </button>

            {/* Dropdown Menu */}
            {isRoleOpen && (
              <>
                {/* Click outside to close */}
                <button
                  type="button"
                  aria-label="Close dropdown"
                  className="fixed inset-0 z-10 cursor-default"
                  onClick={() => setIsRoleOpen(false)}
                />

                <div
                  className="
                    absolute
                    right-0
                    top-[calc(100%+6px)]
                    z-20
                    max-h-[220px]
                    min-w-[140px]
                    overflow-y-auto
                    rounded-[12px]
                    border
                    border-[#ECEFF4]
                    bg-white
                    py-1
                    shadow-lg
                  "
                >
                  {/* All Roles */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole(null);
                      setIsRoleOpen(false);
                    }}
                    className="
                      w-full
                      px-4
                      py-2.5
                      
                      text-[14px]
                      text-[#12115C]
                      transition-colors
                      hover:bg-[#F8F9FB]
                    "
                  >
                    {t("allRoles")}
                  </button>

                  {/* Dynamic Roles */}
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setSelectedRole(role);
                        setIsRoleOpen(false);
                      }}
                      className={`
                        w-full
                        px-4
                        py-2.5
                       
                        text-[14px]
                        transition-colors
                        hover:bg-[#F8F9FB]
                        ${
                          selectedRole === role
                            ? "bg-[#F8F9FB] font-semibold text-[#12115C]"
                            : "text-[#64748B]"
                        }
                      `}
                    >
                      {t(`roles.${role}`)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="w-full overflow-x-auto">
        {/* Table Container */}
        <div
          className="
            min-w-[800px]
            overflow-hidden
            rounded-[8px]
            border
            border-[#ECEFF4]
            bg-white
          "
        >
          {/* Table Header */}
          <div
            className="
              grid
              h-16
              grid-cols-[1.2fr_1.8fr_1fr_1.3fr_60px]
              items-center
              gap-4
              rounded-t-[16px]
              bg-white
              px-4
              md:px-6
            "
          >
            {[
              t("table.user"),
              t("table.mail"),
              t("table.role"),
              t("table.accountStatus"),
              t("table.action"),
            ].map((heading) => (
              <p
                key={heading}
                className={`
                  text-[14px]
                  font-semibold
                  text-[#12115C
                  ]
                  ${
                    heading === t("table.action")
                    ? "text-center"
                    : "text-left rtl:text-right"
                  }
                `}
              >
                {heading}
              </p>
            ))}
          </div>

          {/* Table Rows */}
          {filteredUsers.map((user, index) => (
            <div
              key={user.id}
              className={`
                grid
                h-16
                grid-cols-[1.2fr_1.8fr_1fr_1.3fr_60px]
                items-center
                gap-4
                border-b
                border-[#00E5C810]
                px-4
                py-5
                ${
                  index % 2 === 0
                    ? "bg-[#00E5C805]"
                    : "bg-white"
                }
                transition-colors
              `}
            >
              {/* User Name */}
              <p
                className="
                  min-w-0
                  truncate
                 
                  text-[14px]
                  font-semibold
                  text-[#1F2937]
                "
                title={user.name}
              >
                {user.name}
              </p>

              {/* Email */}
              <p
                className="
                  min-w-0
                  truncate
           
                  text-[14px]
                 
                  text-[#1F2937]
                "
                title={user.email}
              >
                {user.email}
              </p>

              {/* Role */}
              <p
                className="
                  min-w-0
                  truncate
                
                  text-[14px]
                
                  text-[#2F1ABD]
                "
                title={user.role}
              >
                {t(`roles.${user.role}`)}
              </p>

              {/* Account Status */}
              <div className="justify-self-start">
                <span
                  className={`
                    inline-flex 
                    items-center 
                    justify-center 
                    whitespace-nowrap 
                    rounded-full 
                    px-3 
                    py-1 
                    text-[12px] 
                    font-semibold 
                    ${
                      user.status === "Active"
                        ? "bg-[#34C7591A] text-[#34C759]"
                        : "bg-[#FF3B301A] text-[#FF3B30]"
                    }
                  `}
                >
                  {t(`statuses.${user.status}`)}
                </span>
              </div>

              {/* Action */}
              <button
                type="button"
                aria-label={`Actions for ${user.name}`}
                className="
                  inline-flex 
                  h-8 
                  w-8 
                  items-center 
                  justify-center 
                  justify-self-center 
                  rounded-lg 
                  text-[#64748B] 
                  transition-colors 
                  hover:bg-[#ECEFF4] 
                  hover:text-[#12115C] 
                "
              >
                <MoreVertical />
              </button>
            </div>
          ))}

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div
              className="
                flex 
                min-h-[100px] 
                items-center 
                justify-center 
                border-t 
                border-[#00E5C810] 
                px-4 
                text-[14px] 
                font-medium 
                text-[#64748B] 
              "
            >
              {t("noUsersFound")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersTable;