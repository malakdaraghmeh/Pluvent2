/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flag } from 'lucide-react';
import Warrenty from '@icons/warrantyPeriod.svg?react';
import Calendar from '@icons/calender.svg?react';

export default function ProjectTopSection() {
    const { t } = useTranslation('projectDetailsTranslations');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Project Card (Left 2 cols) */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-slate-100 flex flex-col justify-between space-y-6">
                <div>
                    {/* Header & Status */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                        <h1 className="text-xl sm:text-2xl font-bold text-[#312e81]">
                            {t('projectName', 'Project Name')}
                        </h1>
                        <span className="bg-[#34C7590D] text-[#34C759] text-xs px-3 py-1 rounded-lg text-center whitespace-nowrap font-medium">
                            {t('completed', 'Completed')}
                        </span>
                    </div>

                    {/* Project Description */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {t('projectDescription', 'Qorem ipsum dolor sit amet...')}
                    </p>
                </div>

                {/* Dates Pill Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium">
                    <div className="flex items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 rounded-3xl border border-[#00E5C810] bg-[linear-gradient(146deg,#F1F1F1_0%,#FFFFFF_30.72%,#EEEBEB_100%)] text-[#3634C7] transition-colors">
                        <Calendar className="w-4 h-4 text-[#3634C7] shrink-0" />
                        <span>
                            {t('startDate', 'Start Date')} :{' '}
                            <span className="text-[#3634C7] font-normal">
                                {t('startDateValue', 'March 15, 2026')}
                            </span>
                        </span>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 rounded-3xl border border-[#00E5C810] bg-[linear-gradient(146deg,#F1F1F1_0%,#FFFFFF_30.72%,#EEEBEB_100%)] text-[#3634C7] transition-colors">
                        <Flag className="w-4 h-4 text-[#3634C7] shrink-0" />
                        <span>
                            {t('deliveryDate', 'Delivery')} :{' '}
                            <span className="text-[#3634C7] font-normal">
                                {t('deliveryDateValue', 'September 30, 2026')}
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Warranty Banner Card (Right 1 col) */}
            <div className="w-full flex items-center justify-center overflow-hidden rounded-2xl">
                <Warrenty className="w-full h-auto max-w-full" />
            </div>
        </div>
    );
}
