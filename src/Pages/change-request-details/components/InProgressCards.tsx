import { useTranslation } from 'react-i18next';
import ClockIcon from '@icons/clock(10).svg?react';
import type {
    InProgressInfoCardProps,
    InProgressWorkCardProps,
    WorkingSinceCardProps,
} from '../../../../utils/types/change-request-details.types';
import ChangeRequestProgressCard from './ChangeRequestProgressCard';

export function InProgressWorkCard({
    progress,
    title,
    description,
    overallLabel,
}: InProgressWorkCardProps) {
    return (
        <ChangeRequestProgressCard
            progress={progress}
            title={title}
            description={description}
            overallLabel={overallLabel}
            startColor="#3634C7"
            endColor="#39E1D7"
            titleColor="#0066FF"
            className="min-h-[224px]"
        />
    );
}

export function InProgressInfoCard({
    label,
    value,
    valueClassName = 'text-[#111827]',
}: InProgressInfoCardProps) {
    
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    return (
        <div className={`flex min-h-[86px] min-w-0 flex-1 flex-col justify-center gap-2 rounded-[16px] border border-[#E8EAEF] bg-white p-5 ${isArabic ? 'text-right' : 'text-left'}`}>
            <span className={`font-['Sora'] text-[12px] font-semibold leading-none text-[#6B7280] ${isArabic ? 'text-right' : 'text-left'}`}>
                {label}
            </span>
            <strong className={`break-words font-['Sora'] text-[18px] font-semibold leading-none ${valueClassName}`}>
                {value}
            </strong>
        </div>
    );
}

export function WorkingSinceCard({
    title,
    value,
}: WorkingSinceCardProps) {
    
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    return (
        <section className={`flex min-h-[78px] w-full items-center gap-3 rounded-[16px] border border-[#E8EAEF] bg-white p-4 ${isArabic ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#0066FF]/[0.06] ${isArabic ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                <ClockIcon className="h-[18px] w-[18px]" />
            </div>
            <div className="min-w-0">
                <span className="block font-['Sora'] text-[12px] font-normal leading-none text-[#6B7280]">
                    {title}
                </span>
                <strong className="mt-1 block break-words font-['Sora'] text-[13px] font-semibold leading-none text-[#111827]">
                    {value}
                </strong>
            </div>
        </section>
    );
}
