import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MetricItem } from '../../../../utils/types/users.types';

interface UserMetricsGridProps {
    metrics: MetricItem[];
}

const cardStyleMap: Record<
    string,
    {
        badgeBg: string;
    }
> = {
    outstanding: {
        badgeBg: 'bg-[#00E5C810]',
    },
    active: {
        badgeBg: 'bg-[#34C75933]',
    },
    pending: {
        badgeBg: 'bg-[#00E5C810]',
    },
    rejected: {
        badgeBg: 'bg-[#E9544033]',
    },
};

export const UserMetricsGrid: React.FC<UserMetricsGridProps> = ({ metrics }) => {
    const { t, i18n } = useTranslation('usersPage');
    const isArabic = i18n.language.startsWith('ar');

    return (
        <div className="grid w-full grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(item => {
                const Icon = item.icon;
                const styles = cardStyleMap[item.id];

                return (
                    <div
                        key={item.id}
                        className={`flex w-full min-w-0 items-center gap-[12px] rounded-[20px] border border-[#ECEFF4] bg-white px-[16px] py-[20px] shadow-sm transition-all hover:shadow-md ${
                            isArabic ? 'flex-row-reverse' : 'flex-row'
                        }`}
                    >
                        <div
                            className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[24px] ${
                                styles?.badgeBg || 'bg-gray-50'
                            }`}
                        >
                            <Icon />
                        </div>

                        <div
                            className={`flex min-w-0 flex-1 flex-col justify-center ${
                                isArabic ? 'items-end text-right' : 'items-start text-left'
                            }`}
                        >
                            <span className="min-w-0 whitespace-nowrap text-[12px] font-medium leading-[16px] text-[#64748B] min-[1440px]:text-[12px] min-[1920px]:text-[14px] min-[2500px]:text-[15px]">
                                {t(`metrics.${item.id}`)}
                            </span>

                            <span className="mt-[4px] w-full text-[24px] font-semibold leading-[28px] text-[#0F172A]">
                                {item.value}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UserMetricsGrid;