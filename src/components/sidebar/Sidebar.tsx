'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Moon,
    Sun,
    X,
} from 'lucide-react';

import SidebarItem from './SidebarItem';
import {
    mainNavigation,
    accountNavigation,
} from './sidebar.data';

import Logo from '@icons/logo.svg';
import PLogo from '@icons/p-logo.svg';

import FlagAr from '@icons/egypt-flag.svg';
import FlagEn from '@icons/usa-flag.svg';

interface SidebarProps {
    onCollapseChange?: (collapsed: boolean) => void;
    onThemeChange?: (theme: 'light' | 'dark') => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

export default function Sidebar({
    onCollapseChange,
    onThemeChange,
    isMobileOpen = false,
    onMobileClose,
}: SidebarProps) {
    const t = useTranslations('sidebar');

    const pathname = usePathname();
    const router = useRouter();

    const currentLocale =
        pathname.split('/')[1] || 'en';

    const [collapsed, setCollapsed] =
        useState(false);

    const [isDarkMode, setIsDarkMode] =
        useState(true);

    const [isLanguageOpen, setIsLanguageOpen] =
        useState(false);

    /* ---------------------------------------------
       CLOSE LANGUAGE WHEN MOBILE SIDEBAR CLOSES
    --------------------------------------------- */

    useEffect(() => {
        if (!isMobileOpen) {
            setIsLanguageOpen(false);
        }
    }, [isMobileOpen]);

    /* ---------------------------------------------
       COLLAPSE
    --------------------------------------------- */

    const handleToggleCollapse = () => {
        const newState = !collapsed;

        setCollapsed(newState);

        onCollapseChange?.(newState);

        setIsLanguageOpen(false);
    };

    /* ---------------------------------------------
       THEME
    --------------------------------------------- */

    const handleToggleTheme = () => {
        const newTheme = !isDarkMode;

        setIsDarkMode(newTheme);

        onThemeChange?.(
            newTheme ? 'dark' : 'light'
        );

        if (newTheme) {
            document.documentElement.classList.add(
                'dark'
            );
        } else {
            document.documentElement.classList.remove(
                'dark'
            );
        }
    };

    /* ---------------------------------------------
       NAVIGATION
    --------------------------------------------- */

    const handleNavigation = () => {
        onMobileClose?.();
        setIsLanguageOpen(false);
    };

    /* ---------------------------------------------
       LANGUAGE
    --------------------------------------------- */

    const changeLanguage = (nextLocale: string) => {
        if (nextLocale === currentLocale) {
            setIsLanguageOpen(false);
            return;
        }

        const segments = pathname.split('/');

        segments[1] = nextLocale;

        router.push(segments.join('/'));

        setIsLanguageOpen(false);

        onMobileClose?.();
    };

    return (
        <>
            {/* =====================================================
                MOBILE OVERLAY
            ====================================================== */}

            {isMobileOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={onMobileClose}
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/40
                        backdrop-blur-[2px]

                        lg:hidden
                    "
                />
            )}

            {/* =====================================================
                SIDEBAR CONTAINER
            ====================================================== */}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    h-screen
                    p-2

                    transition-all
                    duration-300
                    ease-in-out

                    lg:sticky
                    lg:z-30
                    lg:h-screen
                    lg:p-0

                    ${
                        isMobileOpen
                            ? 'translate-x-0'
                            : '-translate-x-full'
                    }

                    lg:translate-x-0

                    ${
                        collapsed
                            ? 'lg:w-[104px]'
                            : 'lg:w-[280px]'
                    }

                    w-[280px]
                    sm:w-[300px]
                `}
            >
                <div
                    className={`
                        relative
                        flex
                        h-full
                        w-full
                        flex-col
                        overflow-y-auto
                        overflow-x-hidden
                        rounded-[28px]
                        bg-[#17145F]
                        px-4
                        py-5
                        text-white

                        transition-all
                        duration-300

                        [::-webkit-scrollbar]:w-1.5
                        [::-webkit-scrollbar-button]:hidden
                        [::-webkit-scrollbar-track]:bg-transparent
                        [::-webkit-scrollbar-thumb]:rounded-full
                        [::-webkit-scrollbar-thumb]:bg-white/20
                        hover:[::-webkit-scrollbar-thumb]:bg-white/40

                        ${
                            collapsed
                                ? 'lg:items-center lg:px-3'
                                : ''
                        }
                    `}
                >

                    {/* =================================================
                        MOBILE CLOSE
                    ================================================== */}

                    <button
                        type="button"
                        onClick={onMobileClose}
                        aria-label="Close sidebar"
                        className="
                            absolute
                            right-4
                            top-5
                            z-50
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            bg-white/10
                            text-white
                            transition
                            hover:bg-white/20

                            lg:hidden
                        "
                    >
                        <X size={18} />
                    </button>

                    {/* =================================================
                        COLLAPSE BUTTON
                    ================================================== */}

                    <button
                        type="button"
                        onClick={handleToggleCollapse}
                        aria-label={
                            collapsed
                                ? t('expandSidebar')
                                : t('collapseSidebar')
                        }
                        className="
                            fixed
                            z-50
                            hidden
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

                            lg:flex
                        "
                        style={{
                            top: '58px',
                            left: collapsed ? '92px' : '268px',
                        }}
                    >
                        {collapsed ? (
                            <ChevronRight
                                size={18}
                                strokeWidth={2.5}
                            />
                        ) : (
                            <ChevronLeft
                                size={18}
                                strokeWidth={2.5}
                            />
                        )}
                    </button>

                    {/* =================================================
                        LOGO
                    ================================================== */}

                    <div
                        className={`
                            mb-8
                            mt-1
                            w-full
                            shrink-0
                            transition-all
                            duration-300

                            ${
                                collapsed
                                    ? 'lg:flex lg:justify-center lg:px-0'
                                    : 'px-3'
                            }
                        `}
                    >
                        <Link
                            href={`/${currentLocale}`}
                            onClick={handleNavigation}
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
                                        {t('portal')}
                                    </span>
                                </div>
                            ) : (
                                <PLogo />
                            )}
                        </Link>
                    </div>

                    {/* =================================================
                        NAVIGATION & CONTENT
                    ================================================== */}

                    <div className="flex w-full flex-1 flex-col">
                        {/* MAIN NAVIGATION */}
                        <nav
                            className={`
                                w-full
                                space-y-2

                                ${
                                    collapsed
                                        ? 'lg:flex lg:flex-col lg:items-center'
                                        : ''
                                }
                            `}
                        >
                            {mainNavigation.map(
                                (item) => (
                                    <div
                                        key={item.label}
                                        onClick={
                                            handleNavigation
                                        }
                                    >
                                        <SidebarItem
                                            {...item}
                                            label={t(
                                                item.label
                                            )}
                                            rawHref={
                                                item.href
                                            }
                                            href={`/${currentLocale}${item.href}`}
                                            collapsed={
                                                collapsed
                                            }
                                        />
                                    </div>
                                )
                            )}
                        </nav>

                        {/* DIVIDER */}
                        <div
                            className={`
                                my-7
                                h-0
                                shrink-0
                                transition-all
                                duration-300

                                ${
                                    collapsed
                                        ? 'lg:mx-auto lg:w-10'
                                        : 'w-full'
                                }
                            `}
                            style={{
                                borderTop:
                                    '1.55px solid',
                                borderImage:
                                    'linear-gradient(270deg, rgba(255,255,255,0) 0%, #39E1D7 49.58%, rgba(255,255,255,0) 100%) 1',
                            }}
                        />

                        {/* ACCOUNT NAVIGATION */}
                        <div className="w-full">
                            {!collapsed && (
                                <p
                                    className="
                                        mb-3
                                        w-full
                                        px-4
                                        text-xs
                                        font-medium
                                        text-white/50
                                    "
                                >
                                    {t('account')}
                                </p>
                            )}

                            {collapsed && (
                                <div className="mb-3 hidden justify-center lg:flex">
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

                            <nav
                                className={`
                                    space-y-2

                                    ${
                                        collapsed
                                            ? 'lg:flex lg:flex-col lg:items-center'
                                            : ''
                                    }
                                `}
                            >
                                {accountNavigation.map(
                                    (item) => (
                                        <div
                                            key={
                                                item.label
                                            }
                                            onClick={
                                                handleNavigation
                                            }
                                        >
                                            <SidebarItem
                                                {...item}
                                                label={t(
                                                    item.label
                                                )}
                                                rawHref={
                                                    item.href
                                                }
                                                href={`/${currentLocale}${item.href}`}
                                                collapsed={
                                                    collapsed
                                                }
                                            />
                                        </div>
                                    )
                                )}
                            </nav>
                        </div>
                    </div>

                    {/* =====================================================
                        BOTTOM SECTION
                    ====================================================== */}

                    <div className="mt-8 w-full shrink-0">
                        {/* LANGUAGE (SMALL SCREENS) */}
                        <div
                            className="
                                relative
                                mb-4
                                w-full

                                lg:hidden
                            "
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setIsLanguageOpen(
                                        (prev) =>
                                            !prev
                                    )
                                }
                                className="
                                    flex
                                    h-10
                                    w-full
                                    items-center
                                    justify-between
                                    rounded-xl
                                    px-3
                                    text-sm
                                    text-white
                                    transition-colors
                                    hover:bg-white/10
                                "
                            >
                                <div className="flex items-center gap-3">
                                    {currentLocale === 'ar' ? (
                                        <FlagAr />
                                    ) : (
                                        <FlagEn />
                                    )}

                                    <span className="text-[14px] font-medium">
                                        {currentLocale === 'ar'
                                            ? 'العربية'
                                            : 'English'}
                                    </span>
                                </div>

                                <ChevronDown
                                    size={17}
                                    className={`
                                        transition-transform
                                        duration-200

                                        ${
                                            isLanguageOpen
                                                ? 'rotate-180'
                                                : ''
                                        }
                                    `}
                                />
                            </button>

                            {/* DROPDOWN */}
                            {isLanguageOpen && (
                                <div
                                    className="
                                        absolute
                                        bottom-full
                                        left-0
                                        z-[60]
                                        mb-2
                                        w-full
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-gray-100
                                        bg-white
                                        py-2
                                        shadow-xl
                                    "
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            changeLanguage('ar')
                                        }
                                        className={`
                                            flex
                                            w-full
                                            items-center
                                            justify-between
                                            px-4
                                            py-2.5
                                            text-sm
                                            transition-colors
                                            hover:bg-gray-50

                                            ${
                                                currentLocale === 'ar'
                                                    ? 'bg-gray-50 font-bold text-[#24453E]'
                                                    : 'text-gray-600'
                                            }
                                        `}
                                    >
                                        <span>العربية</span>
                                        <FlagAr />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            changeLanguage('en')
                                        }
                                        className={`
                                            flex
                                            w-full
                                            items-center
                                            justify-between
                                            px-4
                                            py-2.5
                                            text-sm
                                            transition-colors
                                            hover:bg-gray-50

                                            ${
                                                currentLocale === 'en'
                                                    ? 'bg-gray-50 font-bold text-[#24453E]'
                                                    : 'text-gray-600'
                                            }
                                        `}
                                    >
                                        <span>English</span>
                                        <FlagEn />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* THEME SWITCHER */}
                        <div
                            className="
                                mb-6
                                flex
                                items-center
                                justify-center
                                gap-3
                            "
                        >
                            <Sun
                                size={15}
                                className={
                                    !isDarkMode
                                        ? 'text-yellow-400'
                                        : 'text-white/40'
                                }
                            />

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

                                    ${
                                        isDarkMode
                                            ? 'bg-[#3934C8]'
                                            : 'bg-gray-300'
                                    }
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

                                        ${
                                            isDarkMode
                                                ? 'left-[22px]'
                                                : 'left-1'
                                        }
                                    `}
                                />
                            </button>

                            <Moon
                                size={15}
                                className={
                                    isDarkMode
                                        ? 'text-[#29D6D5]'
                                        : 'text-white/40'
                                }
                            />
                        </div>

                        {/* DIVIDER */}
                        <div
                            className="
                                mb-5
                                h-0
                                w-full
                            "
                            style={{
                                borderTop:
                                    '1.55px solid',
                                borderImage:
                                    'linear-gradient(270deg, rgba(255,255,255,0) 0%, #FFFFFF 49.58%, rgba(255,255,255,0) 100%) 1',
                            }}
                        />

                        {/* USER PROFILE */}
                        <div
                            className={`
                                flex
                                items-center

                                ${
                                    collapsed
                                        ? 'lg:justify-center'
                                        : 'gap-3 px-2'
                                }
                            `}
                        >
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

                            {!collapsed && (
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold">
                                        John Doe
                                    </p>

                                    <p className="truncate text-[11px] text-white/60">
                                        j.doe2541@gmail.com
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}