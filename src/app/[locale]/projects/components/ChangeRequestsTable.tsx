"use client";

import Link from "next/link";
import { changeRequestsData } from "../data/changeRequests";
import {Arrow , Add } from "@/assets";

const ChangeRequestsTable = () => {
  return (
    <div
      className="
        flex
        
        w-full
        max-w-[1086px]
        flex-col
        gap-6
        rounded-[8px]
        bg-white
        p-6
      "
    >
      {/* Title */}
     {/* Header */}
<div className="flex w-full items-center justify-between">
    
  {/* Title */}
  <h2
    className="
      text-left
      text-[22px]
      font-semibold
      text-[#12115C]
    "
  >
    Change Requests
  </h2>

  {/* Add Change Request */}
  
  <button
  type="button"
  className="
    flex
    h-[44px]
    w-[283px]
    items-center
    justify-between
    rounded-[16px]
    bg-[#12115C]
    px-5
    py-4
    text-[14px]
    font-medium
    text-white
  "
>
  <span className="flex shrink-0 items-center">
    <Add />
  </span>

  <span className="flex items-center whitespace-nowrap">
    Add Change Request
  </span>

  <span className="flex shrink-0 items-center">
    <Arrow />
  </span>
</button>
</div>

      {/* Table */}
      <div
        className="
         
          w-full
          overflow-hidden
          rounded-[8px]
          border
          border-[#00E5C810]
          bg-white
        "
      >
        {/* Header */}
<div
  className="
    grid
    h-16
    grid-cols-[70px_183px_130px_130px_110px_110px_70px]
    items-center
    gap-4
    rounded-t-[16px]
    bg-white
    px-4
    font-semibold
  "
>
  <p className="justify-self-start text-left text-[14px] text-[#12115C]">
    ID
  </p>

  <p className="justify-self-start text-left text-[14px] text-[#12115C]">
    Title
  </p>

  <p className="justify-self-start text-left text-[14px] text-[#12115C]">
    Add By
  </p>

  <p className="justify-self-start text-left text-[14px] text-[#12115C]">
    Status
  </p>

  <p className="justify-self-start text-left text-[14px] text-[#12115C]">
    Start Date
  </p>

  <p className="justify-self-start text-left text-[14px] text-[#12115C]">
    Due Date
  </p>

  <p className="justify-self-start text-left text-[14px] text-[#12115C]">
    Details
  </p>
</div>

        {/* Rows */}
        {changeRequestsData.map((request, index) => (
        <div
            key={`${request.id}-${index}`}
            className={`
            grid
            h-16
            grid-cols-[70px_183px_130px_130px_110px_110px_70px]
            items-center
            gap-4
            border
            px-4
            
            ${
                index % 2 === 0
                ? "border-[#00E5C810] bg-[#00E5C805]"
                : "border-[#2F1ABD10] bg-white"
            }
            `}
        >
            {/* ID */}
        <p
          className="
            justify-self-start
            text-left
            text-[14px]
            font-semibold
            text-[#12125C]
          "
        >
          {request.id}
        </p>
        
        {/* Title */}
        <p
          className="
            min-w-0
            justify-self-start
            truncate
            text-left
            text-[14px]
            font-semibold
            text-[#1F2937]
          "
        >
          {request.title}
        </p>
        
        {/* Add By */}
        <p
          className="
            min-w-0
            justify-self-start
            truncate
            text-left
            text-[14px]
            font-semibold
            text-[#12125C]
          "
        >
          {request.addBy}
        </p>
        
        {/* Status */}
        <p
          className={`
            min-w-0
            justify-self-start
            truncate
            text-left
            text-[14px]
            ${getStatusColor(request.status)}
          `}
        >
          {request.status}
        </p>
        
        {/* Start Date */}
        <p
          className="
            justify-self-start
            text-left
            text-[14px]
            text-[#596173]
          "
        >
          {request.startDate}
        </p>
        
        {/* Due Date */}
        <p
          className="
            justify-self-start
            text-left
            text-[14px]
            text-[#5F6573]
          "
        >
          {request.dueDate}
        </p>
        
        {/* Details */}
        <Link
          href="#"
          className="
            justify-self-start
            text-left
            text-[16px]
            font-semibold
            text-[#3634C7]
            transition-opacity
            hover:opacity-70
          "
        >
          Details
        </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "InReview":
      return "text-[#12115C]";

    case "Waiting User Input":
      return "text-[#F38020]";

    case "Pending Payment":
      return "text-[#EF4444]";

    case "Inprogress":
      return "text-[#3634C7]";

    case "Completed":
      return "text-[#34C759]";

    default:
      return "text-[#303542]";
  }
};

export default ChangeRequestsTable;