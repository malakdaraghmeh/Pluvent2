'use client';

import { usePathname, useRouter } from 'next/navigation';

interface LanguageSelectProps {
    className?: string;
    onClick?: () => void;
}

import GlobeIcon from '@icons/earth.svg';

export default function LanguageSelect({ className = "", onClick }: LanguageSelectProps) {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = pathname.split('/')[1] || 'en';

    const switchLanguage = () => {
        const newLocale = currentLocale === 'ar' ? 'en' : 'ar';
        const parts = pathname.split('/').filter(Boolean);
        parts[0] = newLocale;
        router.push('/' + parts.join('/'));
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            onClick={switchLanguage}
            className={`flex items-center gap-2 text-white hover:text-main transition-colors ${className}`}
        >
            <span className="text-[20px]">
                {currentLocale === 'ar' ? 'English' : 'العربية'}
            </span>
            <GlobeIcon className="w-6 h-6" />
        </button>
    );
}
