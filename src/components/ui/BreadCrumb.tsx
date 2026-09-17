'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

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
    const t = useTranslations('sidebar'); // Or 'breadcrumb' depending on your JSON structure

    // Dynamic translation lookup helper
    const getDynamicLabel = (segment: string) => {
        // Standardize path segment to match translation keys (e.g., "billing-and-payments" -> "BillingAndPayments")
        const translationKey = segment
            .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
            .replace(/^(.)/, (c) => c.toUpperCase());

        try {
            // Check if key exists in translation file
            return t(translationKey);
        } catch {
            // Fallback: Format slug into capitalized words if translation key doesn't exist
            return segment
                .replace(/-/g, ' ')
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase());
        }
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
                label: getDynamicLabel(segment),
                href: isLast ? undefined : href,
            };
        });
    }

    return (
        <nav dir={isRTL ? 'rtl' : 'ltr'} className="flex flex-wrap items-center gap-2 text-sm text-[#868B89]">
            {/* Home / Portal */}
            <Link href={`/${lang}`} className="hover:underline font-medium text-[#17145F]">
                {t('portal')}
            </Link>

            {/* Separator */}
            {breadcrumbItems.length > 0 && (
                <span className="mx-1 text-gray-400 rtl:rotate-180">{isRTL ? '‹' : '›'}</span>
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
                        <span className="mx-1 text-gray-400 rtl:rotate-180">{isRTL ? '‹' : '›'}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}