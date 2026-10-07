import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProjectProgressArrow } from '@/assets';
import type { ProjectProgress } from '../../../../utils/types/dashboard.types';
import ProgressDonutChart from './ProgressDonutChart';

const warrantyKeyMap = {
    Active: 'active',
    Valid: 'valid',
    'On Hold': 'onHold',
    Suspended: 'suspended',
} as const;

const ProjectProgressCard = ({
    id,
    status,
    progress,
    paidAmount,
    totalAmount,
    warranty,
}: ProjectProgress) => {
    const { t } = useTranslation('projectsPage');
    const { locale = 'en' } = useParams();

    const isArabic = locale.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';

    return (
        <article className="box-border w-full min-w-0 shrink-0 rounded-[24px] border border-[#00E5C810] bg-white p-4 sm:p-5 xl:h-[231px] xl:overflow-hidden xl:p-4 min-[1400px]:p-6">
            <div className="grid w-full min-w-0 grid-cols-1 items-center gap-4 xl:h-[199px] xl:grid-cols-[140px_minmax(0,1fr)] min-[1400px]:h-[183px] min-[1400px]:grid-cols-[165px_minmax(0,1fr)] min-[1400px]:gap-5">
                <div className="flex h-[130px] w-[130px] items-center justify-center justify-self-center sm:h-[140px] sm:w-[140px] xl:col-start-1 xl:row-start-1 xl:h-[140px] xl:w-[140px] xl:justify-self-start min-[1400px]:h-[165px] min-[1400px]:w-[165px]">
                    <div className="origin-center scale-[0.84] sm:scale-[0.9] min-[1400px]:scale-100">
                        <ProgressDonutChart
                            progress={progress}
                            overallLabel={t('overallProject.overall')}
                            projectLabel={t('overallProject.project')}
                        />
                    </div>
                </div>

                <div className="flex w-full min-w-0 flex-col gap-4 xl:col-start-2 xl:row-start-1 xl:h-[183px] xl:justify-between xl:gap-0">
                    <div
                        className={`flex w-full min-w-0 items-start justify-between gap-3 ${
                            isArabic ? 'flex-row-reverse' : 'flex-row'
                        }`}
                    >
                        <h3
                            className={`min-w-0 flex-1 text-[18px] font-semibold leading-6 text-[#08040B] min-[1400px]:whitespace-nowrap min-[1400px]:text-[20px] min-[1400px]:leading-5 ${textAlignment}`}
                        >
                            {t('dashboardProject.title')}
                        </h3>

                        <span
                            className={`shrink-0 whitespace-nowrap rounded-[7px] px-3 py-2 text-[11px] font-normal leading-[11px] min-[1400px]:px-4 ${
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

                    <p
                        className={`w-full min-w-0 text-[14px] font-normal leading-[21px] text-[#7E8492] xl:line-clamp-2 xl:h-[42px] ${textAlignment}`}
                    >
                        {t('dashboardProject.description')}
                    </p>

                    <div
                        className={`flex w-full min-w-0 items-center justify-between gap-3 xl:h-[24px] ${
                            isArabic ? 'flex-row-reverse' : 'flex-row'
                        }`}
                    >
                        <span
                            className={`min-w-0 text-[14px] font-normal leading-[18px] text-[#64748B] xl:leading-[14px] ${textAlignment}`}
                        >
                            {t('dashboardProject.dueDate')}
                        </span>

                        <span className="shrink-0 whitespace-nowrap text-[14px] font-medium leading-[14px] text-[#0F172A] [unicode-bidi:isolate]">
                            {paidAmount} / {totalAmount}
                        </span>
                    </div>

                    <div className="flex w-full min-w-0 flex-col gap-3 min-[480px]:grid min-[480px]:grid-cols-[minmax(0,1fr)_auto] min-[480px]:items-center min-[480px]:gap-4 xl:h-[24px]">
                        <div
                            className={`flex min-w-0 items-center gap-1 text-[14px] font-normal leading-[18px] ${
                                isArabic
                                    ? 'flex-row-reverse justify-self-end min-[480px]:col-start-2 min-[480px]:row-start-1'
                                    : 'justify-self-start min-[480px]:col-start-1 min-[480px]:row-start-1'
                            }`}
                        >
                            <span className="whitespace-nowrap text-[#53627A]">
                                {t('statusLabel.projectStatus')}
                            </span>
                            <span className="text-[#53627A]">:</span>
                            <span className="whitespace-nowrap text-[#00BF78]">
                                {t(`warranty.${warrantyKeyMap[warranty]}`)}
                            </span>
                        </div>

                        <Link
                            to={`/${locale}/projects/${id}`}
                            className={`flex w-fit shrink-0 items-center gap-1 whitespace-nowrap text-[14px] font-semibold leading-[18px] text-[#2F1ABD] transition-opacity hover:opacity-70 ${
                                isArabic
                                    ? 'self-end flex-row-reverse justify-self-start min-[480px]:col-start-1 min-[480px]:row-start-1'
                                    : 'self-start justify-self-end min-[480px]:col-start-2 min-[480px]:row-start-1'
                            }`}
                        >
                            <span>{t('action.openProject')}</span>
                            <ProjectProgressArrow
                                className={`h-4 w-4 shrink-0 ${isArabic ? 'rotate-180' : ''}`}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectProgressCard;


