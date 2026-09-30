import { FileText } from 'lucide-react';
import {
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
    return (
        <section className="flex min-h-[117px] w-full flex-col justify-between gap-4 rounded-[20px] border border-[#E8EAEF] bg-white p-6 md:flex-row md:items-center 3xl:min-h-[140px] 3xl:gap-6 3xl:p-8 4xl:min-h-[160px] 4xl:p-10">
            <div className="flex min-w-0 items-center gap-4 3xl:gap-5 4xl:gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0EFFF] 3xl:h-14 3xl:w-14 4xl:h-16 4xl:w-16">
                    <FileText
                        strokeWidth={1.8}
                        className="h-6 w-6 text-[#6366F1] 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8"
                    />
                </div>

                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 font-['Sora'] text-[13px] leading-none text-[#64748B] 3xl:gap-3 3xl:text-[14px] 4xl:text-[15px]">
                        <span className="font-semibold text-[#4F46E5]">{requestId}</span>
                        <span>•</span>
                        <span>
                            {projectLabel}: <strong className="font-semibold">{projectName}</strong>
                        </span>
                        <span>•</span>
                        <span>
                            {typeLabel}: <strong className="font-semibold">{typeName}</strong>
                        </span>
                    </div>

                    <h1 className="mt-2 break-words font-['Sora'] text-[22px] font-semibold leading-[120%] text-[#1E293B] 3xl:mt-3 3xl:text-[26px] 4xl:text-[30px]">
                        {title}
                    </h1>
                </div>
            </div>

            <div
                className="flex min-h-[73px] w-full shrink-0 flex-col justify-center gap-2 rounded-xl border border-[#E2E8F0] px-4 md:w-[200px] 3xl:min-h-[84px] 3xl:w-[240px] 3xl:px-5 4xl:min-h-[96px] 4xl:w-[280px] 4xl:px-6"
                style={{ backgroundColor: statusBackground }}
            >
                <span className="font-['Sora'] text-[12px] font-normal leading-none text-[#64748B] 3xl:text-[13px] 4xl:text-[14px]">
                    {currentStatus}
                </span>

                <div className="flex items-center gap-2 3xl:gap-2.5">
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
    return (
        <section className="min-h-[232px] rounded-[20px] border border-[#E8EAEF] bg-white p-6 3xl:min-h-[270px] 3xl:p-8 4xl:min-h-[310px] 4xl:p-10">
            <h2 className="mb-5 font-['Sora'] text-[16px] font-semibold leading-none text-[#12115C] 3xl:mb-6 3xl:text-[18px] 4xl:mb-7 4xl:text-[20px]">
                {title}
            </h2>

            <div className="space-y-4 3xl:space-y-5 4xl:space-y-6">
                {rows.map(row => (
                    <div
                        key={row.label}
                        className="flex min-w-0 items-start justify-between gap-4 font-['Sora'] text-[12px] leading-none 3xl:text-[13px] 4xl:text-[14px]"
                    >
                        <span className="shrink-0 font-normal text-[#94A3B8]">{row.label}</span>

                        <span
                            className={`min-w-0 break-words text-end font-semibold text-[#1E293B] ${
                                row.valueClassName ?? ''
                            }`}
                        >
                            {row.value}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function NextStepsCard({ title, description }: NextStepsCardProps) {
    return (
        <section className="relative min-h-[239px] rounded-2xl border border-[#E2E8F0] bg-white p-6 3xl:min-h-[270px] 3xl:p-8 4xl:min-h-[310px] 4xl:p-10">
            <h2 className="font-['Sora'] text-[16px] font-semibold leading-none text-[#1E293B] 3xl:text-[18px] 4xl:text-[20px]">
                {title}
            </h2>

            <p className="mt-4 max-w-[245px] break-words font-['Sora'] text-[13px] font-normal leading-[140%] text-[#64748B] 3xl:mt-5 3xl:max-w-[320px] 3xl:text-[14px] 4xl:max-w-[390px] 4xl:text-[16px]">
                {description}
            </p>

            <ChangeRequestNextSteps className="absolute bottom-3 end-3 h-auto w-[132px] 3xl:bottom-5 3xl:end-5 3xl:w-[155px] 4xl:bottom-6 4xl:end-6 4xl:w-[185px]" />
        </section>
    );
}

export function ActivityTimeline({ title, items }: ActivityTimelineProps) {
    const statusIcons = {
        completed: ChangeRequestTimelineDone,
        progress: ChangeRequestTimelineProgress,
        pending: ChangeRequestTimelinePending,
    };

    return (
        <section className="min-h-[303px] rounded-2xl border border-[#E2E8F0] bg-white p-6 3xl:min-h-[350px] 3xl:p-8 4xl:min-h-[400px] 4xl:p-10">
            <h2 className="mb-5 font-['Sora'] text-[18px] font-semibold leading-none text-[#1E293B] 3xl:mb-6 3xl:text-[20px] 4xl:mb-8 4xl:text-[22px]">
                {title}
            </h2>

            <div className="flex flex-col gap-5 3xl:gap-6 4xl:gap-7">
                {items.map((item, index) => {
                    const StatusIcon = statusIcons[item.status];

                    return (
                        <div
                            key={`${item.title}-${index}`}
                            className="flex min-w-0 items-start gap-4 3xl:gap-5 4xl:gap-6"
                        >
                            <StatusIcon className="mt-0.5 h-6 w-6 shrink-0 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8" />

                            <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 md:flex-row md:items-start">
                                <div className="min-w-0">
                                    <h3 className="break-words font-['Sora'] text-[14px] font-semibold leading-[120%] text-[#1E293B] 3xl:text-[15px] 4xl:text-[17px]">
                                        {item.title}
                                    </h3>

                                    <div className="mt-1 break-words font-['Sora'] text-[13px] font-normal leading-[140%] text-[#64748B] 3xl:text-[14px] 4xl:text-[15px]">
                                        {item.description}
                                    </div>
                                </div>

                                <span className="shrink-0 font-['Sora'] text-[12px] font-normal leading-[140%] text-[#94A3B8] 3xl:text-[13px] 4xl:text-[14px]">
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
