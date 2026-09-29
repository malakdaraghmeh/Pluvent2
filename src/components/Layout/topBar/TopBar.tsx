
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';

import Bell from '@icons/bell.svg?react';
import FlagAr from '@icons/egypt-flag.svg?react';
import FlagEn from '@icons/usa-flag.svg?react';

import NotificationsDropdown from '../notifications/NotificationsDropdown';


import { useTranslation } from 'react-i18next';

interface TopBarProps {
    onMobileMenu?: () => void;
}

export default function TopBar({ onMobileMenu }: TopBarProps) {
    const { t } = useTranslation("topBar");

    const pathname = useLocation().pathname;
    const router = useNavigate();

    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const notificationButtonRef = useRef<HTMLButtonElement>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLocale = pathname.split('/')[1] || 'en';

    /* ---------------------------------------------
       CLOSE LANGUAGE DROPDOWN ON OUTSIDE CLICK
    --------------------------------------------- */

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(
                    event.target as Node
                )
            ) {
                setIsLanguageOpen(false);
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };
    }, []);

    /* ---------------------------------------------
       CHANGE LANGUAGE
    --------------------------------------------- */

    const changeLanguage = (nextLocale: string) => {
        if (nextLocale === currentLocale) {
            setIsLanguageOpen(false);
            return;
        }

        const segments = pathname.split('/');

        segments[1] = nextLocale;

        router(segments.join('/'));

        setIsLanguageOpen(false);
    };

    return (
        <header
            className="
                flex
                min-h-[64px]
                w-full
                items-center
                justify-between
                gap-3
                rounded-[28px]
                border
                border-[#E5E7EB]
                bg-white
                px-4
                py-3

                sm:min-h-[70px]
                sm:rounded-[40px]
                sm:px-5
                sm:py-4

                lg:h-[76px]
                lg:rounded-[100px]
                lg:px-8
            "
        >
            {/* =====================================================
                LEFT SIDE
            ====================================================== */}

            <div className="flex min-w-0 items-center gap-3">

                {/* MOBILE MENU */}
                <button
                    type="button"
                    onClick={onMobileMenu}
                    aria-label="Open sidebar"
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-[#17145F]
                        transition-colors
                        hover:bg-gray-100

                        lg:hidden
                    "
                >
                    <Menu size={21} />
                </button>

                {/* BREADCRUMB */}
                <div className="min-w-0 overflow-hidden">
                    <span className="text-gray-500 font-semibold">{t('home', { defaultValue: 'Home' })}</span>
                </div>
            </div>

            {/* =====================================================
                RIGHT SIDE
            ====================================================== */}

            <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-5">

                {/* =================================================
                    NOTIFICATIONS
                ================================================== */}

                <button
                    ref={notificationButtonRef}
                    type="button"
                    onClick={() => {
                        setIsNotificationsOpen(current => !current);
                        setIsLanguageOpen(false);
                    }}
                    className="
                        relative
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        transition-colors
                        hover:bg-gray-100

                        sm:h-10
                        sm:w-10
                    "
                    aria-label={t('notifications')}
                    aria-expanded={isNotificationsOpen}
                >
                    <div className="h-[28px] w-[21px]">
                        <Bell />
                    </div>

                    <span
                        className="
                            absolute
                            right-[7px]
                            top-[7px]
                            h-2
                            w-2
                            rounded-full
                            bg-red-500
                        "
                    />
                </button>

                <NotificationsDropdown
                    isOpen={isNotificationsOpen}
                    onClose={() => setIsNotificationsOpen(false)}
                    triggerRef={notificationButtonRef}
                />

                {/* =================================================
                    LANGUAGE
                    ONLY VISIBLE ON WIDE SCREENS
                ================================================== */}

                <div
                    ref={dropdownRef}
                    className="
                        relative
                        hidden
                        lg:block
                    "
                >
                    <button
                        type="button"
                        onClick={() =>
                            setIsLanguageOpen(
                                (prev) => !prev
                            )
                        }
                        className="
                            flex
                            flex-row
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
                            transition-colors
                            hover:bg-gray-50
                        "
                    >
                        {/* ARROW */}
                        <ChevronDown
                            size={18}
                            className={`
                                transition-transform
                                duration-200

                                ${isLanguageOpen
                                    ? 'rotate-180'
                                    : ''
                                }
                            `}
                        />


                        {/* LANGUAGE */}
                        <span
                            className="
                                flex
                                text-[18px]
                                font-medium
                                text-[#24453E]
                            "
                        >
                            {currentLocale === 'ar'
                                ? 'AR'
                                : 'EN'}
                        </span>

                        {/* FLAG */}
                        {currentLocale === 'ar' ? (
                            <FlagAr />
                        ) : (
                            <FlagEn />
                        )}
                    </button>

                    {/* LANGUAGE DROPDOWN */}
                    {isLanguageOpen && (
                        <div
                            className="
                                absolute
                                right-0
                                z-50
                                mt-2
                                w-36
                                rounded-2xl
                                border
                                border-gray-100
                                bg-white
                                py-2
                                shadow-lg
                            "
                        >
                            {/* ARABIC */}
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

                                    ${currentLocale === 'ar'
                                        ? 'bg-gray-50 font-bold text-[#24453E]'
                                        : 'text-gray-600'
                                    }
                                `}
                            >
                                <span>
                                    Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©
                                </span>

                                <FlagAr />
                            </button>

                            {/* ENGLISH */}
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

                                    ${currentLocale === 'en'
                                        ? 'bg-gray-50 font-bold text-[#24453E]'
                                        : 'text-gray-600'
                                    }
                                `}
                            >
                                <span>
                                    English
                                </span>

                                <FlagEn />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
