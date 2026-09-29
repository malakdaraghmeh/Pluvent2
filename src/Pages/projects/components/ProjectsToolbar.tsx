import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, Search } from '@/assets';
import type { ProjectFilter, ProjectsToolbarProps } from '../../../../utils/types/projects.types';

const filterOptions: ProjectFilter[] = ['all', 'inProgress', 'completed'];

const ProjectsToolbar = ({
    searchValue,
    filter,
    onSearchChange,
    onFilterChange,
}: ProjectsToolbarProps) => {
    const { t } = useTranslation('projectsPage');
    const [isOpen, setIsOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFilterChange = (value: ProjectFilter) => {
        onFilterChange(value);
        setIsOpen(false);
    };

    return (
        <div className="flex w-full min-w-0 items-center gap-[10px]">
            <div className="flex min-h-[50px] min-w-0 flex-1 items-center gap-[10px] rounded-[20px] border-[0.5px] border-[#D9D9D9] bg-white px-[14px] py-[13px]">
                <Search className="h-5 w-5 shrink-0" />

                <input
                    type="text"
                    value={searchValue}
                    onChange={event => onSearchChange(event.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full min-w-0 bg-transparent text-start text-[14px] text-[#888282] outline-none placeholder:text-[#888282]"
                />
            </div>

            <div ref={filterRef} className="relative shrink-0">
                <button
                    type="button"
                    aria-label={t('filter.label')}
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(prev => !prev)}
                    className={`flex h-[50px] w-[56px] items-center justify-center rounded-[16px] border-[0.5px] bg-white ${
                        filter === 'all' ? 'border-[#D9D9D9]' : 'border-[#3634C7]'
                    }`}
                >
                    <Filter className="h-6 w-6" />
                </button>

                {isOpen && (
                    <div className="absolute end-0 top-[calc(100%+8px)] z-40 w-[190px] rounded-[16px] border border-[#E7E8EC] bg-white p-2 shadow-[0_8px_30px_rgba(15,23,42,0.12)]">
                        {filterOptions.map(option => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => handleFilterChange(option)}
                                className={`w-full rounded-[10px] px-3 py-2.5 text-start text-[13px] transition-colors ${
                                    filter === option
                                        ? 'bg-[#F2F2FF] font-semibold text-[#3634C7]'
                                        : 'text-[#475569] hover:bg-[#F8FAFC]'
                                }`}
                            >
                                {t(`filter.${option}`)}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsToolbar;
