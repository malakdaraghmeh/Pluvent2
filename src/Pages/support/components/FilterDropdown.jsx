import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FilterDropdown({ value, onChange }) {
    const { t, i18n } = useTranslation('tickets');
    const isRtl = i18n.language === 'ar';

    return (
        <div className="mb-4 sm:mb-6 max-w-full">
            <div className="relative">
                <select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className={`w-full bg-[#F4F6FA] border border-slate-100 rounded-xl py-3 text-[#111827] appearance-none outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer font-normal text-[14px] leading-none tracking-normal [leading-trim:none] ${
                        isRtl ? 'pr-4 pl-10' : 'pl-4 pr-10'
                    }`}
                >
                    <option value="all">{t('filter.all')}</option>
                    <option value="project">{t('filter.project')}</option>
                    <option value="general">{t('filter.general')}</option>
                </select>
                <ChevronDown
                    size={18}
                    className={`absolute top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none ${
                        isRtl ? 'left-4' : 'right-4'
                    }`}
                />
            </div>
        </div>
    );
}
