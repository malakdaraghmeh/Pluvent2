import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, X, ShieldCheck, Smartphone, ChevronRight } from 'lucide-react';
import Palette from '@icons/pencil-ruler.svg?react';
import Info from '@icons/info.svg?react';

export default function SelectProjectModal() {
    const { t, i18n } = useTranslation('SelectProject');
    const [searchQuery, setSearchQuery] = useState('');
    const isArabic = i18n.language.startsWith('ar');
    const textAlign = isArabic ? 'text-right' : 'text-left';

    const [isOpen, setIsOpen] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    if (!isOpen) {
        return (
            <div
                className={`flex h-screen w-full items-center justify-center bg-gray-100 p-4 ${
                    isArabic ? 'rtl' : 'ltr'
                }`}
                dir={isArabic ? 'rtl' : 'ltr'}
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="rounded-xl bg-[#0F1438] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-900"
                >
                    {t('openProjectSelectionModal', 'Open Project Selection Modal')}
                </button>
            </div>
        );
    }

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 font-sans ${
                isArabic ? 'rtl' : 'ltr'
            }`}
            dir={isArabic ? 'rtl' : 'ltr'}
        >
            {/* Modal Container */}
            <div className="relative w-full max-w-[620px] rounded-[32px] bg-white p-8 shadow-2xl transition-all">
                {/* Top Navigation / Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => console.log('Back clicked')}
                        className={`flex items-center gap-2 text-[15px] font-semibold text-[#12115C] transition hover:opacity-80 ${
                            isArabic ? 'flex-row-reverse' : ''
                        }`}
                    >
                        <ArrowLeft
                            className={`h-4 w-4 stroke-[2.5] ${isArabic ? 'rotate-180' : ''}`}
                        />
                        {t('back', 'Back')}
                    </button>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#12115C] text-white transition hover:bg-slate-800"
                    >
                        <X className="h-5 w-5 stroke-[2.5]" />
                    </button>
                </div>

                {/* Modal Title & Subtitle */}
                <div className={`mt-6 mb-6 ${textAlign}`}>
                    <h2 className="text-[26px] font-bold text-[#12115C] tracking-tight">
                        {t('whichProjectDoYouNeedHelpWith', 'Which project do you need help with?')}
                    </h2>
                    <p className="mt-1 text-[15px] text-gray-500 font-normal">
                        {t(
                            'selectAProjectToContinue',
                            'Select a project to continue with your request.'
                        )}
                    </p>
                </div>

                {/* Project Options List */}
                <div className="space-y-4">
                    {/* Card 1: Brand Identity & Visual Design */}
                    <div
                        onClick={() => setSelectedProject('brand')}
                        className={`group relative flex cursor-pointer items-start justify-between rounded-2xl border p-5 transition-all ${
                            selectedProject === 'brand'
                                ? 'border-emerald-500 bg-emerald-50/10 ring-2 ring-emerald-500/20'
                                : 'border-gray-200/80 hover:border-gray-300 hover:shadow-sm'
                        }`}
                    >
                        {/* Stable LTR Flex Order for Content Block */}
                        <div className="flex items-center gap-4 text-left">
                            {/* Icon Container */}
                            <div className="flex h-13 w-13 shrink-0 items-center justify-center p-2 rounded-lg bg-[#39E1D7] text-white shadow-sm">
                                <Palette />
                            </div>

                            {/* Text Info */}
                            <div className={textAlign}>
                                <h3 className="text-[17px] font-bold text-[#0F1438]">
                                    {t(
                                        'brandIdentityVisualDesign',
                                        'Brand Identity & Visual Design'
                                    )}
                                </h3>
                                <p className="mt-0.5 text-[14px] text-gray-400 font-normal">
                                    {t('designDigitalExperience', 'Design & Digital Experience')}
                                </p>

                                {/* Active Warranty Badge */}
                                <div
                                    className={`mt-1 flex items-center gap-1.5 text-[13.5px] font-medium text-[#10B981] ${
                                        isArabic ? 'flex-row-reverse' : ''
                                    }`}
                                >
                                    <ShieldCheck className="h-4 w-4 stroke-[2.5]" />
                                    <span>
                                        {t('warrantyActive', 'Warranty Active')}{' '}
                                        <span className="mx-0.5">•</span> 315{' '}
                                        {t('daysLeft', 'Days Left')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Completed Tag */}
                        <span className="rounded-md bg-[#34C7590D] px-3 py-1 text-[13px] font-medium text-[#34C759]">
                            {t('completed', 'Completed')}
                        </span>
                    </div>

                    {/* Card 2: Mobile Application */}
                    <div
                        onClick={() => setSelectedProject('mobile')}
                        className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all sm:flex-row sm:items-center ${
                            selectedProject === 'mobile'
                                ? 'border-indigo-500 bg-indigo-50/10 ring-2 ring-indigo-500/20'
                                : 'border-gray-200/80 hover:border-gray-300 hover:shadow-sm'
                        }`}
                    >
                        {/* Stable LTR Flex Order for Content Block */}
                        <div className="flex items-center gap-4 text-left">
                            {/* Icon Container */}
                            <div className="flex h-13 w-13 shrink-0 items-center justify-center p-2 rounded-lg bg-[#13192B] text-white shadow-sm">
                                <Smartphone className="h-6 w-6 stroke-[2]" />
                            </div>

                            {/* Text Info */}
                            <div className={textAlign}>
                                <h3 className="text-[17px] font-bold text-[#0F1438]">
                                    {t('mobileApplication', 'Mobile Application')}
                                </h3>

                                <p className="mt-0.5 text-[14px] text-gray-400 font-normal">
                                    {t('development', 'Development')}
                                </p>

                                {/* Expired Warranty Tag */}
                                <div
                                    className={`mt-1 text-[13.5px] font-medium text-[#EF4444] ${
                                        isArabic ? 'flex-row-reverse' : ''
                                    }`}
                                >
                                    {t('warrantyExpired', 'Warranty Expired')}{' '}
                                    <span className="mx-0.5 text-gray-400">•</span>{' '}
                                    {t('supportUnavailable', 'Support Unavailable')}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Completed Tag + CTA Link */}
                        <div className="mt-4 flex flex-col items-start justify-center gap-3 sm:mt-0 sm:items-center">
                            <span className="rounded-md bg-[#F7F6F7] px-3 py-1 text-[13px] font-medium text-[#6B7280]">
                                {t('completed', 'Completed')}
                            </span>

                            {/* Explore Warranty Link */}
                            <button
                                onClick={e => {
                                    e.stopPropagation();
                                    alert(
                                        t(
                                            'navigatingToPaidWarrantyPlans',
                                            'Navigating to Paid Warranty Plans...'
                                        )
                                    );
                                }}
                                className={`group/btn flex items-center gap-1 text-[14px] font-bold text-[#FF3B30] hover:underline ${
                                    isArabic ? 'flex-row-reverse' : ''
                                }`}
                            >
                                {t('explorePaidWarrantyPlans', 'Explore Paid Warranty Plans')}
                                <ChevronRight
                                    className={`h-4 w-4 stroke-[3] transition-transform group-hover/btn:translate-x-0.5 ${
                                        isArabic
                                            ? 'rotate-180 group-hover/btn:-translate-x-0.5'
                                            : ''
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Info Box */}
                <div
                    className={`mt-6 flex items-center gap-3 rounded-2xl bg-[#00E5C810] p-4 text-[14px] text-[#12115C] ${
                        isArabic ? 'flex-row-reverse' : ''
                    }`}
                >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center text-white">
                        <Info />
                    </div>
                    <p className={`font-medium ${textAlign}`}>
                        {t('cantFindYourProject', "Can't find your project?")}{' '}
                        <button
                            onClick={() =>
                                alert(
                                    t(
                                        'creatingGeneralInquiryTicket',
                                        'Creating General Inquiry Ticket...'
                                    )
                                )
                            }
                            className="font-bold text-[#3634C7] hover:underline"
                        >
                            {t('createAGeneralInquiryTicket', 'Create a General Inquiry ticket.')}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
