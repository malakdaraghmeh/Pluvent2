'use client';

import { ChevronDown } from 'lucide-react';
import Bell from '@icons/bell.svg';
import Flag from '@icons/ar-flag.svg';

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
        px-6
        py-4
      "
        >
            <div className="flex items-center gap-4">
                <span
                    className="
    font-roboto
    text-[14px]
    font-medium
    leading-[56px]
    text-[#868B89]
  "
                >
                    Portal
                </span>
            </div>

            <div className="flex items-center gap-5">
                <button
                    type="button"
                    className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            transition-colors
            hover:bg-gray-100
          "
                    aria-label="Notifications"
                >
                    <Bell width={21} height={28} />
                    <span
                        className="
              absolute
              left-1
              top-1
              h-2
              w-2
              rounded-full
              bg-red-500
            "
                    />
                </button>

                {/* Language */}
                <button
                    type="button"
                    className="
            flex
            h-11
            items-center
            gap-3
            rounded-full
            border
            border-[#5C716F]
            px-5
            text-sm
            font-semibold
            text-gray-700
          "
                >
                    <ChevronDown size={18} />

                    <span
                        className="
    font-cairo
    flex
    h-[14px]
    w-[25px]
    items-center
    justify-center
    text-[20px]
    font-normal
    leading-[100%]
    text-[#24453E]
  "
                    >
                        AR
                    </span>

                    <span>
                        <Flag />
                    </span>
                </button>
            </div>
        </header>
    );
}
