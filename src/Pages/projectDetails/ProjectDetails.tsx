import { useTranslation } from 'react-i18next';

import { Delivery, StartDate } from '@/assets';
import clockBg from '@/assets/images/clock-bg.png';
import cover from '@/assets/images/cover.png';

import type { ProjectDetailsProps } from '../../../utils/types/project-details.types';

export default function ProjectDetails({
    project,
    daysLeft,
    lastUpdated,
    progressPercent,
    daysSubtitle,
    noticeTitle,
    noticeMessage,
    progressColor = '#12115C',
    statusLabel,
    statusBackgroundColor,
    statusTextColor,
}: ProjectDetailsProps) {
    const { t, i18n } = useTranslation('projectDetails');

    const displayedDaysLeft = daysLeft ?? project.daysLeft;
    const displayedLastUpdated = lastUpdated ?? project.lastUpdated;
    const locale = i18n.language.startsWith('ar') ? 'ar-EG' : 'en-US';

    const formatDate = (value: string) => {
        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return value;
        }

        return new Intl.DateTimeFormat(locale, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };

    const formatRelativeTime = (value: string) => {
        const match = value.match(/^(\d+)\s+(day|days|week|weeks|month|months)\s+ago$/i);

        if (!match) {
            return value;
        }

        const amount = Number(match[1]);
        const rawUnit = match[2].toLowerCase();

        let unit: Intl.RelativeTimeFormatUnit = 'day';

        if (rawUnit.startsWith('week')) {
            unit = 'week';
        }

        if (rawUnit.startsWith('month')) {
            unit = 'month';
        }

        return new Intl.RelativeTimeFormat(locale, {
            numeric: 'always',
        }).format(-amount, unit);
    };

    const filledBars =
        progressPercent === undefined
            ? 0
            : Math.round((Math.min(100, Math.max(0, progressPercent)) / 100) * 46);

    return (
        <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-6 min-[1360px]:grid-cols-[minmax(0,1fr)_362px]">
            <div className="flex min-w-0 flex-col gap-6 rounded-[24px] border-[0.5px] border-[#ECEFF4] bg-white p-4 shadow-[0px_1px_3px_3px_#0000001A] sm:p-5 md:p-6">
                <div className="flex min-w-0 items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-start text-[24px] font-semibold leading-[30px] text-[#3634C7] sm:text-[26px] sm:leading-[32px] md:text-[28px]">
                            {t('projectName')}
                        </h1>

                        <p className="mt-1 w-full break-words text-start text-[14px] leading-[22px] text-[#12115C]">
                            {t('description')}
                        </p>
                    </div>

                    <span
                        className="flex h-[26px] w-[101px] shrink-0 items-center justify-center rounded-[6px] px-[10px] py-1 text-[12px] font-medium"
                        style={{
                            backgroundColor: statusBackgroundColor ?? '#007AFF0D',
                            color: statusTextColor ?? '#007AFF',
                        }}
                    >
                        {statusLabel ??
                            t(
                                project.status === 'In Progress'
                                    ? 'status.inProgress'
                                    : 'status.completed'
                            )}
                    </span>
                </div>

                <div className="mt-auto grid w-full min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
                    <div
                        className="flex h-[50px] min-w-0 items-center gap-2 rounded-[16px] border border-[#00E5C810] p-2"
                        style={{
                            background:
                                'linear-gradient(146deg, #F1F1F1 0%, #FFFFFF 30.72%, #EEEBEB 100%)',
                        }}
                    >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center p-1 text-[#3634C7]">
                            <StartDate />
                        </span>

                        <p className="min-w-0 flex-1 whitespace-nowrap text-start text-[16px] font-normal leading-[16px] text-[#3634C7]">
                            <span className="text-[#12115C]">{t('startDate')}:</span>{' '}
                            <span className="[unicode-bidi:isolate]">
                                {formatDate(project.startDate)}
                            </span>
                        </p>
                    </div>

                    <div
                        className="flex h-[50px] min-w-0 items-center gap-2 rounded-[16px] border border-[#00E5C810] p-2"
                        style={{
                            background:
                                'linear-gradient(146deg, #F1F1F1 0%, #FFFFFF 30.72%, #EEEBEB 100%)',
                        }}
                    >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center p-1 text-[#3634C7]">
                            <Delivery />
                        </span>

                        <p className="min-w-0 flex-1 whitespace-nowrap text-start text-[16px] font-normal leading-[16px] text-[#3634C7]">
                            <span className="text-[#12115C]">{t('delivery')}:</span>{' '}
                            <span className="[unicode-bidi:isolate]">
                                {formatDate(project.deliveryDate)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="relative flex min-h-[330px] w-full flex-col items-center gap-6 overflow-hidden rounded-[24px] border-[0.5px] border-[#39E1D7] bg-[#12115C] p-6 shadow-[0px_1px_3px_3px_#0000001A] min-[1360px]:w-[362px]"
                style={{
                    backgroundImage: `url(${cover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${clockBg})`,
                    }}
                />

                <div className="relative z-10 flex h-full w-full flex-col items-center">
                    <div className="mt-2 flex flex-col items-center">
                        <p className="text-[40px] font-semibold leading-none text-[#39E1D7]">
                            {displayedDaysLeft}
                        </p>

                        <p className="mt-2 text-center text-[16px] font-bold text-white">
                            {displayedDaysLeft > 0 ? t('daysLeft') : t('completed')}
                        </p>

                        <p className="mt-1 text-center text-[16px] text-[#39E1D7]">
                            {daysSubtitle ??
                                (displayedDaysLeft > 0 ? t('toDeliver') : t('projectDelivered'))}
                        </p>
                    </div>

                    <div className="mt-auto flex w-full items-center gap-[2px]">
                        {Array.from({ length: 46 }).map((_, index) => (
                            <span
                                key={index}
                                className="h-[7px] flex-1 rounded-[1px]"
                                style={{
                                    backgroundColor:
                                        index < filledBars
                                            ? progressColor
                                            : 'rgba(255, 255, 255, 0.8)',
                                }}
                            />
                        ))}
                    </div>

                    {noticeTitle && noticeMessage ? (
                        <div className="mt-6 flex w-full flex-col items-center overflow-hidden rounded-[16px] border border-[#39E1D7] bg-[#39E1D71A]">
                            <div className="flex w-full items-center justify-center rounded-t-[16px] bg-[#39E1D7] px-4 py-1">
                                <p className="text-center text-[16px] font-semibold text-[#12115C]">
                                    {noticeTitle}
                                </p>
                            </div>

                            <div className="flex w-full items-center justify-center px-4 py-2">
                                <p className="text-center text-[14px] leading-[20px] text-white">
                                    {noticeMessage}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 flex w-full flex-col items-center overflow-hidden rounded-[16px] border border-[#39E1D7] bg-[#39E1D71A]">
                            <div className="flex w-full items-center justify-center rounded-t-[16px] bg-[#39E1D7] px-4 py-1">
                                <p className="text-[12px] font-semibold text-[#12115C]">
                                    {t('lastUpdated')}
                                </p>
                            </div>

                            <div className="flex w-full items-center justify-center px-4 py-2">
                                <p className="text-[16px] font-bold text-white">
                                    {formatRelativeTime(displayedLastUpdated)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
