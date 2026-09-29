import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowIcon from '@icons/arrow.svg?react';
import type { ProjectProgress } from '../../../../utils/types/dashboard.types';

const warrantyKeyMap = {
    Active: 'active',
    Valid: 'valid',
    'On Hold': 'onHold',
    Suspended: 'suspended',
} as const;

const ProjectProgressCard = ({
    id,
    title,
    status,
    progress,
    description,
    dueDate,
    paidAmount,
    totalAmount,
    warranty,
}: ProjectProgress) => {
    const { t } = useTranslation('projectsPage');
    const { locale = 'en' } = useParams();

    return (
        <article className="w-full min-w-0 rounded-[24px] border border-[#E8EBEF] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] sm:p-5 lg:p-6 3xl:p-7 4xl:p-8">
            <div className="grid w-full min-w-0 grid-cols-1 gap-5 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-center lg:gap-6 3xl:grid-cols-[132px_minmax(0,1fr)] 3xl:gap-7 4xl:grid-cols-[144px_minmax(0,1fr)] 4xl:gap-8">
                <div className="flex w-full justify-center sm:justify-start">
                    <div
                        className="relative flex h-[108px] w-[108px] shrink-0 items-center justify-center rounded-full 3xl:h-[118px] 3xl:w-[118px] 4xl:h-[128px] 4xl:w-[128px]"
                        style={{
                            background: `conic-gradient(#35D3CE 0deg,#3347D8 ${progress * 3.6}deg,#EEF1F5 ${progress * 3.6}deg 360deg)`,
                        }}
                    >
                        <div className="flex h-[86px] w-[86px] flex-col items-center justify-center rounded-full bg-white text-center 3xl:h-[94px] 3xl:w-[94px] 4xl:h-[102px] 4xl:w-[102px]">
                            <span className="text-[25px] font-semibold leading-none text-[#111827] 3xl:text-[27px] 4xl:text-[29px]">
                                {progress}%
                            </span>

                            <span className="mt-2 text-[9px] font-semibold leading-[11px] text-[#64748B] 3xl:text-[10px] 4xl:text-[11px]">
                                {t('overallProject.overall')}
                                <br />
                                {t('overallProject.project')}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="min-w-0">
                    <div className="flex w-full min-w-0 flex-wrap items-start justify-between gap-3">
                        <h3 className="min-w-0 break-words text-[20px] font-semibold leading-[26px] text-[#08040B] 3xl:text-[22px] 3xl:leading-[28px] 4xl:text-[24px] 4xl:leading-[30px]">
                            {title}
                        </h3>

                        <span
                            className={`shrink-0 rounded-[7px] px-4 py-2 text-[11px] font-normal 3xl:text-[12px] 4xl:text-[13px] ${
                                status === 'Completed'
                                    ? 'bg-[#2ECC710D] text-[#2ECC71]'
                                    : 'bg-[#F0F7FF] text-[#007AFF]'
                            }`}
                        >
                            {status === 'In Progress'
                                ? t('status.inProgress')
                                : t('status.completed')}
                        </span>
                    </div>

                    <p className="mt-3 w-full whitespace-normal break-words text-start text-[14px] font-normal leading-[22px] text-[#7C8798] 3xl:text-[15px] 3xl:leading-[24px] 4xl:text-[16px] 4xl:leading-[26px]">
                        {description}
                    </p>

                    <div className="mt-4 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-[10px] border border-[#D7DCE3] px-3 py-3 3xl:px-4 3xl:py-[14px] 4xl:px-5 4xl:py-4">
                        <span className="min-w-0 break-words text-start text-[13px] font-normal leading-[18px] text-[#64748B] 3xl:text-[14px] 4xl:text-[15px]">
                            {dueDate}
                        </span>

                        <span
                            dir="ltr"
                            className="shrink-0 whitespace-nowrap text-[13px] font-medium leading-[18px] text-[#0F172A] [unicode-bidi:isolate] 3xl:text-[14px] 4xl:text-[15px]"
                        >
                            {paidAmount} / {totalAmount}
                        </span>
                    </div>

                    <div className="mt-4 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-3">
                        <div className="flex min-w-0 flex-wrap items-center gap-1 text-[13px] leading-[18px] 3xl:text-[14px] 4xl:text-[15px]">
                            <span className="text-[#53627A]">
                                {t('statusLabel.projectStatus')}:
                            </span>

                            <span className="text-[#00BF78]">
                                {t(`warranty.${warrantyKeyMap[warranty]}`)}
                            </span>
                        </div>

                        <Link
                            to={`/${locale}/projects/${id}`}
                            className="flex shrink-0 items-center gap-2 text-[16px] font-semibold text-[#2217C7] transition-opacity hover:opacity-70 3xl:text-[17px] 4xl:text-[18px]"
                        >
                            <span>{t('action.openProject')}</span>

                            <ArrowIcon className="h-4 w-4 shrink-0 rtl:rotate-180 3xl:h-[18px] 3xl:w-[18px] 4xl:h-5 4xl:w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectProgressCard;
