import { useEffect, useRef, useState } from 'react';

import { DownArrow } from '@/assets';
import type { CardExpirySelectProps } from '../../../utils/types/payment-method-modal.types';

const CardExpirySelect = ({
    id,
    value,
    placeholder,
    options,
    isArabic,
    onChange,
}: CardExpirySelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleOutsideClick = (event: PointerEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('pointerdown', handleOutsideClick);

        return () => {
            document.removeEventListener('pointerdown', handleOutsideClick);
        };
    }, [isOpen]);

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="relative w-full">
            <button
                id={id}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(current => !current)}
                className={`flex h-[54px] w-full items-center gap-2 rounded-[8px] bg-[#F4F6FA] px-[14px] text-[14px] font-normal outline-none ${
                    isArabic ? 'flex-row-reverse text-right' : 'text-left'
                }`}
            >
                <span className={`min-w-0 flex-1 ${value ? 'text-[#888282]' : 'text-[#A0A5AF]'}`}>
                    {value || placeholder}
                </span>

                <DownArrow
                    aria-hidden="true"
                    className={`shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {isOpen && (
                <div
                    role="listbox"
                    className="absolute left-0 right-0 top-[60px] z-[100] max-h-[128px] overflow-x-hidden overflow-y-auto rounded-[8px] border border-[#DFE3E5] bg-white py-1 shadow-[0_8px_24px_rgba(18,17,92,0.12)] [scrollbar-width:thin]"
                >
                    {options.map(option => (
                        <button
                            key={option}
                            type="button"
                            role="option"
                            aria-selected={value === option}
                            onClick={() => handleSelect(option)}
                            className={`flex h-[40px] w-full shrink-0 items-center px-[14px] text-[14px] hover:bg-[#F4F6FA] ${
                                isArabic ? 'justify-end text-right' : 'justify-start text-left'
                            } ${
                                value === option
                                    ? 'bg-[#F8F8FF] font-medium text-[#12115C]'
                                    : 'text-[#888282]'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CardExpirySelect;
