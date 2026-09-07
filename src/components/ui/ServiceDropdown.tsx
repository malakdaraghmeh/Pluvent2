'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';

function DropdownItem({ item, currentLocale, onLinkClick, type = 'services' }) {
    const identifier = type === 'products' ? item.id : item.slug;
    const title = type === 'products' ? item.name : item.title;
    const locale = useLocale();

    const href =
        type === 'products'
            ? `/${currentLocale}/products?category=${identifier}`
            : `/${currentLocale}/services/${identifier}`;

    return (
        <div className="relative group border-b border-gray-50 last:border-0">
            <div className="flex items-center justify-between hover:bg-main/5 transition">
                <Link
                    href={href}
                    className="w-full text-[13px] px-4 py-2.5 transition-colors hover:text-main"
                    onClick={onLinkClick}
                >
                    {title}
                </Link>

                {item.children?.length > 0 &&
                    (locale === 'en' ? (
                        <ChevronRight
                            className="mr-2 text-gray-400 group-hover:text-main"
                            size={20}
                        />
                    ) : (
                        <ChevronLeft
                            className="ml-2 text-gray-400 group-hover:text-main"
                            size={20}
                        />
                    ))}
            </div>

            {item.children?.length > 0 && (
                <div
                    className={`absolute top-0 ltr:left-full rtl:right-full ml-1 mr-1 w-56 bg-white shadow-xl rounded-lg hidden group-hover:block z-50 border border-gray-100 overflow-hidden`}
                >
                    {item.children.map(child => {
                        const childIdentifier = type === 'products' ? child.id : child.slug;
                        const childHref =
                            type === 'products'
                                ? `/${currentLocale}/products?category=${childIdentifier}`
                                : `/${currentLocale}/services/${childIdentifier}`;

                        return (
                            <Link
                                key={child.id}
                                href={childHref}
                                className="block text-[13px] px-4 py-2.5 hover:bg-main hover:text-white transition border-b border-gray-50 last:border-0"
                                onClick={onLinkClick}
                            >
                                {child.title}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function ServiceDropdown({
    label,
    serviceLinks,
    currentLocale,
    onLinkClick,
    isHome,
    type = 'services',
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const pathname = usePathname();

    const toggle = () => setOpen(prev => !prev);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!open) return;

        const handler = e => {
            if (ref.current && !e.composedPath().includes(ref.current)) {
                setOpen(false);
            }
        };

        const handleEsc = e => {
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };

        window.addEventListener('mousedown', handler, { capture: true });
        window.addEventListener('click', handler, { capture: true });
        window.addEventListener('touchstart', handler, { capture: true });
        window.addEventListener('keydown', handleEsc, { capture: true });

        return () => {
            window.removeEventListener('mousedown', handler, { capture: true });
            window.removeEventListener('click', handler, { capture: true });
            window.removeEventListener('touchstart', handler, { capture: true });
            window.removeEventListener('keydown', handleEsc, { capture: true });
        };
    }, [open]);

    return (
        <div ref={ref} className="relative">
            {/* Button */}
            <button
                onClick={toggle}
                className={`flex items-center gap-1 font-medium text-[18px] hover:text-main border-b-2 border-transparent hover:border-main transition-all duration-300
                ${isHome ? 'text-white' : 'text-blackq'}`}
            >
                {label}
                <ChevronDown
                    className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    size={18}
                />
            </button>

            {/* Main Dropdown */}
            {open && (
                <div className="absolute top-full mt-3 w-64 bg-white shadow-2xl rounded-xl flex flex-col z-50 py-2 border border-gray-100 overflow-visible">
                    {serviceLinks?.length > 0 ? (
                        serviceLinks.map(service => (
                            <DropdownItem
                                key={service.id}
                                item={service}
                                type={type}
                                currentLocale={currentLocale}
                                onLinkClick={() => {
                                    setOpen(false);
                                    if (onLinkClick) onLinkClick();
                                }}
                            />
                        ))
                    ) : (
                        <div className="px-4 py-2 text-sm text-gray-400 italic">No items found</div>
                    )}
                </div>
            )}
        </div>
    );
}
