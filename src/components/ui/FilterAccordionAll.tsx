'use client';
import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';

export default function FilterAccordionAll({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (window.innerWidth >= 1024) {
            setIsOpen(true);
        }
    }, []);

    const toggle = () => setIsOpen(!isOpen);

    if (!mounted) return <div />;

    return (
        <div className="border-none h-fit rounded-lg mb-2">
            <button
                className="w-full h-fit flex justify-between items-center rounded-md "
                onClick={toggle}
            >
                <span className="text-lg text-main font-semibold">{title}</span>
                <Filter size={20} className="text-blackq lg:hidden block" />
            </button>

            {isOpen && (
                <div className="p-2 text-blueDark bg-white rounded-md transition-all">
                    {children}
                </div>
            )}
        </div>
    );
}
