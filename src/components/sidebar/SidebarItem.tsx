'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Arrow from '@icons/arrow.svg';
import { ComponentType, SVGProps } from 'react';

interface SidebarItemProps {
    label: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    badge?: number;
    collapsed?: boolean;
}

export default function SidebarItem({
    label,
    href,
    icon: Icon,
    badge,
    collapsed = false,
}: SidebarItemProps) {
    const pathname = usePathname();

    const isActive = pathname === href || (href !== '/en' && pathname.startsWith(href));

    return (
        <Link
            href={href}
            title={collapsed ? label : undefined}
            className={`
        group
        relative
        flex
        h-11
        items-center
        rounded-xl
        transition-all
        duration-200

        ${collapsed ? 'w-11 justify-center px-0' : 'w-full gap-3 px-4'}

        ${
            isActive
                ? 'bg-[#17155C] text-[#29D6D5]'
                : 'text-white/90 hover:bg-white/10 hover:text-white'
        }
      `}
        >
            {/* Arrow - hidden when collapsed */}
            {!collapsed && (
                <Arrow
                    className={`
            shrink-0
            transition-colors
            duration-200
            ${isActive ? 'text-[#29D6D5]' : 'text-white/90 group-hover:text-[#29D6D5]'}
          `}
                />
            )}

            {/* Icon */}
            <Icon
                width={20}
                height={20}
                className={`
    shrink-0
    transition-colors

    ${isActive ? 'text-[#29D6D5]' : 'text-white/90 group-hover:text-[#29D6D5]'}
  `}
            />

            {/* Label */}
            {!collapsed && <span className="text-sm font-semibold">{label}</span>}

            {/* Badge - Expanded */}
            {!collapsed && badge !== undefined && (
                <span
                    className="
            flex
            h-6
            min-w-6
            items-center
            justify-center
            rounded-full
            bg-[#36D6D6]
            px-1.5
            text-xs
            font-bold
            text-[#15145B]
          "
                >
                    {badge}
                </span>
            )}

            {/* Badge - Collapsed */}
            {collapsed && badge !== undefined && (
                <span
                    className="
            absolute
            right-0
            top-0
            flex
            h-4
            min-w-4
            items-center
            justify-center
            rounded-full
            bg-[#36D6D6]
            px-1
            text-[9px]
            font-bold
            text-[#15145B]
          "
                >
                    {badge}
                </span>
            )}
        </Link>
    );
}
