'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';

import SidebarItem from './SidebarItem';
import { mainNavigation, accountNavigation } from './sidebar.data';

import Logo from '@icons/logo.svg';
import PLogo from '@icons/p-logo.svg';

interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

export default function Sidebar({ onCollapseChange, onThemeChange }: SidebarProps) {
  const t = useTranslations('sidebar');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Theme state

  const handleToggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapseChange?.(newState);
  };

  const handleToggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    onThemeChange?.(newTheme ? 'dark' : 'light');
    
    // Optional: Toggle 'dark' class on HTML root element for global styling
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <aside
      className={`
        left-0
        top-0
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
        {/* COLLAPSE BUTTON */}
        <button
          type="button"
          onClick={handleToggleCollapse}
          aria-label={collapsed ? t('expandSidebar') : t('collapseSidebar')}
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

        {/* LOGO */}
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
          <Link href={`/${currentLocale}`}>
            {!collapsed ? (
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <Logo />
                </div>
                <span className="mt-2 self-start text-xs text-white/70">
                  {t('portal')}
                </span>
              </div>
            ) : (
              <PLogo />
            )}
          </Link>
        </div>

        {/* SCROLLABLE NAVIGATION */}
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
          {/* MAIN NAVIGATION */}
          <nav
            className={`
              w-full
              space-y-2
              ${collapsed ? 'flex flex-col items-center' : ''}
            `}
          >
            {mainNavigation.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
                label={t(item.label)}
                rawHref={item.href}
                href={`/${currentLocale}${item.href}`}
                collapsed={collapsed}
              />
            ))}
          </nav>

          {/* DIVIDER */}
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

          {/* ACCOUNT NAVIGATION */}
          <div className="w-full">
            {!collapsed && (
              <p className="mb-3 w-full px-4  text-xs font-medium text-white/50">
                {t('account')}
              </p>
            )}

            {collapsed && (
              <div className="mb-3 flex justify-center">
                <span className="h-1 w-1 rounded-full bg-white/40" />
              </div>
            )}

            <nav
              className={`
                space-y-2
                ${collapsed ? 'flex flex-col items-center' : ''}
              `}
            >
              {accountNavigation.map((item) => (
                <SidebarItem
                  key={item.label}
                  {...item}
                  label={t(item.label)}
                  rawHref={item.href}
                  href={`/${currentLocale}${item.href}`}
                  collapsed={collapsed}
                />
              ))}
            </nav>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-4 w-full shrink-0">
          {/* THEME SWITCHER */}
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
            <Sun
              size={15}
              className={`transition-colors ${
                !isDarkMode ? 'text-yellow-400' : 'text-white/40'
              }`}
            />

            {!collapsed && (
              <>
                <button
                  type="button"
                  onClick={handleToggleTheme}
                  aria-label={t('toggleTheme')}
                  className={`
                    relative
                    h-6
                    w-11
                    rounded-full
                    transition-colors
                    duration-300
                    ${isDarkMode ? 'bg-[#3934C8]' : 'bg-gray-300'}
                  `}
                >
                  <span
                    className={`
                      absolute
                      top-1
                      h-4
                      w-4
                      rounded-full
                      bg-white
                      shadow
                      transition-transform
                      duration-300
                      ${isDarkMode ? 'left-[22px]' : 'left-1'}
                    `}
                  />
                </button>

                <Moon
                  size={15}
                  className={`transition-colors ${
                    isDarkMode ? 'text-[#29D6D5]' : 'text-white/40'
                  }`}
                />
              </>
            )}
          </div>

          <div
            className="mb-5 h-0 w-full"
            style={{
              borderTop: '1.55px solid',
              borderImage:
                'linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 49.58%, rgba(255, 255, 255, 0) 100%) 1',
            }}
          />

          {/* USER PROFILE */}
          <div
            className={`
              flex
              items-center
              ${collapsed ? 'justify-center' : 'gap-3 px-2'}
            `}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/20 text-sm font-bold">
              JD
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1 ">
                <p className="truncate text-sm font-bold">John Doe</p>
                <p className="truncate text-[11px] text-white/60">
                  j.doe2541@gmail.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}