'use client';

import { ChevronDown } from 'lucide-react';
import Bell from '@icons/bell.svg';
import Flag from '@icons/ar-flag.svg';
import Breadcrumb from '../ui/BreadCrumb';


export default function Tobar() {
  return (
    <header
      className="
        flex
        h-[76px]
        w-full
        items-center
        justify-between
        rounded-[100px]
        border
        border-[#E5E7EB]
        bg-white
        px-8
        py-4
      "
    >
      {/* Dynamic Breadcrumbs on the left */}
      <div className="flex items-center">
        <Breadcrumb />
      </div>

      {/* Action Buttons on the right */}
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell width={21} height={28} />
          <span className="absolute left-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          className="flex h-11 items-center gap-3 rounded-full border border-[#5C716F] px-5 text-sm font-semibold text-gray-700"
        >
          <ChevronDown size={18} />
          <span className="flex text-[18px] font-medium text-[#24453E]">AR</span>
          <Flag />
        </button>
      </div>
    </header>
  );
}