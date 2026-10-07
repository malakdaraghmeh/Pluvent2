import { useEffect, useState, type SVGProps } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import {
    SidebarArabicFlagIcon as FlagAr,
    SidebarCollapsedLogoIcon as PLogo,
    SidebarEnglishFlagIcon as FlagEn,
    SidebarLogoIcon as Logo,
    SidebarMenuArrowIcon,
    SidebarMoonIcon,
    SidebarProfileImage,
    SidebarSunIcon,
    SidebarToggleIcon,
} from '@/assets';
import SidebarItem from './SidebarItem';
import ProfileInformationModal from './profile/ProfileInformationModal';
import { accountNavigation, mainNavigation } from './sidebar.data';
import type { ProfileData } from '../../../../utils/types/profile.types';

type SidebarIconProps = SVGProps<SVGSVGElement> & {
    size?: number | string;
};

const ChevronDown = ({ size = 24, ...props }: SidebarIconProps) => (
    <SidebarMenuArrowIcon width={size} height={size} {...props} />
);

const Sun = ({ size = 24, ...props }: SidebarIconProps) => (
    <SidebarSunIcon width={size} height={size} {...props} />
);

const Moon = ({ size = 24, ...props }: SidebarIconProps) => (
    <SidebarMoonIcon width={size} height={size} {...props} />
);

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
    const { t } = useTranslation('sidebar');
    const pathname = useLocation().pathname;
    const router = useNavigate();

    const currentLocale = pathname.split('/')[1] || 'en';
    const isArabic = currentLocale === 'ar';

    const [collapsed, setCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [profileData, setProfileData] = useState<ProfileData>({
        fullName: 'John Doe',
        email: 'j.doe2541@gmail.com',
        phoneNumber: '',
        role: 'Admin',
        lastUpdated: 'September 28, 2026',
    });

    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    useEffect(() => {
        if (!isMobileOpen) {
            setIsLanguageOpen(false);
        }
    }, [isMobileOpen]);

    const handleToggleCollapse = () => {
        const newState = !collapsed;

        setCollapsed(newState);
        onCollapseChange?.(newState);
        setIsLanguageOpen(false);
    };

    const handleToggleTheme = () => {
        const newTheme = !isDarkMode;

        setIsDarkMode(newTheme);
        onThemeChange?.(newTheme ? 'dark' : 'light');

        if (newTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleNavigation = () => {
        onMobileClose?.();
        setIsLanguageOpen(false);
    };

    const handleOpenProfile = () => {
        setIsProfileOpen(true);
        setIsLanguageOpen(false);
        onMobileClose?.();
    };

    const changeLanguage = (nextLocale: string) => {
        if (nextLocale === currentLocale) {
            setIsLanguageOpen(false);
            return;
        }

        const segments = pathname.split('/');

        segments[1] = nextLocale;
        router(segments.join('/'));

        setIsLanguageOpen(false);
        onMobileClose?.();
    };

    return (
        <>
            {isMobileOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={onMobileClose}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
                />
            )}

            <aside
                className={`fixed top-0 z-50 h-[calc(100vh-32px)] w-[280px] p-2 transition-all duration-300 ease-in-out sm:w-[300px] lg:static lg:z-30 lg:m-4 lg:flex lg:h-auto lg:translate-x-0 lg:p-0 ${isArabic ? 'right-0' : 'left-0'} ${ isMobileOpen ? 'translate-x-0' : isArabic ? 'translate-x-full' : '-translate-x-full' } ${collapsed ? 'lg:w-[104px]' : 'lg:w-[280px]'}`}
            >
                <div
                    className={`relative flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-[#17145F] px-4 py-5 text-white transition-all duration-300 lg:flex-1 ${collapsed ? 'lg:items-center lg:px-3' : ''}`}
                >
                    <button
                        type="button"
                        onClick={onMobileClose}
                        aria-label="Close sidebar"
                        className={`absolute top-5 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 lg:hidden ${isArabic ? 'left-4' : 'right-4'}`}
                    >
                        <X size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={handleToggleCollapse}
                        aria-label={collapsed ? t('expandSidebar') : t('collapseSidebar')}
                        className="fixed z-50 hidden h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#17145F] shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg lg:flex"
                        style={{
                            top: '58px',
                            ...(isArabic
                                ? {
                                      right: collapsed ? '92px' : '268px',
                                  }
                                : {
                                      left: collapsed ? '92px' : '268px',
                                  }),
                        }}
                    >
                        <SidebarToggleIcon
                            className={`h-[18px] w-[18px] transition-transform duration-200 ${ collapsed !== isArabic ? 'scale-x-[-1]' : '' }`}
                        />
                    </button>

                    <div
                        className={`mb-8 mt-1 w-full shrink-0 transition-all duration-300 ${collapsed ? 'lg:flex lg:justify-center lg:px-0' : 'px-3'}`}
                    >
                        <Link to={`/${currentLocale}`} onClick={handleNavigation}>
                            {!collapsed ? (
                                <div
                                    className={`flex flex-col ${ isArabic ? 'items-end text-right' : 'items-start text-left' }`}
                                >
                                    <div className="flex">
                                        <Logo />
                                    </div>

                                    <span className="mt-2 text-xs text-white/70">
                                        {t('portal')}
                                    </span>
                                </div>
                            ) : (
                                <PLogo />
                            )}
                        </Link>
                    </div>

                    <div
                        className={`flex w-full flex-1 flex-col overflow-y-auto overflow-x-hidden [::-webkit-scrollbar]:w-1.5 [::-webkit-scrollbar-button]:hidden [::-webkit-scrollbar-track]:bg-transparent [::-webkit-scrollbar-thumb]:rounded-full [::-webkit-scrollbar-thumb]:bg-white/20 hover:[::-webkit-scrollbar-thumb]:bg-white/40 ${isArabic ? 'pl-1' : 'pr-1'}`}
                    >
                        <nav
                            className={`w-full space-y-2 p-2 ${collapsed ? 'lg:flex lg:flex-col lg:items-center' : ''}`}
                        >
                            {mainNavigation.map(item => (
                                <div key={item.label} onClick={handleNavigation}>
                                    <SidebarItem
                                        {...item}
                                        label={t(item.label)}
                                        rawHref={item.href}
                                        href={`/${currentLocale}${item.href}`}
                                        collapsed={collapsed}
                                    />
                                </div>
                            ))}
                        </nav>

                        <div
                            className={`my-7 h-0 shrink-0 transition-all duration-300 ${collapsed ? 'lg:mx-auto lg:w-10' : 'w-full'}`}
                            style={{
                                borderTop: '1.55px solid',
                                borderImage:
                                    'linear-gradient(270deg, rgba(255,255,255,0) 0%, #39E1D7 49.58%, rgba(255,255,255,0) 100%) 1',
                            }}
                        />

                        <div className="w-full">
                            {!collapsed && (
                                <p
                                    className={`mb-3 w-full px-4 text-xs font-medium text-white/50 ${ isArabic ? 'text-right' : 'text-left' }`}
                                >
                                    {t('account')}
                                </p>
                            )}

                            {collapsed && (
                                <div className="mb-3 hidden justify-center lg:flex">
                                    <span className="h-1 w-1 rounded-full bg-white/40" />
                                </div>
                            )}

                            <nav
                                className={`space-y-2 ${collapsed ? 'lg:flex lg:flex-col lg:items-center' : ''}`}
                            >
                                {accountNavigation.map(item => (
                                    <div key={item.label} onClick={handleNavigation}>
                                        <SidebarItem
                                            {...item}
                                            label={t(item.label)}
                                            rawHref={item.href}
                                            href={`/${currentLocale}${item.href}`}
                                            collapsed={collapsed}
                                        />
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className="mt-8 w-full shrink-0">
                        <div className="relative mb-4 w-full lg:hidden">
                            <button
                                type="button"
                                onClick={() => setIsLanguageOpen(prev => !prev)}
                                className={`flex h-10 w-full items-center justify-between rounded-xl px-3 text-sm text-white transition-colors hover:bg-white/10 ${isArabic ? 'text-right' : 'text-left'}`}
                            >
                                <div className="flex items-center gap-3">
                                    {isArabic ? <FlagAr /> : <FlagEn />}

                                    <span className="text-[14px] font-medium">
                                        {isArabic ? 'العربية' : 'English'}
                                    </span>
                                </div>

                                <ChevronDown
                                    size={17}
                                    className={`transition-transform duration-200 ${ isLanguageOpen ? 'rotate-180' : '' }`}
                                />
                            </button>

                            {isLanguageOpen && (
                                <div className="absolute bottom-full left-0 z-[60] mb-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white py-2 shadow-xl">
                                    <button
                                        type="button"
                                        onClick={() => changeLanguage('ar')}
                                        className={`flex w-full items-center justify-between px-4 py-2.5 text-right text-sm transition-colors hover:bg-gray-50 ${ isArabic ? 'bg-gray-50 font-bold text-[#24453E]' : 'text-gray-600' }`}
                                    >
                                        <span>العربية</span>
                                        <FlagAr />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => changeLanguage('en')}
                                        className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 ${ currentLocale === 'en' ? 'bg-gray-50 font-bold text-[#24453E]' : 'text-gray-600' }`}
                                    >
                                        <span>English</span>
                                        <FlagEn />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mb-6 flex items-center justify-center gap-3">
                            <Sun
                                size={15}
                                className={!isDarkMode ? 'text-yellow-400' : 'text-white/40'}
                            />

                            <button
                                type="button"
                                onClick={handleToggleTheme}
                                aria-label={t('toggleTheme')}
                                className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${ isDarkMode ? 'bg-[#3934C8]' : 'bg-gray-300' }`}
                            >
                                <span
                                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ${ isDarkMode ? 'left-[22px]' : 'left-1' }`}
                                />
                            </button>

                            <Moon
                                size={15}
                                className={isDarkMode ? 'text-[#29D6D5]' : 'text-white/40'}
                            />
                        </div>

                        <div
                            className="mb-5 h-0 w-full"
                            style={{
                                borderTop: '1.55px solid',
                                borderImage:
                                    'linear-gradient(270deg, rgba(255,255,255,0) 0%, #FFFFFF 49.58%, rgba(255,255,255,0) 100%) 1',
                            }}
                        />

                        <button
                            type="button"
                            onClick={handleOpenProfile}
                            className={`flex w-full items-center rounded-xl py-2 transition-colors hover:bg-white/10 ${isArabic ? 'text-right' : 'text-left'} ${collapsed ? 'lg:justify-center' : 'gap-3 px-2'}`}
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/20 text-sm font-bold">
                                <img
                                    src={SidebarProfileImage}
                                    alt={profileData.fullName}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {!collapsed && (
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold">
                                        {profileData.fullName}
                                    </p>

                                    <p className="truncate text-[11px] text-white/60 [direction:ltr] [unicode-bidi:isolate]">
                                        {profileData.email}
                                    </p>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </aside>

            <ProfileInformationModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                profile={profileData}
                onSave={updatedProfile => {
                    setProfileData(updatedProfile);
                }}
            />
        </>
    );
}
