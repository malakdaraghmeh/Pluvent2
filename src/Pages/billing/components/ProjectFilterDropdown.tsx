import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DownArrow } from '@/assets';

import type { ProjectFilterDropdownProps } from '../../../../utils/types/billing.types';

const ProjectFilterDropdown = ({
    value,
    projects,
    allProjectsLabel,
    onChange,
}: ProjectFilterDropdownProps) => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel =
        value === 'all' ? allProjectsLabel : projects.find(project => project === value) ?? allProjectsLabel;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleSelect = (project: string) => {
        onChange(project);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative w-full sm:w-[139px] sm:shrink-0">
            <button
                type="button"
                onClick={() => setIsOpen(current => !current)}
                aria-expanded={isOpen}
                className={`flex h-[38px] w-full items-center justify-between gap-2 rounded-[12px] border border-[#ECEFF4] bg-white px-4 text-[14px] font-semibold text-[#12115C] transition-colors hover:border-[#D7DAE3] ${
                    isArabic ? 'text-right' : 'text-left'
                }`}
            >
                <span className="min-w-0 flex-1 truncate">{selectedLabel}</span>

                <span
                    className={`flex shrink-0 items-center transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                >
                    <DownArrow />
                </span>
            </button>

            {isOpen && (
                <div
                    className={`absolute top-[calc(100%+8px)] z-50 min-w-[240px] overflow-hidden rounded-[12px] border border-[#ECEFF4] bg-white py-1.5 shadow-[0_8px_24px_rgba(18,17,92,0.10)] ${
                        isArabic ? 'left-0' : 'right-0'
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => handleSelect('all')}
                        className={`flex min-h-[42px] w-full items-center px-4 text-[14px] transition-colors hover:bg-[#F6F7FB] ${
                            value === 'all'
                                ? 'bg-[#F4F3FF] font-semibold text-[#12115C]'
                                : 'text-[#33334F]'
                        } ${isArabic ? 'text-right' : 'text-left'}`}
                    >
                        {allProjectsLabel}
                    </button>

                    {projects.map(project => (
                        <button
                            key={project}
                            type="button"
                            onClick={() => handleSelect(project)}
                            className={`flex min-h-[42px] w-full items-center whitespace-nowrap px-4 text-[14px] transition-colors hover:bg-[#F6F7FB] ${
                                value === project
                                    ? 'bg-[#F4F3FF] font-semibold text-[#12115C]'
                                    : 'text-[#33334F]'
                            } ${isArabic ? 'text-right' : 'text-left'}`}
                        >
                            {project}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectFilterDropdown;