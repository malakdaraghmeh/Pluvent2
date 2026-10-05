import { useTranslation } from 'react-i18next';

import { SupportTicketFilterArrowIcon } from '@/assets';

import type {
    FilterDropdownProps,
    SupportTicketFilter,
} from '../../../utils/types/support-tickets.types';

const FilterDropdown = ({ value, onChange }: FilterDropdownProps) => {
    const { t, i18n } = useTranslation('tickets');
    const isArabic = i18n.language.startsWith('ar');

    return (
        <div className="w-full">
            <div className="relative w-full">
                <select
                    value={value}
                    onChange={event => onChange(event.target.value as SupportTicketFilter)}
                    className={`h-[54px] w-full cursor-pointer appearance-none rounded-[12px] border-0 bg-[#F4F6FA] text-[14px] font-normal leading-none text-[#0F172A] outline-none ${
                        isArabic ? 'pl-11 pr-[14px] text-right' : 'pl-[14px] pr-11 text-left'
                    }`}
                >
                    <option value="all">{t('filter.all')}</option>
                    <option value="project">{t('filter.project')}</option>
                    <option value="general">{t('filter.general')}</option>
                </select>

                <SupportTicketFilterArrowIcon
                    className={`pointer-events-none absolute top-1/2 h-[14px] w-[14px] -translate-y-1/2 ${
                        isArabic ? 'left-[14px] rotate-90' : 'right-[14px] -rotate-90'
                    }`}
                />
            </div>
        </div>
    );
};

export default FilterDropdown;
