import { useLocation } from 'react-router-dom';

import logo from '@images/logo.png';
import { useState } from 'react';
import { Menu as HamburgerIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import LanguageSelect from '../../../ui/LanguageSelector';
import ButtonLink from '../../../ui/ButtonLink';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
    const { t } = useTranslation('navbar');
    const pathname = useLocation().pathname;
    const currentLocale = pathname.split('/')[1] || 'en';

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const links = [
        { label: t('Home'), href: `/${currentLocale}` },
        { label: t('About'), href: `/${currentLocale}/about` },
        { label: t('Booking'), href: `/${currentLocale}/booking` },
        { label: t('contactUs'), href: `/${currentLocale}/contactUs` },
    ];

    return (
        <div className="w-full bg-black">
            <nav className="relative w-full h-[100px] py-5 custom-container mx-auto flex justify-between items-center px-4 md:px-8">
                {/* Logo */}
                <div className="flex gap-10 items-center">
                    <Link to={`/${currentLocale}`}>
                        <img
                            src={logo}
                            width={120}
                            height={70}
                            alt="Logo"
                            className="object-contain"
                        />
                    </Link>
                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        {links.map(link => {
                            const isActive =
                                pathname === link.href ||
                                (pathname === `/${currentLocale}/` &&
                                    link.href === `/${currentLocale}`);
                            return (
                                <Link
                                    to={link.href}
                                    key={link.label}
                                    className={`relative py-2 transition-all duration-300 hover:text-main
                  ${
                      isActive
                          ? 'text-main border-b-2 border-main text-[24px]'
                          : 'text-white text-[22px] border-transparent border-b-2 hover:border-main'
                  }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Actions: Language & Login */}
                <div className="hidden lg:flex items-center gap-8">
                    <LanguageSelect />
                    <ButtonLink to={`/${currentLocale}/login`}>{t('Login')}</ButtonLink>
                </div>

                {/* Hamburger for mobile */}
                <div className="flex items-center gap-4 lg:hidden">
                    <button onClick={toggleSidebar}>
                        <HamburgerIcon className="w-8 h-8 text-white" />
                    </button>
                </div>
            </nav>

            {/* Sidebar for mobile */}
            <div
                className={`fixed top-0 ${currentLocale === 'ar' ? 'right-0' : 'left-0'} h-full w-72 bg-[#111] shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : currentLocale === 'ar' ? 'translate-x-full' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={toggleSidebar} className="text-white">
                        <X className="w-8 h-8" />
                    </button>
                </div>
                <div className="flex flex-col gap-6 p-8">
                    {links.map(link => {
                        const isActive =
                            pathname === link.href ||
                            (pathname === `/${currentLocale}/` &&
                                link.href === `/${currentLocale}`);
                        return (
                            <Link
                                to={link.href}
                                key={link.label}
                                className={`text-[20px] transition-all pb-2 hover:text-main w-fit ${
                                    isActive
                                        ? 'text-main border-b-2 border-main text-[24px]'
                                        : 'text-white text-[22px] border-transparent border-b-2 hover:border-main'
                                }`}
                                onClick={toggleSidebar}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
                <div className="px-8 flex flex-col gap-6 mt-4">
                    <LanguageSelect onClick={toggleSidebar} />
                    <ButtonLink to={`/${currentLocale}/login`} onClick={toggleSidebar}>
                        {t('Login')}
                    </ButtonLink>
                </div>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/70 z-40" onClick={toggleSidebar}></div>
            )}
        </div>
    );
}
