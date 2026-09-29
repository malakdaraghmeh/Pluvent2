import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download } from 'lucide-react';
import Img from '@icons/image.svg?react';
import File from '@icons/file-text.svg?react';
import Img88 from '@icons/image 88.svg?react';
import Green from '@icons/check_circle.svg?react';
import Yellow from '@icons/Vector (1).svg?react';
import Gray from '@icons/Vector (2).svg?react';

export default function ChangeRequestDetails() {
    const { t } = useTranslation('changeRequestDetails');

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6 font-sans text-slate-800">
            {/* Top Banner Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-[#4F46E51A] text-indigo-600">
                        <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500 font-medium">
                            <span className="font-bold text-[#4F46E5]">{t('crId')}</span>
                            <span>•</span>
                            <span className="truncate">
                                {t('projectLabel')}:{' '}
                                <strong className="text-[#64748B]">{t('projectName')}</strong>
                            </span>
                            <span className="hidden xs:inline">•</span>
                            <span>
                                {t('typeLabel')}:{' '}
                                <strong className="text-[#64748B]">{t('typeName')}</strong>
                            </span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 break-words">
                            {t('title')}
                        </h1>
                    </div>
                </div>

                {/* Current Status Box */}
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 shrink-0 w-full md:w-auto min-w-[140px] flex md:block items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium block">
                        {t('currentStatus')}
                    </span>
                    <div className="flex items-center gap-2 mt-0 md:mt-1">
                        <span className="h-2 w-2 rounded-full bg-[#12115C]"></span>
                        <span className="text-sm font-bold text-[#0F172A]">
                            {t('statusInReview')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Grid Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Left Column - Details */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 space-y-5 sm:space-y-6">
                    <h2
                        className="text-slate-900 text-base sm:text-lg font-semibold"
                        style={{
                            fontFamily: 'Sora, sans-serif',
                            lineHeight: '120%',
                        }}
                    >
                        {t('sectionTitle')}
                    </h2>

                    {/* User & Date Banner */}
                    <div className="border border-slate-100 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-center gap-3">
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                                alt={t('requesterName')}
                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                            />
                            <div className="min-w-0">
                                <span className="font-normal text-[12px] sm:text-[13px] leading-none tracking-normal text-[#94A3B8] block">
                                    {t('requestedBy')}
                                </span>
                                <span className="text-sm font-bold text-slate-900 truncate block">
                                    {t('requesterName')}
                                </span>
                                <p className="text-xs text-[#64748B] mt-0.5 truncate">
                                    {t('requesterRole')}
                                </p>
                            </div>
                        </div>

                        <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex sm:block justify-between items-center">
                            <span className="text-xs text-slate-400 block font-medium">
                                {t('requestedOn')}
                            </span>
                            <div>
                                <span className="text-sm font-bold text-slate-900 block">
                                    {t('requestDate')}
                                </span>
                                <p className="text-xs text-slate-400 mt-0.5 inline sm:block">
                                    {t('requestTime')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-xs sm:text-sm font-bold text-[#64748B] tracking-wider mb-2 uppercase">
                            {t('descriptionLabel')}
                        </h3>
                        <p className="text-sm sm:text-base text-[#334155] leading-relaxed break-words">
                            {t('descriptionText')}
                        </p>
                    </div>

                    {/* Attachments */}
                    <div>
                        <h3 className="text-xs sm:text-sm font-bold text-[#64748B] tracking-wider mb-3 uppercase">
                            {t('attachmentsLabel', { count: 2 })}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {/* Attachment 1 */}
                            <div className="flex items-center justify-between p-3 sm:p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:border-slate-200 transition group cursor-pointer">
                                <div className="flex items-center gap-3 min-w-0 pr-2">
                                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-[#EF444415] text-[#EF444415]">
                                        <File className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-bold text-slate-800 truncate">
                                            Blog_Listing_Wireframe.pdf
                                        </p>
                                        <span className="text-[11px] text-slate-400">1.2 MB</span>
                                    </div>
                                </div>
                                <button
                                    aria-label={t('downloadFile', {
                                        fileName: 'Blog_Listing_Wireframe.pdf',
                                    })}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 transition shrink-0"
                                >
                                    <Download className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Attachment 2 */}
                            <div className="flex items-center justify-between p-3 sm:p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:border-slate-200 transition group cursor-pointer">
                                <div className="flex items-center gap-3 min-w-0 pr-2">
                                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#3B82F615]">
                                        <Img className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-bold text-slate-800 truncate">
                                            Blog_Page_Reference.png
                                        </p>
                                        <span className="text-[11px] text-slate-400">1.8 MB</span>
                                    </div>
                                </div>
                                <button
                                    aria-label={t('downloadFile', {
                                        fileName: 'Blog_Page_Reference.png',
                                    })}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 transition shrink-0"
                                >
                                    <Download className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Overview & What Happens Next */}
                <div className="space-y-4 sm:space-y-6">
                    {/* Request Overview Card */}
                    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-[#E2E8F0]">
                        <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-4">
                            {t('overviewTitle')}
                        </h2>

                        <div className="space-y-3 text-xs sm:text-sm">
                            <div className="flex justify-between items-center gap-2">
                                <span className="text-slate-400 shrink-0">
                                    {t('requestIdLabel')}
                                </span>
                                <span className="font-bold text-slate-900 truncate">
                                    {t('crId')}
                                </span>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <span className="text-slate-400 shrink-0">
                                    {t('currentStatus')}
                                </span>
                                <span className="font-bold text-indigo-600 truncate">
                                    {t('statusInReview')}
                                </span>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <span className="text-slate-400 shrink-0">{t('requestedOn')}</span>
                                <span className="font-bold text-slate-900 truncate">
                                    {t('requestDate')}
                                </span>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <span className="text-slate-400 shrink-0">
                                    {t('lastUpdatedLabel')}
                                </span>
                                <span className="font-bold text-slate-900 truncate">
                                    {t('requestDate')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* What Happens Next Card */}
                    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 relative overflow-hidden flex flex-col justify-between gap-4">
                        <div>
                            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                                {t('nextTitle')}
                            </h2>
                            <p className="text-xs text-slate-500 leading-relaxed sm:pr-12">
                                {t('nextDescription')}
                            </p>
                        </div>
                        <div className="flex flex-row items-end justify-end shrink-0">
                            <Img88 className="max-w-[100px] h-auto sm:max-w-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Timeline Section */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-4 sm:mb-6">
                    {t('timelineTitle')}
                </h2>

                <div className="relative space-y-6">
                    {/* Timeline Item 1: Completed */}
                    <div className="relative flex items-start gap-3 sm:gap-4">
                        <div
                            className="p-1.5 sm:p-2 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                            style={{ background: 'var(--bg-icon-2, #00E5C810)' }}
                        >
                            <Green />
                        </div>
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1 min-w-0">
                            <div>
                                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                                    {t('step1Title')}
                                </h3>
                                <p
                                    className="text-xs text-slate-500 mt-0.5 break-words"
                                    dangerouslySetInnerHTML={{ __html: t('step1Desc') }}
                                />
                            </div>
                            <span className="text-[11px] sm:text-xs text-slate-400 shrink-0 font-medium mt-1 sm:mt-0">
                                {t('step1Time')}
                            </span>
                        </div>
                    </div>

                    {/* Timeline Item 2: In Progress */}
                    <div className="relative flex items-start gap-3 sm:gap-4">
                        <div
                            className="p-1.5 sm:p-2 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                            style={{ background: 'var(--bg-icon-2, #00E5C810)' }}
                        >
                            <Yellow />
                        </div>
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1 min-w-0">
                            <div>
                                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                                    {t('step2Title')}
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5 break-words">
                                    {t('step2Desc')}
                                </p>
                            </div>
                            <span className="text-[11px] sm:text-xs text-slate-400 shrink-0 font-medium mt-1 sm:mt-0">
                                {t('step2Status')}
                            </span>
                        </div>
                    </div>

                    {/* Timeline Item 3: Pending */}
                    <div className="relative flex items-start gap-3 sm:gap-4">
                        <div
                            className="p-1.5 sm:p-2 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                            style={{ background: 'var(--bg-icon-2, #B1B4B61A)' }}
                        >
                            <Gray />
                        </div>
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1 min-w-0">
                            <div>
                                <h3 className="text-xs sm:text-sm font-bold text-slate-700">
                                    {t('step3Title')}
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5 break-words">
                                    {t('step3Desc')}
                                </p>
                            </div>
                            <span className="text-[11px] sm:text-xs text-slate-400 shrink-0 font-medium mt-1 sm:mt-0">
                                {t('step3Status')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
