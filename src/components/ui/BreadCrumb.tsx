'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items?: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const lang = useLocale();
    const pathname = usePathname();
    const isRTL = lang === 'ar';

    // Helper to format path slugs into clean text (e.g. "billing-and-payments" -> "Billing And Payments")
    const formatLabel = (segment: string) => {
        return segment
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Auto-generate items from current URL path if none are passed
    let breadcrumbItems: BreadcrumbItem[] = items || [];

    if (!items) {
        const segments = pathname.split('/').filter(Boolean);
        
        // Remove locale segment if present at the start of path
        const pathSegments = segments[0] === lang ? segments.slice(1) : segments;

        breadcrumbItems = pathSegments.map((segment, index) => {
            const href = `/${lang}/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;

            return {
                label: formatLabel(segment),
                href: isLast ? undefined : href,
            };
        });
    }

    return (
        <nav dir={isRTL ? 'rtl' : 'ltr'} className="flex flex-wrap items-center gap-2 text-sm text-[#868B89]">
            {/* Home / Portal */}
            <Link href={`/${lang}`} className="hover:underline font-medium text-[#17145F]">
                {lang === 'en' ? 'Portal' : 'الرئيسية'}
            </Link>

            {/* Separator */}
            {breadcrumbItems.length > 0 && (
                <span className="mx-1 text-gray-400">{isRTL ? '‹' : '›'}</span>
            )}

            {breadcrumbItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {item.href ? (
                        <Link href={item.href} className="hover:underline font-medium text-[#868B89]">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-semibold text-[#17145F]">{item.label}</span>
                    )}

                    {index !== breadcrumbItems.length - 1 && (
                        <span className="mx-1 text-gray-400">{isRTL ? '‹' : '›'}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}