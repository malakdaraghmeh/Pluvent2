'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import Bell from '@icons/bell.svg';
import FlagAr from '@icons/egypt-flag.svg';
import FlagEn from '@icons/usa-flag.svg'; // Replace with FlagEn when available
import Breadcrumb from '../ui/BreadCrumb';
import { useTranslations } from 'next-intl';

export default function Tobar() {
  const t = useTranslations('topbar');
  const pathname = usePathname();
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Extract current language locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (nextLocale) => {
    if (nextLocale === currentLocale) {
      setIsOpen(false);
      return;
    }
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.push(segments.join('/'));
    setIsOpen(false);
  };

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
          aria-label={t('notifications')}
        >
          <Bell width={21} height={28} />
          <span className="absolute left-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Language Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-11 items-center gap-3 rounded-full border border-[#5C716F] px-5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronDown size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            <span className="flex text-[18px] font-medium text-[#24453E]">
              {currentLocale === 'ar' ? 'AR' : 'EN'}
            </span>
            {currentLocale === 'ar' ? <FlagAr /> : <FlagEn />}
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-gray-100 bg-white py-2 shadow-lg z-50">
              <button
                type="button"
                onClick={() => changeLanguage('ar')}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 ${
                  currentLocale === 'ar' ? 'bg-gray-50 text-[#24453E] font-bold' : 'text-gray-600'
                }`}
              >
                <span>العربية</span>
                <FlagAr />
              </button>

              <button
                type="button"
                onClick={() => changeLanguage('en')}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 ${
                  currentLocale === 'en' ? 'bg-gray-50 text-[#24453E] font-bold' : 'text-gray-600'
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