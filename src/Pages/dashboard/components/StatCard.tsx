import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { absentIcon, folderIcon, paidIcon, upcomingIcon } from '@/assets';
import type { DashboardStat } from '../../../../utils/types/dashboard.types';

const iconMap = {
    projects: folderIcon,
    paid: paidIcon,
    upcoming: upcomingIcon,
    absent: absentIcon,
};

const styleMap = {
    projects: {
        border: 'border-[#4A42FF]',
        iconBorder: 'border-[#4A42FF]',
        iconBg: 'bg-[#F3F2FF]',
    },
    paid: {
        border: 'border-[#33D6D6]',
        iconBorder: 'border-[#33D6D6]',
        iconBg: 'bg-[#EDFFFF]',
    },
    upcoming: {
        border: 'border-[#FF9500]',
        iconBorder: 'border-[#FF9500]',
        iconBg: 'bg-[#FFF8EE]',
    },
    absent: {
        border: 'border-[#FF4D4F]',
        iconBorder: 'border-[#FF4D4F]',
        iconBg: 'bg-[#FFF3F3]',
    },
};

const routeMap = {
    projects: 'projects',
    paid: 'billing',
    upcoming: 'billing',
    absent: 'billing',
};

const StatCard = ({ value, icon }: DashboardStat) => {
    const { t } = useTranslation('dashboardStats');
    const { locale = 'en' } = useParams();
    const Icon = iconMap[icon];
    const styles = styleMap[icon];

    return (
        <Link
            to={`/${locale}/${routeMap[icon]}`}
            className="block min-w-0"
        >
            <article
                className={`box-border flex min-h-[120px] w-full min-w-0 flex-col rounded-[16px] border bg-white p-4 transition-shadow hover:shadow-md ${styles.border}`}
            >
                <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_42px] items-start gap-3">
                    <h3
                        className={`min-w-0 whitespace-nowrap font-semibold leading-[20px] text-[#08040B] ${
                            icon === 'upcoming'
                                ? 'text-[14px] tracking-[-0.2px]'
                                : 'text-[15px]'
                        }`}
                    >
                        {t(`${icon}.title`)}
                    </h3>

                    <div
                        className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[6px] border ${styles.iconBorder} ${styles.iconBg}`}
                    >
                        <Icon className="h-6 w-6" />
                    </div>
                </div>

                <p className="mt-1 whitespace-nowrap text-[24px] font-semibold leading-[30px] text-[#08040B]">
                    {value}
                </p>

                {icon === 'upcoming' ? (
                    <div className="mt-1 flex min-w-0 items-center gap-1 text-[11px] leading-[16px]">
                        <span className="shrink-0 whitespace-nowrap text-[#4A42FF]">
                            {t('upcoming.descriptionHighlight')}
                        </span>

                        <span className="min-w-0 text-[#718096]">
                            {t('upcoming.description')}
                        </span>
                    </div>
                ) : (
                    <p className="mt-1 text-[12px] font-normal leading-[16px] text-[#718096]">
                        {t(`${icon}.description`)}
                    </p>
                )}
            </article>
        </Link>
    );
};

export default StatCard;