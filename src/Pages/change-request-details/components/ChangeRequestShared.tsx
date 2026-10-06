import { useTranslation } from 'react-i18next';
import {
    ChangeRequestHeaderFileIcon,
    ChangeRequestNextSteps,
    ChangeRequestTimelineDone,
    ChangeRequestTimelinePending,
    ChangeRequestTimelineProgress,
} from '@/assets';
import type {
    ActivityTimelineProps,
    ChangeRequestHeaderProps,
    NextStepsCardProps,
    RequestOverviewProps,
} from '../../../../utils/types/change-request-details.types';

export type { TimelineItem } from '../../../../utils/types/change-request-details.types';

export function ChangeRequestHeader({
    requestId,
    projectLabel,
    projectName,
    typeLabel,
    typeName,
    title,
    currentStatus,
    status,
    statusColor,
    statusBackground,
}: ChangeRequestHeaderProps) {
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    return (
        <section className={`flex w-full flex-col justify-between gap-5 rounded-[20px] border border-[#E8EAEF] bg-white p-4 sm:p-5 md:min-h-[117px] md:p-6 3xl:min-h-[140px] 3xl:gap-6 3xl:p-8 4xl:min-h-[160px] 4xl:p-10 ${isArabic ? 'md:flex-row-reverse' : 'md:flex-row'} md:items-center`}>
            <div className={`flex min-w-0 items-start gap-3 sm:gap-4 md:items-center 3xl:gap-5 4xl:gap-6 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0EFFF] sm:h-12 sm:w-12 3xl:h-14 3xl:w-14 4xl:h-16 4xl:w-16">
                    <ChangeRequestHeaderFileIcon className="h-6 w-6 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8" />
                </div>

                <div className={`min-w-0 flex-1 ${isArabic ? 'text-right' : 'text-left'}`}>
                    <div className={`flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 font-['Sora'] text-[11px] leading-[150%] text-[#64748B] sm:text-[12px] md:text-[13px] 3xl:gap-3 3xl:text-[14px] 4xl:text-[15px] ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                        <span className="shrink-0 font-semibold text-[#4F46E5]">
                            {requestId}
                        </span>

                        <span className="shrink-0">•</span>

                        <span className="min-w-0 break-words">
                            {projectLabel}:{' '}
                            <strong className="font-semibold">
                                {projectName}
                            </strong>
                        </span>

                        <span className="shrink-0">•</span>

                        <span className="min-w-0 break-words">
                            {typeLabel}:{' '}
                            <strong className="font-semibold">
                                {typeName}
                            </strong>
                        </span>
                    </div>

                    <h1 className="mt-2 break-words font-['Sora'] text-[20px] font-semibold leading-[125%] text-[#1E293B] sm:text-[22px] 3xl:mt-3 3xl:text-[26px] 4xl:text-[30px]">
                        {title}
                    </h1>
                </div>
            </div>

            <div
                className={`flex min-h-[73px] w-full shrink-0 flex-col justify-center gap-2 rounded-xl border border-[#E2E8F0] px-4 py-3 md:w-[200px] md:py-0 3xl:min-h-[84px] 3xl:w-[240px] 3xl:px-5 4xl:min-h-[96px] 4xl:w-[280px] 4xl:px-6 ${isArabic ? 'text-right' : 'text-left'}`}
                style={{ backgroundColor: statusBackground }}
            >
                <span className="font-['Sora'] text-[12px] font-normal leading-none text-[#64748B] 3xl:text-[13px] 4xl:text-[14px]">
                    {currentStatus}
                </span>

                <div className={`flex items-center gap-2 3xl:gap-2.5 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span
                        className="h-2 w-2 shrink-0 rounded-full 3xl:h-2.5 3xl:w-2.5"
                        style={{ backgroundColor: statusColor }}
                    />

                    <span
                        className="font-['Sora'] text-[13px] font-semibold leading-none 3xl:text-[14px] 4xl:text-[15px]"
                        style={{ color: statusColor }}
                    >
                        {status}
                    </span>
                </div>
            </div>
        </section>
    );
}

export function RequestOverview({ title, rows }: RequestOverviewProps) {
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    return (
        <section className={`rounded-[20px] border border-[#E8EAEF] bg-white p-4 sm:p-5 md:min-h-[232px] md:p-6 3xl:min-h-[270px] 3xl:p-8 4xl:min-h-[310px] 4xl:p-10 ${isArabic ? 'text-right' : 'text-left'}`}>
            <h2 className="mb-5 font-['Sora'] text-[16px] font-semibold leading-none text-[#12115C] 3xl:mb-6 3xl:text-[18px] 4xl:mb-7 4xl:text-[20px]">
                {title}
            </h2>

            <div className="space-y-4 3xl:space-y-5 4xl:space-y-6">
                {rows.map(row => (
                    <div
                        key={row.label}
                        className={`flex min-w-0 items-start justify-between gap-4 font-['Sora'] text-[12px] leading-none 3xl:text-[13px] 4xl:text-[14px] ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        <span className="shrink-0 font-normal text-[#94A3B8]">
                            {row.label}
                        </span>

                        <span className={`min-w-0 break-words font-semibold text-[#1E293B] ${isArabic ? 'text-left' : 'text-right'} ${row.valueClassName ?? ''}`}>
                            {row.value}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function NextStepsCard({ title, description }: NextStepsCardProps) {
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    return (
        <section className={`relative min-h-[239px] rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 md:p-6 3xl:min-h-[270px] 3xl:p-8 4xl:min-h-[310px] 4xl:p-10 ${isArabic ? 'text-right' : 'text-left'}`}>
            <h2 className="font-['Sora'] text-[16px] font-semibold leading-none text-[#1E293B] 3xl:text-[18px] 4xl:text-[20px]">
                {title}
            </h2>

            <p className={`mt-4 max-w-[245px] break-words font-['Sora'] text-[13px] font-normal leading-[150%] text-[#64748B] 3xl:mt-5 3xl:max-w-[320px] 3xl:text-[14px] 4xl:max-w-[390px] 4xl:text-[16px] ${isArabic ? 'ml-auto' : ''}`}>
                {description}
            </p>

            <ChangeRequestNextSteps className={`absolute bottom-3 h-auto w-[120px] sm:w-[132px] 3xl:bottom-5 3xl:w-[155px] 4xl:bottom-6 4xl:w-[185px] ${isArabic ? 'left-3 3xl:left-5 4xl:left-6' : 'right-3 3xl:right-5 4xl:right-6'}`} />
        </section>
    );
}

export function ActivityTimeline({ title, items }: ActivityTimelineProps) {
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    const statusIcons = {
        completed: ChangeRequestTimelineDone,
        progress: ChangeRequestTimelineProgress,
        pending: ChangeRequestTimelinePending,
    };

    return (
        <section className={`rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 md:min-h-[303px] md:p-6 3xl:min-h-[350px] 3xl:p-8 4xl:min-h-[400px] 4xl:p-10 ${isArabic ? 'text-right' : 'text-left'}`}>
            <h2 className="mb-5 font-['Sora'] text-[18px] font-semibold leading-none text-[#1E293B] 3xl:mb-6 3xl:text-[20px] 4xl:mb-8 4xl:text-[22px]">
                {title}
            </h2>

            <div className="flex flex-col gap-5 3xl:gap-6 4xl:gap-7">
                {items.map((item, index) => {
                    const StatusIcon = statusIcons[item.status];

                    return (
                        <div
                            key={`${item.title}-${index}`}
                            className={`flex min-w-0 items-start gap-3 sm:gap-4 3xl:gap-5 4xl:gap-6 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            <StatusIcon className="mt-0.5 h-6 w-6 shrink-0 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8" />

                            <div className={`flex min-w-0 flex-1 flex-col gap-2 md:justify-between ${isArabic ? 'md:flex-row-reverse' : 'md:flex-row'} md:items-start`}>
                                <div className={`min-w-0 flex-1 ${isArabic ? 'text-right' : 'text-left'}`}>
                                    <h3 className="break-words font-['Sora'] text-[14px] font-semibold leading-[130%] text-[#1E293B] 3xl:text-[15px] 4xl:text-[17px]">
                                        {item.title}
                                    </h3>

                                    <div className="mt-1 break-words font-['Sora'] text-[13px] font-normal leading-[150%] text-[#64748B] 3xl:text-[14px] 4xl:text-[15px]">
                                        {item.description}
                                    </div>
                                </div>

                                <span className={`shrink-0 font-['Sora'] text-[12px] font-normal leading-[140%] text-[#94A3B8] 3xl:text-[13px] 4xl:text-[14px] ${isArabic ? 'text-right' : 'text-left'}`}>
                                    {item.meta}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
