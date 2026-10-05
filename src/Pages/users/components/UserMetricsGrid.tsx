import { useTranslation } from 'react-i18next';

import type { UserMetricId, UserMetricsGridProps } from '../../../utils/types/users.types';

const cardStyleMap: Record<
    UserMetricId,
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

export default function UserMetricsGrid({ metrics }: UserMetricsGridProps) {
    const { t } = useTranslation('usersPage');

    return (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 min-[1920px]:gap-5 min-[2500px]:gap-6">
            {metrics.map(item => {
                const Icon = item.icon;
                const styles = cardStyleMap[item.id];

                return (
                    <div
                        key={item.id}
                        className="flex h-[102px] w-full min-w-0 items-center gap-3 rounded-[20px] border border-[#ECEFF4] bg-white px-4 py-5 transition-shadow hover:shadow-sm min-[1920px]:h-[112px] min-[1920px]:gap-4 min-[1920px]:px-5 min-[1920px]:py-6 min-[2500px]:h-[124px] min-[2500px]:px-6"
                    >
                        <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${styles.badgeBg} min-[1920px]:h-14 min-[1920px]:w-14 min-[2500px]:h-16 min-[2500px]:w-16`}
                        >
                            <Icon className="h-6 w-6 min-[1920px]:h-7 min-[1920px]:w-7 min-[2500px]:h-8 min-[2500px]:w-8" />
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                            <span className="whitespace-nowrap text-[12px] font-medium leading-5 text-[#64748B] min-[1920px]:text-[16px] min-[1920px]:leading-6 min-[2500px]:text-[18px]">
                                {t(`metrics.${item.id}`)}
                            </span>

                            <span className="mt-1 text-[24px] font-semibold leading-7 text-[#0F172A] min-[1920px]:text-[28px] min-[1920px]:leading-8 min-[2500px]:text-[32px] min-[2500px]:leading-9">
                                {item.value}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


