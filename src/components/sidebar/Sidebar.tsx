'use client';

import { useState } from 'react';

import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';

import SidebarItem from './SidebarItem';

import { mainNavigation, accountNavigation } from './sidebar.data';

import Logo from '@icons/logo.svg';
import Plogo from '@icons/p-logo.svg';

interface SidebarProps {
    onCollapseChange?: (collapsed: boolean) => void;
}

export default function Sidebar({ onCollapseChange }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggle = () => {
        const newState = !collapsed;

        setCollapsed(newState);
        onCollapseChange?.(newState);
    };

    return (
        <aside
            className={`
        fixed
        left-0
        top-0
        z-40
        h-screen
        p-4
        transition-all
        duration-300
        ease-in-out
        ${collapsed ? 'w-[104px]' : 'w-[280px]'}
      `}
        >
            <div
                className={`
          relative
          flex
          h-full
          min-h-0
          flex-col
          rounded-[28px]
          bg-[#17145F]
          px-4
          py-5
          text-white
          transition-all
          duration-300
          ${collapsed ? 'items-center px-3' : ''}
        `}
            >
                {/* ========================================
            COLLAPSE BUTTON
        ======================================== */}

                <button
                    type="button"
                    onClick={handleToggle}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    className="
            absolute
            -right-[12px]
            top-[58px]
            z-50
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            border
            border-[#E5E7EB]
            bg-white
            text-[#17145F]
            shadow-md
            transition-all
            duration-200
            hover:scale-105
            hover:shadow-lg
          "
                >
                    {collapsed ? (
                        <ChevronRight size={18} strokeWidth={2.5} />
                    ) : (
                        <ChevronLeft size={18} strokeWidth={2.5} />
                    )}
                </button>

                {/* ========================================
            LOGO
        ======================================== */}

                <div
                    className={`
            mb-8
            mt-1
            shrink-0
            transition-all
            duration-300
            ${collapsed ? 'px-0' : 'px-3'}
          `}
                >
                    {!collapsed ? (
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <Logo />
                            </div>

                            <span
                                className="
                  mt-2
                  self-start
                  text-xs
                  text-white/70
                "
                            >
                                Portal
                            </span>
                        </div>
                    ) : (
                        <Plogo />
                    )}
                </div>

                {/* ========================================
            SCROLLABLE NAVIGATION
        ======================================== */}

                <div
                    className="
            min-h-0
            w-full
            flex-1
            overflow-x-hidden
            overflow-y-auto
            pr-1
            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-white/20
          "
                >
                    {/* ========================================
              MAIN NAVIGATION
          ======================================== */}

                    <nav
                        className={`
              w-full
              space-y-2
              ${collapsed ? 'flex flex-col items-center' : ''}
            `}
                    >
                        {mainNavigation.map(item => (
                            <SidebarItem key={item.label} {...item} collapsed={collapsed} />
                        ))}
                    </nav>

                    {/* ========================================
              FIRST GRADIENT DIVIDER
          ======================================== */}

                    <div
                        className={`
              my-7
              h-0
              transition-all
              duration-300
              ${collapsed ? 'mx-auto w-10' : 'w-full'}
            `}
                        style={{
                            borderTop: '1.55px solid',
                            borderImage:
                                'linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #39E1D7 49.58%, rgba(255, 255, 255, 0) 100%) 1',
                        }}
                    />

                    {/* ========================================
              ACCOUNT
          ======================================== */}

                    <div className="w-full">
                        {!collapsed && (
                            <p
                                className="
                  mb-3
                  w-full
                  px-4
                  text-left
                  text-xs
                  font-medium
                  text-white/50
                "
                                dir="ltr"
                            >
                                Account
                            </p>
                        )}

                        {collapsed && (
                            <div className="mb-3 flex justify-center">
                                <span
                                    className="
                    h-1
                    w-1
                    rounded-full
                    bg-white/40
                  "
                                />
                            </div>
                        )}

                        {/* Account navigation */}

                        <nav
                            className={`
                space-y-2
                ${collapsed ? 'flex flex-col items-center' : ''}
              `}
                        >
                            {accountNavigation.map(item => (
                                <SidebarItem key={item.label} {...item} collapsed={collapsed} />
                            ))}
                        </nav>
                    </div>
                </div>

                {/* ========================================
            BOTTOM SECTION
        ======================================== */}

                <div className="mt-4 w-full shrink-0">
                    {/* ========================================
              THEME
          ======================================== */}

                    <div
                        className={`
              mb-6
              flex
              items-center
              transition-all
              duration-300
              ${collapsed ? 'justify-center' : 'justify-center gap-3'}
            `}
                    >
                        <Sun size={15} className="text-yellow-300" />

                        {!collapsed && (
                            <>
                                <button
                                    type="button"
                                    className="
                    relative
                    h-6
                    w-11
                    rounded-full
                    bg-[#3934C8]
                  "
                                    aria-label="Toggle theme"
                                >
                                    <span
                                        className="
                      absolute
                      left-1
                      top-1
                      h-4
                      w-4
                      rounded-full
                      bg-white
                      shadow
                    "
                                    />
                                </button>

                                <Moon size={15} className="text-[#29D6D5]" />
                            </>
                        )}
                    </div>

                    {/* ========================================
              SECOND GRADIENT DIVIDER
          ======================================== */}

                    <div
                        className="
              mb-5
              h-0
              w-full
            "
                        style={{
                            borderTop: '1.55px solid',
                            borderImage:
                                'linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 49.58%, rgba(255, 255, 255, 0) 100%) 1',
                        }}
                    />

                    {/* ========================================
              USER
          ======================================== */}

                    <div
                        className={`
              flex
              items-center
              ${collapsed ? 'justify-center' : 'gap-3 px-2'}
            `}
                    >
                        {/* Avatar */}

                        <div
                            className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-white/20
                text-sm
                font-bold
              "
                        >
                            JD
                        </div>

                        {/* User information */}

                        {!collapsed && (
                            <>
                                <div className="min-w-0 flex-1 text-left ">
                                    <p
                                        className="
                      truncate
                      text-sm
                      font-bold
                      
                    "
                                    >
                                        John Doe
                                    </p>

                                    <p
                                        className="
                      truncate
                      text-[11px]
                      text-white/60
                    "
                                    >
                                        j.doe2541@gmail.com
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}
