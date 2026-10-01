import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import BreadcrumbArrow from '@icons/arrow-left-s.svg?react';
import Bell from '@icons/bell.svg?react';
import FlagAr from '@icons/egypt-flag.svg?react';
import FlagEn from '@icons/usa-flag.svg?react';
import NotificationsDropdown from '../notifications/NotificationsDropdown';

interface TopBarProps {
    onMobileMenu?: () => void;
}

export default function TopBar({ onMobileMenu }: TopBarProps) {
    const { t } = useTranslation('topBar');
    const { t: changeRequestT } = useTranslation('changeRequestDetails');
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationButtonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLocale = pathname.split('/')[1] || 'en';
    const pathWithoutLocale = `/${pathname.split('/').filter(Boolean).slice(1).join('/')}`;

    const isInReviewPage = pathWithoutLocale === '/change-request-details';
    const isWaitingUserInputPage = /^\/projects\/[^/]+\/change-requests\/[^/]+\/waiting$/.test(
        pathWithoutLocale
    );
    const isPendingPaymentPage = /^\/projects\/[^/]+\/change-requests\/[^/]+\/payment$/.test(
        pathWithoutLocale
    );

    const isInProgressPage =
        /^\/projects\/[^/]+\/change-requests\/[^/]+\/in-progress$/.test(pathWithoutLocale);

    const isCompletedPage =
        /^\/projects\/[^/]+\/change-requests\/[^/]+\/completed$/.test(pathWithoutLocale);

    const showChangeRequestBreadcrumb =
        isInReviewPage || isWaitingUserInputPage || isPendingPaymentPage || isInProgressPage || isCompletedPage;

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

    const breadcrumbArrowClass =
        currentLocale === 'ar'
            ? 'h-3 w-3 shrink-0 rotate-180 sm:h-4 sm:w-4 md:h-5 md:w-5'
            : 'h-3 w-3 shrink-0 sm:h-4 sm:w-4 md:h-5 md:w-5';

    return (
        <header className="flex min-h-[64px] w-full items-center justify-between gap-3 rounded-[28px] border border-[#E5E7EB] bg-white px-4 py-3 sm:min-h-[70px] sm:rounded-[40px] sm:px-5 sm:py-4 lg:h-[76px] lg:rounded-[100px] lg:px-8">
            <div className="flex min-w-0 flex-1 items-center gap-3">
                <button
                    type="button"
                    onClick={onMobileMenu}
                    aria-label="Open sidebar"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#17145F] transition-colors hover:bg-gray-100 lg:hidden"
                >
                    <Menu size={21} />
                </button>

                {showChangeRequestBreadcrumb ? (
                    <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-center gap-[5px] whitespace-nowrap font-['Sora'] text-[8px] font-medium leading-3 min-[480px]:text-[9px] sm:gap-[8px] sm:text-[10px] md:gap-[10px] md:text-[14px] md:leading-5">
                            <Link
                                to={`/${currentLocale}`}
                                className="text-[#868B89] transition-opacity hover:opacity-70"
                            >
                                {changeRequestT('breadcrumb.portal')}
                            </Link>

                            <BreadcrumbArrow className={breadcrumbArrowClass} />

                            <Link
                                to={`/${currentLocale}/projects`}
                                className="text-[#868B89] transition-opacity hover:opacity-70"
                            >
                                {changeRequestT('breadcrumb.project')}
                            </Link>

                            <BreadcrumbArrow className={breadcrumbArrowClass} />

                            {currentProjectId ? (
                                <Link
                                    to={`/${currentLocale}/projects/${currentProjectId}`}
                                    className="text-[#868B89] transition-opacity hover:opacity-70"
                                >
                                    {changeRequestT('breadcrumb.projectDetails')}
                                </Link>
                            ) : (
                                <span className="text-[#868B89]">
                                    {changeRequestT('breadcrumb.projectDetails')}
                                </span>
                            )}

                            <BreadcrumbArrow className={breadcrumbArrowClass} />

                            <span className="font-semibold text-[#4F46E5]">
                                {changeRequestT('breadcrumb.changeRequestDetails')}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="min-w-0">
                        <span className="font-semibold text-gray-500">
                            {t('home', { defaultValue: 'Home' })}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-5">
                <button
                    ref={notificationButtonRef}
                    type="button"
                    onClick={() => {
                        setIsNotificationsOpen(current => !current);
                        setIsLanguageOpen(false);
                    }}
                    className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100 sm:h-10 sm:w-10"
                    aria-label={t('notifications')}
                    aria-expanded={isNotificationsOpen}
                >
                    <div className="h-[28px] w-[21px]">
                        <Bell />
                    </div>
                    <span className="absolute right-[7px] top-[7px] h-2 w-2 rounded-full bg-red-500" />
                </button>

                <NotificationsDropdown
                    isOpen={isNotificationsOpen}
                    onClose={() => setIsNotificationsOpen(false)}
                    triggerRef={notificationButtonRef}
                />

                <div ref={dropdownRef} className="relative hidden lg:block">
                    <button
                        type="button"
                        onClick={() => setIsLanguageOpen(prev => !prev)}
                        className="flex h-11 flex-row items-center gap-3 rounded-full border border-[#5C716F] px-5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                    >
                        <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${
                                isLanguageOpen ? 'rotate-180' : ''
                            }`}
                        />

                        <span className="flex text-[18px] font-medium text-[#24453E]">
                            {currentLocale === 'ar' ? 'AR' : 'EN'}
                        </span>

                        {currentLocale === 'ar' ? <FlagAr /> : <FlagEn />}
                    </button>

                    {isLanguageOpen && (
                        <div className="absolute right-0 z-50 mt-2 w-36 rounded-2xl border border-gray-100 bg-white py-2 shadow-lg">
                            <button
                                type="button"
                                onClick={() => changeLanguage('ar')}
                                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                                    currentLocale === 'ar'
                                        ? 'bg-gray-50 font-bold text-[#24453E]'
                                        : 'text-gray-600'
                                }`}
                            >
                                <span>العربية</span>
                                <FlagAr />
                            </button>

                            <button
                                type="button"
                                onClick={() => changeLanguage('en')}
                                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                                    currentLocale === 'en'
                                        ? 'bg-gray-50 font-bold text-[#24453E]'
                                        : 'text-gray-600'
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


