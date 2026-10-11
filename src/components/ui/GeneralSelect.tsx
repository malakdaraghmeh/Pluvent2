import { useEffect, useRef, useState } from 'react';
import { DownArrow } from '@/assets';
import type { GeneralSelectProps } from '../../../utils/types/general-select.types';

const GeneralSelect = ({
    id,
    value,
    placeholder,
    options,
    isArabic = false,
    onChange,
    className = '',
}: GeneralSelectProps) => {
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

    const selectedOption = options.find(option => option.value === value);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className={`relative w-full ${className}`}>
            <button
                id={id}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(current => !current)}
                className={`flex h-[54px] w-full min-w-0 items-center gap-2 rounded-[8px] bg-[#F4F6FA] px-[14px] text-[14px] font-normal outline-none ${
                    isArabic ? 'flex-row-reverse text-right' : 'flex-row text-left'
                }`}
            >
                <span
                    className={`min-w-0 flex-1 truncate ${
                        value ? 'text-[#888282]' : 'text-[#A0A5AF]'
                    }`}
                >
                    {selectedOption?.label || placeholder}
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
                    className="absolute left-0 right-0 top-[58px] z-[100] max-h-[72px] overflow-x-hidden overflow-y-auto rounded-[8px] border border-[#DFE3E5] bg-white py-0.5 shadow-[0_8px_24px_rgba(18,17,92,0.12)] [scrollbar-color:#D1D5DB_transparent] [scrollbar-width:thin]"
                >
                    {options.map(option => (
                        <button
                            key={option.value}
                            type="button"
                            role="option"
                            aria-selected={value === option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`flex h-[34px] w-full shrink-0 items-center px-[14px] text-[13px] hover:bg-[#F4F6FA] ${
                                isArabic ? 'justify-end text-right' : 'justify-start text-left'
                            } ${
                                value === option.value
                                    ? 'bg-[#F8F8FF] font-medium text-[#12115C]'
                                    : 'text-[#888282]'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GeneralSelect;
