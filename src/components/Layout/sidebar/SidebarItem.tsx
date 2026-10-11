import type { ComponentType, SVGProps } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarArrowIcon as Arrow } from '@/assets';

interface SidebarItemProps {
    label: string;
    href: string;
    rawHref: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    badge?: number;
    collapsed?: boolean;
}

export default function SidebarItem({
    label,
    href,
    rawHref,
    icon: Icon,
    badge,
    collapsed = false,
}: SidebarItemProps) {
    const pathname = useLocation().pathname;
    const isArabic = pathname.split('/')[1] === 'ar';

    const pathnameWithoutLocale =
        '/' + pathname.split('/').slice(2).join('/');

    const isActive =
        pathnameWithoutLocale === rawHref ||
        (rawHref !== '/' && pathnameWithoutLocale.startsWith(rawHref));

    const itemColor = isActive
        ? 'text-[#29D6D5]'
        : 'text-white/90 group-hover:text-[#29D6D5]';

    return (
        <Link
            to={href}
            title={collapsed ? label : undefined}
            className={`
                group
                relative
                flex
                h-11
                items-center
                rounded-xl
                ${collapsed ? 'w-11 justify-center px-0' : 'w-full gap-3 px-4'}
                ${
                    isActive
                        ? 'bg-[#17155C] text-[#29D6D5]'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                }
                ${!collapsed && isArabic ? 'flex-row-reverse' : ''}
            `}
        >
            {!collapsed && (
                <Arrow
                    className={`shrink-0 transition-all duration-200 ${itemColor}`}
                    style={{
                        transform: isArabic ? 'scaleX(-1)' : 'none',
                    }}
                />
            )}

            <Icon
                width={20}
                height={20}
                className={`shrink-0 transition-colors ${itemColor}`}
            />

            {!collapsed && (
                <span
                    className={`min-w-0 flex-1 text-sm font-semibold ${
                        isArabic ? 'text-right' : 'text-left'
                    }`}
                >
                    {label}
                </span>
            )}

            {!collapsed && badge !== undefined && (
                <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-[#36D6D6] px-1.5 text-xs font-bold text-[#15145B]">
                    {badge}
                </span>
            )}

            {collapsed && badge !== undefined && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#36D6D6] px-1 text-[9px] font-bold text-[#15145B]">
                    {badge}
                </span>
            )}
        </Link>
    );
}
