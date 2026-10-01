/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import PulvetPro from '@icons/rafiki.svg?react';
import CheckCircle from '@icons/checkmark-container.svg?react';
import UnderWarranty from '@icons/underWarranty.svg?react';

export default function ProjectSupportSection() {
    const { t } = useTranslation('projectDetailsTranslations');

    const supportOptions = t('supportOptions', {
        returnObjects: true,
        defaultValue: [
            'Warranty or implementation requests',
            'Technical issues',
            'Feature enhancements',
            'Any other project-related inquiries',
        ],
    }) as string[];

    return (
        <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-slate-100">
            <h2 className="text-lg sm:text-xl font-bold text-[#1e1b4b] mb-6">
                {t('supportTicketTitle', 'Support Ticket')}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left Graphic / Mascot Box (4 Cols) */}
                <div className="lg:col-span-4 flex items-center justify-center w-full overflow-hidden rounded-xl">
                    <PulvetPro className="w-full h-auto max-w-full" />
                </div>

                {/* Middle List Options (4 Cols) */}
                <div className="lg:col-span-4 flex flex-col justify-center px-1 sm:px-2 py-2">
                    <h3 className="text-sm sm:text-base font-bold text-[#1e1b4b] mb-1">
                        {t('notSureTitle', 'Not sure what your issue is?')}
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                        {t('notSureSubtitle', 'You can create a support ticket for:')}
                    </p>

                    <ul className="space-y-3">
                        {supportOptions.map((item, idx) => (
                            <li
                                key={idx}
                                className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700"
                            >
                                <CheckCircle className="shrink-0 w-5 h-5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Action Box (4 Cols) */}
                <div className="lg:col-span-4 flex items-center justify-center w-full overflow-hidden rounded-2xl">
                    <UnderWarranty className="w-full h-auto max-w-full" />
                </div>
            </div>
        </div>
    );
}
