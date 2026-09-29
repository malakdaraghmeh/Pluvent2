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

const StatCard = ({ value, icon }: DashboardStat) => {
    const { t } = useTranslation('dashboardStats');
    const Icon = iconMap[icon];
    const styles = styleMap[icon];

    return (
        <article
            className={`relative flex min-h-[120px] w-full min-w-0 flex-col rounded-[16px] border bg-white p-4 text-start ${styles.border} 3xl:min-h-[132px] 3xl:p-5 4xl:min-h-[148px] 4xl:p-6`}
        >
            <div className="min-w-0 pe-12 3xl:pe-14 4xl:pe-16">
                <h3 className="w-full break-words text-[15px] font-semibold leading-[20px] text-[#08040B] 3xl:text-[16px] 3xl:leading-[22px] 4xl:text-[18px] 4xl:leading-[24px]">
                    {t(`${icon}.title`)}
                </h3>
            </div>

            <div
                className={`absolute end-4 top-4 flex h-[42px] w-[42px] items-center justify-center rounded-[6px] border ${styles.iconBorder} ${styles.iconBg} 3xl:end-5 3xl:top-5 3xl:h-[46px] 3xl:w-[46px] 4xl:end-6 4xl:top-6 4xl:h-[50px] 4xl:w-[50px]`}
            >
                <Icon className="h-6 w-6 3xl:h-[26px] 3xl:w-[26px] 4xl:h-7 4xl:w-7" />
            </div>

            <p className="mt-5 break-words text-[24px] font-semibold leading-[30px] text-[#08040B] 3xl:mt-6 3xl:text-[26px] 4xl:text-[28px]">
                {value}
            </p>

            {icon === 'upcoming' ? (
                <div className="mt-1 flex w-full min-w-0 flex-wrap items-center gap-x-1 gap-y-1 text-[11px] leading-[16px] 3xl:text-[12px] 3xl:leading-[18px] 4xl:text-[13px]">
                    <span className="text-[#4A42FF]">{t('upcoming.descriptionHighlight')}</span>

                    <span className="break-words text-[#718096]">{t('upcoming.description')}</span>
                </div>
            ) : (
                <p className="mt-1 w-full whitespace-normal break-words text-[12px] font-normal leading-[16px] text-[#718096] 3xl:text-[13px] 3xl:leading-[18px] 4xl:text-[14px] 4xl:leading-[20px]">
                    {t(`${icon}.description`)}
                </p>
            )}
        </article>
    );
};

export default StatCard;
