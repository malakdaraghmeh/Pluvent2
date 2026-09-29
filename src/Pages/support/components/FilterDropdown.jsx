import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function FilterDropdown({ value, onChange }) {
    return (
        <div className="mb-4 sm:mb-6 max-w-full">
            <div className="relative">
                <select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="w-full bg-[#F4F6FA] border border-slate-100 rounded-xl py-3 px-4 text-[#111827] appearance-none outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer font-normal text-[14px] leading-none tracking-normal [leading-trim:none]"
                >
                    <option value="all">Tickets Type all</option>
                    <option value="project">Project Tickets Only</option>
                    <option value="general">General Tickets Only</option>
                </select>
                <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none"
                />
            </div>
        </div>
    );
}
