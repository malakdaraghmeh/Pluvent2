'use client';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Breadcrumb({ items = [] }) {
    const lang = useLocale();
    const isRTL = lang === 'ar';

    return (
        <nav dir={isRTL ? 'rtl' : 'ltr'} className="flex flex-wrap gap-2 my-4 text-gray-700">
            {/* Home */}
            <Link href={`/${lang}`} className="hover:underline font-medium">
                {lang === 'en' ? 'Home' : 'الرئيسية'}
            </Link>

            {/* Separator */}
            {items.length > 0 && <span className="mx-1">{isRTL ? '\\' : '/'}</span>}

            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {item.href ? (
                        <Link href={item.href} className="hover:underline font-medium">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-semibold text-main">{item.label}</span>
                    )}

                    {index !== items.length - 1 && (
                        <span className="mx-1">{isRTL ? '\\' : '/'}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
