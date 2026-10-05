import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import BreadcrumbArrow from '@icons/arrow-left-s.svg?react';
import Bell from '@icons/bell.svg?react';
import FlagAr from '@icons/egypt-flag.svg?react';
import FlagEn from '@icons/usa-flag.svg?react';

import type { TopBarProps } from '../../../../utils/types/top-bar.types';

import NotificationsDropdown from '../notifications/NotificationsDropdown';

export default function TopBar({ onMobileMenu }: TopBarProps) {
    const { t } = useTranslation('topBar');
    const { t: sidebarT } = useTranslation('sidebar');
    const { t: filesT } = useTranslation('files');
    const { t: changeRequestT } = useTranslation('changeRequestDetails');
    const { t: billingT } = useTranslation('billingPage');
    const { t: ticketsT } = useTranslation('tickets');

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const notificationButtonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLocale = pathname.split('/')[1] || 'en';
    const isArabic = currentLocale.startsWith('ar');
    const rowClass = isArabic ? 'flex-row-reverse' : 'flex-row';

    const pathWithoutLocale = `/${pathname.split('/').filter(Boolean).slice(1).join('/')}`;

    const isProjectsPage = pathWithoutLocale === '/projects';
    const isProjectDetailsPage = /^\/projects\/[^/]+$/.test(pathWithoutLocale);
    const isBillingPage = pathWithoutLocale === '/billing';
    const isAllFilesPage = pathWithoutLocale === '/file-and-document';
    const isUserManagementPage = pathWithoutLocale === '/users';
    const isSupportPage = pathWithoutLocale === '/support';
    const isTicketDetailsPage = /^\/support\/[^/]+$/.test(pathWithoutLocale);
    const isMessagesPage = pathWithoutLocale === '/messages';

    const projectFilesMatch = pathWithoutLocale.match(/^\/projects\/([^/]+)\/files$/);
    const isProjectFilesPage = Boolean(projectFilesMatch);
    const projectFilesProjectId = projectFilesMatch?.[1];

    const isInReviewPage = pathWithoutLocale === '/change-request-details';

    const isWaitingUserInputPage = /^\/projects\/[^/]+\/change-requests\/[^/]+\/waiting$/.test(
        pathWithoutLocale
    );

    const isPendingPaymentPage = /^\/projects\/[^/]+\/change-requests\/[^/]+\/payment$/.test(
        pathWithoutLocale
    );

    const isInProgressPage = /^\/projects\/[^/]+\/change-requests\/[^/]+\/in-progress$/.test(
        pathWithoutLocale
    );

    const isCompletedPage = /^\/projects\/[^/]+\/change-requests\/[^/]+\/completed$/.test(
        pathWithoutLocale
    );

    const showChangeRequestBreadcrumb =
        isInReviewPage ||
        isWaitingUserInputPage ||
        isPendingPaymentPage ||
        isInProgressPage ||
        isCompletedPage;

    const changeRequestProjectMatch = pathWithoutLocale.match(
        /^\/projects\/([^/]+)\/change-requests\/[^/]+\/(?:waiting|payment|in-progress|completed)$/
    );

    const currentProjectId = changeRequestProjectMatch?.[1];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLanguageOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const changeLanguage = (nextLocale: string) => {
        if (nextLocale === currentLocale) {
            setIsLanguageOpen(false);
            return;
        }

        const segments = pathname.split('/');
        segments[1] = nextLocale;

        navigate(segments.join('/'));
        setIsLanguageOpen(false);
    };

    const breadcrumbArrowClass = `h-3 w-3 shrink-0 transition-transform min-[480px]:h-3.5 min-[480px]:w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 ${
        isArabic ? 'rotate-180' : ''
    }`;

    const breadcrumbClass = `flex ${rowClass} min-w-0 items-center gap-1.5 whitespace-nowrap font-['Sora'] text-[9px] font-medium leading-4 min-[480px]:text-[10px] sm:gap-2 sm:text-[11px] md:gap-2.5 md:text-[12px] lg:gap-3 lg:text-[14px] lg:leading-5`;

    const projectsBreadcrumbClass = `flex ${rowClass} min-w-0 items-center gap-1.5 whitespace-nowrap font-['Roboto'] text-[9px] font-medium leading-4 min-[480px]:text-[10px] sm:gap-2 sm:text-[11px] md:gap-2.5 md:text-[12px] lg:gap-3 lg:text-[14px] lg:leading-5`;

    const breadcrumbContent = () => {
        if (isProjectsPage) {
            return (
                <div className={projectsBreadcrumbClass}>
                    <Link
                        to={`/${currentLocale}`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {changeRequestT('breadcrumb.portal')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <span className="shrink-0 whitespace-nowrap text-[#08040B]/80">
                        {changeRequestT('breadcrumb.project')}
                    </span>
                </div>
            );
        }

        if (isProjectDetailsPage) {
            return (
                <div className={projectsBreadcrumbClass}>
                    <Link
                        to={`/${currentLocale}`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {changeRequestT('breadcrumb.portal')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <Link
                        to={`/${currentLocale}/projects`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {changeRequestT('breadcrumb.project')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <span className="shrink-0 whitespace-nowrap font-semibold text-[#4F46E5]">
                        {changeRequestT('breadcrumb.projectDetails')}
                    </span>
                </div>
            );
        }

        if (isBillingPage) {
            return (
                <div className={breadcrumbClass}>
                    <Link
                        to={`/${currentLocale}`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {sidebarT('portal')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <span className="shrink-0 whitespace-nowrap font-semibold text-[#4F46E5]">
                        {billingT('title')}
                    </span>
                </div>
            );
        }

        if (isProjectFilesPage) {
            return (
                <div className={breadcrumbClass}>
                    <Link
                        to={`/${currentLocale}`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {changeRequestT('breadcrumb.portal')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <Link
                        to={`/${currentLocale}/projects`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {changeRequestT('breadcrumb.project')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <Link
                        to={`/${currentLocale}/projects/${projectFilesProjectId}`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {changeRequestT('breadcrumb.projectDetails')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <span className="shrink-0 whitespace-nowrap font-semibold text-[#4F46E5]">
                        {filesT('title')}
                    </span>
                </div>
            );
        }

        if (isAllFilesPage) {
            return (
                <div className={breadcrumbClass}>
                    <Link
                        to={`/${currentLocale}`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {sidebarT('Dashboard')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <span className="shrink-0 whitespace-nowrap font-semibold text-[#4F46E5]">
                        {filesT('title')}
                    </span>
                </div>
            );
        }

        if (isSupportPage) {
            return (
                <div className={breadcrumbClass}>
                    <Link
                        to={`/${currentLocale}`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {ticketsT('breadcrumb.portal')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <span className="shrink-0 whitespace-nowrap font-semibold text-[#4F46E5]">
                        {ticketsT('breadcrumb.supportTicket')}
                    </span>
                </div>
            );
        }

        if (isTicketDetailsPage) {
            return (
                <div className={breadcrumbClass}>
                    <Link
                        to={`/${currentLocale}`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {ticketsT('breadcrumb.portal')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <Link
                        to={`/${currentLocale}/support`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {ticketsT('breadcrumb.supportTicket')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <span className="shrink-0 whitespace-nowrap font-semibold text-[#4F46E5]">
                        {ticketsT('breadcrumb.createTicket')}
                    </span>
                </div>
            );
        }

        if (isMessagesPage) {
            return (
                <div className={breadcrumbClass}>
                    <Link
                        to={`/${currentLocale}`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {sidebarT('portal')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <span className="shrink-0 whitespace-nowrap font-semibold text-[#4F46E5]">
                        {sidebarT('Messages')}
                    </span>
                </div>
            );
        }

        if (isUserManagementPage) {
            return (
                <div className={breadcrumbClass}>
                    <Link
                        to={`/${currentLocale}`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {sidebarT('portal')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <span className="shrink-0 whitespace-nowrap font-semibold text-[#4F46E5]">
                        {sidebarT('UserManagement')}
                    </span>
                </div>
            );
        }

        if (showChangeRequestBreadcrumb) {
            return (
                <div className={breadcrumbClass}>
                    <Link
                        to={`/${currentLocale}`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {changeRequestT('breadcrumb.portal')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <Link
                        to={`/${currentLocale}/projects`}
                        className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                    >
                        {changeRequestT('breadcrumb.project')}
                    </Link>

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    {currentProjectId ? (
                        <Link
                            to={`/${currentLocale}/projects/${currentProjectId}`}
                            className="shrink-0 text-[#868B89] transition-opacity hover:opacity-70"
                        >
                            {changeRequestT('breadcrumb.projectDetails')}
                        </Link>
                    ) : (
                        <span className="shrink-0 whitespace-nowrap text-[#868B89]">
                            {changeRequestT('breadcrumb.projectDetails')}
                        </span>
                    )}

                    <BreadcrumbArrow className={breadcrumbArrowClass} />

                    <span className="shrink-0 whitespace-nowrap font-semibold text-[#4F46E5]">
                        {changeRequestT('breadcrumb.changeRequestDetails')}
                    </span>
                </div>
            );
        }

        return (
            <span className="shrink-0 whitespace-nowrap text-[13px] font-semibold leading-5 text-[#64748B] sm:text-[14px] lg:text-[16px]">
                {sidebarT('portal')}
            </span>
        );
    };

    return (
        <header
            className={`flex ${rowClass} h-[64px] min-h-[64px] w-full min-w-0 items-center justify-between gap-2 rounded-[32px] border border-[#E5E7EB] bg-white px-3 min-[480px]:px-4 sm:h-[70px] sm:min-h-[70px] sm:gap-3 sm:rounded-[40px] sm:px-5 lg:h-[76px] lg:min-h-[76px] lg:gap-6 lg:rounded-[100px] lg:px-8`}
        >
            <div className={`flex ${rowClass} min-w-0 flex-1 items-center gap-2 sm:gap-3`}>
                <button
                    type="button"
                    onClick={onMobileMenu}
                    aria-label="Open sidebar"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#17145F] transition-colors hover:bg-[#F8FAFC] sm:h-10 sm:w-10 lg:hidden"
                >
                    <Menu size={21} />
                </button>

                <div className="min-w-0 flex-1 overflow-hidden">{breadcrumbContent()}</div>
            </div>

            <div className={`flex ${rowClass} shrink-0 items-center gap-1 sm:gap-3 lg:gap-5`}>
                <div className="relative shrink-0">
                    <button
                        ref={notificationButtonRef}
                        type="button"
                        onClick={() => {
                            setIsNotificationsOpen(current => !current);
                            setIsLanguageOpen(false);
                        }}
                        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-[#F8FAFC] sm:h-10 sm:w-10 lg:h-11 lg:w-11"
                        aria-label={t('notifications')}
                        aria-expanded={isNotificationsOpen}
                    >
                        <Bell className="h-[24px] w-[18px] sm:h-[28px] sm:w-[21px]" />
                        <span className="absolute right-[7px] top-[6px] h-2 w-2 rounded-full bg-red-500 sm:right-[8px] sm:top-[7px]" />
                    </button>

                    <NotificationsDropdown
                        isOpen={isNotificationsOpen}
                        onClose={() => setIsNotificationsOpen(false)}
                        triggerRef={notificationButtonRef}
                    />
                </div>

                <div ref={dropdownRef} className="relative hidden shrink-0 lg:block">
                    <button
                        type="button"
                        onClick={() => {
                            setIsLanguageOpen(previous => !previous);
                            setIsNotificationsOpen(false);
                        }}
                        className={`flex ${rowClass} h-11 min-w-[146px] shrink-0 items-center justify-center gap-3 rounded-full border border-[#5C716F] bg-white px-5 text-[#24453E] transition-colors hover:bg-[#F8FAFC]`}
                        aria-expanded={isLanguageOpen}
                    >
                        <ChevronDown
                            size={18}
                            className={`shrink-0 transition-transform duration-200 ${
                                isLanguageOpen ? 'rotate-180' : ''
                            }`}
                        />

                        <span className="shrink-0 whitespace-nowrap text-[18px] font-medium leading-[22px]">
                            {isArabic ? 'AR' : 'EN'}
                        </span>

                        <span className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
                            {isArabic ? <FlagAr /> : <FlagEn />}
                        </span>
                    </button>

                    {isLanguageOpen && (
                        <div
                            className={`absolute top-[52px] z-50 w-40 rounded-2xl border border-[#E5E7EB] bg-white py-2 shadow-lg ${
                                isArabic ? 'left-0' : 'right-0'
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => changeLanguage('ar')}
                                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-[#F8FAFC] ${
                                    isArabic
                                        ? 'bg-[#F8FAFC] font-semibold text-[#24453E]'
                                        : 'text-[#64748B]'
                                }`}
                            >
                                <span>العربية</span>
                                <FlagAr />
                            </button>

                            <button
                                type="button"
                                onClick={() => changeLanguage('en')}
                                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-[#F8FAFC] ${
                                    currentLocale === 'en'
                                        ? 'bg-[#F8FAFC] font-semibold text-[#24453E]'
                                        : 'text-[#64748B]'
                                }`}
                            >
                                <span>English</span>
                                <FlagEn />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
