import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/assets';
import type { ProjectCardProps } from '../../../../utils/types/projects.types';

const warrantyKeys = {
    Active: 'active',
    Valid: 'valid',
    'On Hold': 'onHold',
    Suspended: 'suspended',
} as const;

const ProjectCard = ({ project }: ProjectCardProps) => {
    const { t } = useTranslation('projectsPage');
    const { locale = 'en' } = useParams<{ locale: string }>();
    const isArabic = locale === 'ar';
    const isPayNow = project.action === 'Pay Now';
    const isCompleted = project.status === 'Completed';

    const formattedDate = new Intl.DateTimeFormat(isArabic ? 'ar-EG' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(`${project.dueDate}T00:00:00`));

    const borderColor =
        project.warranty === 'On Hold' || project.warranty === 'Suspended'
            ? '#FF3B3033'
            : project.warranty === 'Valid'
              ? '#34C75933'
              : '#00E5C810';

    const actionText =
        project.action === 'Open Project'
            ? t('action.openProject')
            : project.action === 'Pay Now'
              ? t('action.payNow')
              : t('action.viewProject');

    const actionHref = isPayNow ? `/${locale}/billing` : `/${locale}/projects/${project.id}`;

    return (
        <article
            className="flex w-full min-w-0 flex-col gap-5 rounded-[24px] border bg-white p-4 shadow-[0_4px_20px_#0000000D] sm:p-5 lg:min-h-[213px] lg:flex-row lg:items-center lg:gap-6 lg:p-6 3xl:min-h-[225px] 3xl:gap-7 3xl:p-7 4xl:min-h-[240px] 4xl:gap-8 4xl:p-8"
            style={{ borderColor }}
        >
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center self-center sm:h-24 sm:w-24 lg:self-auto 3xl:h-[104px] 3xl:w-[104px] 4xl:h-28 4xl:w-28">
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `conic-gradient(from 180deg,#3634C7 0%,#39E1D7 ${project.progress}%,#EEF0F4 ${project.progress}%)`,
                    }}
                />

                <div className="absolute inset-[8px] rounded-full bg-white sm:inset-[9px] 3xl:inset-[10px] 4xl:inset-[11px]" />

                <div className="relative text-center">
                    <p className="text-[22px] font-bold leading-none text-[#1E293B] sm:text-[26px] 3xl:text-[28px] 4xl:text-[30px]">
                        {project.progress}%
                    </p>

                    <p className="mt-1 text-[9px] font-semibold leading-[11px] text-[#64748B] sm:text-[10px] 3xl:text-[11px] 4xl:text-[12px]">
                        {t('overallProject.overall')}
                        <br />
                        {t('overallProject.project')}
                    </p>
                </div>
            </div>

            <div className="flex w-full min-w-0 flex-1 flex-col justify-center">
                <div className="flex w-full min-w-0 flex-wrap items-start justify-between gap-3">
                    <h3 className="min-w-0 flex-1 break-words text-start text-[20px] font-bold leading-[26px] text-[#0F172A] 3xl:text-[22px] 3xl:leading-[28px] 4xl:text-[24px] 4xl:leading-[30px]">
                        {project.title}
                    </h3>

                    <span
                        className={`shrink-0 rounded-md px-2.5 py-1.5 text-[12px] sm:px-3 3xl:px-3.5 3xl:text-[13px] 4xl:px-4 4xl:text-[14px] ${
                            isCompleted
                                ? 'bg-[#2ECC710D] text-[#2ECC71]'
                                : 'bg-[#007AFF0D] text-[#007AFF]'
                        }`}
                    >
                        {isCompleted ? t('status.completed') : t('status.inProgress')}
                    </span>
                </div>

                <p className="mt-2 w-full whitespace-normal break-words text-start text-[14px] leading-[21px] text-[#7E8492] sm:mt-3 3xl:text-[15px] 3xl:leading-[23px] 4xl:text-[16px] 4xl:leading-[24px]">
                    {t('cardDescription')}
                </p>

                <div className="mt-3 flex min-h-[40px] w-full min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-[8px] border-[0.5px] border-[#B1B4B6]/50 bg-[#E2E8F0]/10 p-2 sm:mt-4 3xl:min-h-[44px] 3xl:px-3 4xl:min-h-[48px] 4xl:px-4">
                    <span className="min-w-0 break-words text-start text-[14px] font-normal leading-[20px] text-[#64748B] 3xl:text-[15px] 4xl:text-[16px]">
                        {t(project.dateLabel === 'Due' ? 'dateLabel.due' : 'dateLabel.expired')}{' '}
                        {formattedDate}
                    </span>

                    <span
                        dir="ltr"
                        className="shrink-0 whitespace-nowrap text-[14px] font-normal [unicode-bidi:isolate] 3xl:text-[15px] 4xl:text-[16px]"
                    >
                        <span className={isCompleted ? 'text-[#2ECC71]' : 'text-[#0F172A]'}>
                            {project.paidAmount}
                        </span>

                        <span className="text-[#0F172A]"> / {project.totalAmount}</span>
                    </span>
                </div>

                <div className="mt-3 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-3 sm:mt-4 3xl:mt-5">
                    <div className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-1 text-start text-[14px] leading-[20px] text-[#475569] 3xl:text-[15px] 3xl:leading-[22px] 4xl:text-[16px] 4xl:leading-[24px]">
                        <span>
                            {project.statusLabel === 'Project Status'
                                ? t('statusLabel.projectStatus')
                                : t('statusLabel.warranty')}
                            :
                        </span>

                        <span
                            className={
                                project.warranty === 'On Hold' || project.warranty === 'Suspended'
                                    ? 'text-[#FF3B30]'
                                    : 'text-[#10B981]'
                            }
                        >
                            {t(`warranty.${warrantyKeys[project.warranty]}`)}
                        </span>

                        {project.warranty === 'Suspended' && (
                            <Link
                                to={`/${locale}/billing`}
                                className="whitespace-nowrap text-[12px] text-[#FF3B30] underline decoration-[#FF3B30] underline-offset-2 sm:text-[13px] lg:text-[14px] 3xl:text-[15px] 4xl:text-[16px]"
                            >
                                {t('warranty.explorePaidPlans')}
                            </Link>
                        )}
                    </div>

                    <Link
                        to={actionHref}
                        className={`inline-flex shrink-0 items-center justify-center gap-1.5 text-[16px] font-semibold transition-opacity hover:opacity-70 3xl:text-[17px] 4xl:text-[18px] ${
                            isPayNow ? 'text-[#FF3B30]' : 'text-[#3634C7]'
                        }`}
                    >
                        <span>{actionText}</span>

                        <ArrowIcon
                            className={`h-4 w-4 shrink-0 3xl:h-[18px] 3xl:w-[18px] 4xl:h-5 4xl:w-5 ${
                                isArabic ? 'rotate-180' : ''
                            } ${isPayNow ? 'text-[#FF3B30]' : 'text-[#3634C7]'}`}
                        />
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
