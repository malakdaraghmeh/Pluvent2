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
    const { t, i18n } = useTranslation('dashboardStats');
    const isArabic = i18n.language.startsWith('ar');
    const Icon = iconMap[icon];
    const styles = styleMap[icon];
    const isUpcoming = icon === 'upcoming';

    return (
        <article
            className={`box-border flex min-h-[140px] w-full min-w-0 flex-col rounded-[16px] border bg-white p-4 ${styles.border} ${
                isArabic ? 'text-right' : 'text-left'
            }`}
        >
            <div
                className={`flex w-full min-w-0 items-start justify-between ${
                    isUpcoming ? 'gap-1' : 'gap-3'
                } ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}
            >
                <h3
                    className={`font-semibold leading-[20px] text-[#08040B] ${
                        isUpcoming
                            ? 'shrink-0 whitespace-nowrap text-[13px] min-[1400px]:text-[14px] 3xl:text-[17px]'
                            : 'min-w-0 flex-1 break-words text-[15px] min-[1400px]:text-[16px] 3xl:text-[17px]'
                    } ${isArabic ? 'text-right' : 'text-left'}`}
                >
                    {t(`${icon}.title`)}
                </h3>

                <div
                    className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[6px] border ${styles.iconBorder} ${styles.iconBg}`}
                >
                    <Icon className="h-6 w-6" />
                </div>
            </div>

            <p
                className={`mt-1 w-full text-[26px] font-semibold leading-[32px] text-[#08040B] ${
                    isArabic ? 'text-right' : 'text-left'
                }`}
            >
                {value}
            </p>

            {isUpcoming ? (
                <div
                    className={`mt-1 flex w-full min-w-0 flex-wrap items-center gap-x-1 text-[11px] leading-[16px] min-[1400px]:text-[12px] 3xl:text-[13px] ${
                        isArabic ? 'justify-end text-right' : 'justify-start text-left'
                    }`}
                >
                    <span className="text-[#4A42FF]">{t('upcoming.descriptionHighlight')}</span>

                    <span className="text-[#718096]">{t('upcoming.description')}</span>
                </div>
            ) : (
                <p
                    className={`mt-1 w-full break-words text-[11px] font-normal leading-[16px] text-[#718096] min-[1400px]:text-[12px] 3xl:text-[13px] ${
                        isArabic ? 'text-right' : 'text-left'
                    }`}
                >
                    {t(`${icon}.description`)}
                </p>
            )}
        </article>
    );
};

export default StatCard;
