/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectTopSection from './components/ProjectTopSection';
import ProjectSupportSection from './components/ProjectSupportSection';

export default function ProjectDetails() {
    const { i18n } = useTranslation('projectDetailsTranslations');

    const currentLang = i18n.language || 'en';
    const isRtl = i18n.dir ? i18n.dir() === 'rtl' : currentLang === 'ar';

    return (
        <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="min-h-screen bg-[#f3f6fb] p-4 sm:p-6 lg:p-10  text-slate-800 flex justify-center items-center"
        >
            <div className="w-full max-w-6xl space-y-6">
                <ProjectTopSection />
                <ProjectSupportSection />
            </div>
        </div>
    );
}
