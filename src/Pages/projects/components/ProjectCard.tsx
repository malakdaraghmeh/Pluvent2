import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/assets';
import PaymentFlow from '@/Pages/billing/components/PaymentFlow';
import ProgressDonutChart from '@/Pages/dashboard/components/ProgressDonutChart';
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
    const [isPaymentFlowOpen, setIsPaymentFlowOpen] = useState(false);

    const isArabic = locale.startsWith('ar');
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

    const actionHref = isCompleted
        ? `/${locale}/projects/${project.id}/completed`
        : `/${locale}/projects/${project.id}`;

    const dateLabel =
        project.dateLabel === 'Due'
            ? t('dateLabel.due')
            : t('dateLabel.expired');

    const statusLabel =
        project.statusLabel === 'Project Status'
            ? t('statusLabel.projectStatus')
            : t('statusLabel.warranty');

    const warrantyText = t(`warranty.${warrantyKeys[project.warranty]}`);

    const actionClassName = `inline-flex shrink-0 items-center justify-center gap-1.5 text-[16px] font-semibold leading-[16px] transition-opacity hover:opacity-70 ${
        isArabic ? 'flex-row-reverse' : ''
    } ${isPayNow ? 'text-[#FF3B30]' : 'text-[#2F1ABD]'}`;

    const actionContent = (
        <>
            <span>{actionText}</span>
            <ArrowIcon
                className={`h-4 w-4 shrink-0 transition-transform ${
                    isArabic ? 'rotate-180' : ''
                } ${isPayNow ? 'text-[#FF3B30]' : 'text-[#2F1ABD]'}`}
            />
        </>
    );

    return (
        <>
            <article
                className="flex w-full min-w-0 flex-col gap-5 rounded-[24px] border bg-white p-4 shadow-[0_4px_20px_#0000000D] sm:p-5 lg:h-[213px] lg:flex-row lg:items-center lg:gap-5 lg:p-6"
                style={{ borderColor }}
            >
                <ProgressDonutChart
                    progress={project.progress}
                    overallLabel={t('overallProject.overall')}
                    projectLabel={t('overallProject.project')}
                />

                <div className="flex w-full min-w-0 flex-1 flex-col justify-center">
                    <div className="flex w-full min-w-0 items-start justify-between gap-3">
                        <h3 className="min-w-0 flex-1 break-words text-start text-[20px] font-bold leading-[20px] text-[#0F172A]">
                            {project.title}
                        </h3>

                        <span
                            className={`shrink-0 rounded-md px-2.5 py-1.5 text-[12px] font-normal leading-[12px] ${
                                isCompleted
                                    ? 'bg-[#2ECC710D] text-[#2ECC71]'
                                    : 'bg-[#007AFF0D] text-[#007AFF]'
                            }`}
                        >
                            {isCompleted
                                ? t('status.completed')
                                : t('status.inProgress')}
                        </span>
                    </div>

                    <p className="mt-2 w-full break-words text-start text-[14px] font-normal leading-[21px] text-[#7E8492]">
                        {t('cardDescription')}
                    </p>

                    <div className="mt-3 flex min-h-[40px] w-full min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-[8px] border-[0.5px] border-[#B1B4B6]/50 bg-[#E2E8F0]/10 p-2">
                        <span className="min-w-0 break-words text-start text-[14px] font-normal leading-[14px] text-[#64748B]">
                            {dateLabel} {formattedDate}
                        </span>

                        <bdi className="shrink-0 whitespace-nowrap text-[14px] font-normal leading-[14px]">
                            <span className={isCompleted ? 'text-[#2ECC71]' : 'text-[#0F172A]'}>
                                {project.paidAmount}
                            </span>
                            <span className="text-[#0F172A]"> / {project.totalAmount}</span>
                        </bdi>
                    </div>

                    <div className="mt-3 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-3">
                        <div className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-1 text-start text-[14px] font-normal leading-[14px] text-[#475569]">
                            <span>{statusLabel}:</span>

                            <span
                                className={
                                    project.warranty === 'On Hold' ||
                                    project.warranty === 'Suspended'
                                        ? 'text-[#FF3B30]'
                                        : 'text-[#10B981]'
                                }
                            >
                                {warrantyText}
                            </span>

                            {project.warranty === 'Suspended' && (
                                <Link
                                    to={`/${locale}/support-plans`}
                                    className="whitespace-nowrap text-[14px] font-normal leading-[14px] text-[#FF3B30] underline decoration-[#FF3B30] underline-offset-2 transition-opacity hover:opacity-70"
                                >
                                    {t('warranty.explorePaidPlans')}
                                </Link>
                            )}
                        </div>

                        {isPayNow ? (
                            <button
                                type="button"
                                onClick={() => setIsPaymentFlowOpen(true)}
                                className={actionClassName}
                            >
                                {actionContent}
                            </button>
                        ) : (
                            <Link
                                to={actionHref}
                                className={actionClassName}
                            >
                                {actionContent}
                            </Link>
                        )}
                    </div>
                </div>
            </article>

            <PaymentFlow
                isOpen={isPaymentFlowOpen}
                onClose={() => setIsPaymentFlowOpen(false)}
            />
        </>
    );
};

export default ProjectCard;