import { useTranslation } from 'react-i18next';
import { Delivery, StartDate } from '@/assets';
import { ProjectClockBgImage as clockBg } from '@/assets';
import { ProjectCoverImage as cover } from '@/assets';
import type { ProjectDetailsProps } from '../../../../utils/types/project-details.types';

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

    const isArabic = i18n.language.startsWith('ar');
    const displayedDaysLeft = daysLeft ?? project.daysLeft;
    const displayedLastUpdated = lastUpdated ?? project.lastUpdated;
    const locale = isArabic ? 'ar-EG' : 'en-US';

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
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_362px] min-[1920px]:grid-cols-[minmax(0,1fr)_466px] min-[2500px]:grid-cols-[minmax(0,1fr)_593px]">
            <div className="flex w-full min-w-0 flex-col rounded-[24px] border-[0.5px] border-[#ECEFF4] bg-white p-6 shadow-[0px_1px_3px_3px_#0000001A] xl:min-h-[258px]">
                <div className="flex w-full min-w-0 items-start justify-between gap-4">
                    <h1 className="min-w-0 text-[28px] font-semibold leading-[34px] text-[#3634C7]">
                        {t('projectName')}
                    </h1>

                    <span
                        className="flex h-[26px] w-[101px] shrink-0 items-center justify-center rounded-[6px] px-[10px] py-1 text-[12px] font-medium"
                        style={{
                            backgroundColor:
                                statusBackgroundColor ??
                                (project.status === 'In Progress' ? '#007AFF0D' : '#007AFF0D'),
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

                <p className="mt-2 w-full text-[14px] font-normal leading-[22px] text-[#12115C] xl:min-h-[76px]">
                    {t('description')}
                </p>

                <div className="mt-auto grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                    <div
                        className="relative flex h-[48px] min-w-0 items-center rounded-[16px] border border-[#00E5C810] px-3"
                        style={{
                            background:
                                'linear-gradient(146deg, #F1F1F1 0%, #FFFFFF 30.72%, #EEEBEB 100%)',
                        }}
                    >
                        <span
                            className={`absolute top-1/2 flex -translate-y-1/2 items-center text-[#3634C7] ${
                                isArabic ? 'right-3' : 'left-3'
                            }`}
                        >
                            <StartDate />
                        </span>

                        <p
                            className={`w-full min-w-0 whitespace-nowrap text-[11px] font-normal leading-[16px] text-[#3634C7] min-[1450px]:text-[12px] min-[1700px]:text-[13px] min-[1920px]:text-[14px] ${
                                isArabic ? 'pr-8 text-right' : 'pl-8 text-left'
                            }`}
                        >
                            <span className="text-[#12115C]">{t('startDate')}:</span>{' '}
                            <span className="[unicode-bidi:isolate]">
                                {formatDate(project.startDate)}
                            </span>
                        </p>
                    </div>

                    <div
                        className="relative flex h-[48px] min-w-0 items-center rounded-[16px] border border-[#00E5C810] px-3"
                        style={{
                            background:
                                'linear-gradient(146deg, #F1F1F1 0%, #FFFFFF 30.72%, #EEEBEB 100%)',
                        }}
                    >
                        <span
                            className={`absolute top-1/2 flex -translate-y-1/2 items-center text-[#3634C7] ${
                                isArabic ? 'right-3' : 'left-3'
                            }`}
                        >
                            <Delivery />
                        </span>

                        <p
                            className={`w-full min-w-0 whitespace-nowrap text-[10px] font-normal leading-[16px] text-[#3634C7] min-[1450px]:text-[11px] min-[1700px]:text-[12px] min-[1920px]:text-[14px] ${
                                isArabic ? 'pr-8 text-right' : 'pl-8 text-left'
                            }`}
                        >
                            <span className="text-[#12115C]">{t('delivery')}:</span>{' '}
                            <span className="[unicode-bidi:isolate]">
                                {formatDate(project.deliveryDate)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="relative flex h-[258px] w-full flex-col items-center gap-6 overflow-hidden rounded-[24px] border-[0.5px] border-[#39E1D7] bg-[#12115C] p-6 shadow-[0px_1px_3px_3px_#0000001A] xl:w-full"
                style={{
                    backgroundImage: `url(${cover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
                    style={{
                        backgroundImage: `url(${clockBg})`,
                    }}
                />

                <div className="relative z-10 flex h-full w-full flex-col items-center">
                    <div className="flex flex-col items-center">
                        <p className="text-[40px] font-semibold leading-[48px] text-[#39E1D7]">
                            {displayedDaysLeft}
                        </p>

                        <p className="text-center text-[16px] font-bold leading-[24px] text-white">
                            {displayedDaysLeft > 0 ? t('daysLeft') : t('completed')}
                        </p>

                        <p className="mt-1 text-center text-[16px] leading-[24px] text-[#39E1D7]">
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
                            <div className="flex h-[25px] w-full items-center justify-center rounded-t-[16px] bg-[#39E1D7] px-4">
                                <p className="text-center text-[16px] font-semibold text-[#12115C]">
                                    {noticeTitle}
                                </p>
                            </div>

                            <div className="flex min-h-[42px] w-full items-center justify-center px-4 py-1">
                                <p className="text-center text-[14px] leading-[18px] text-white">
                                    {noticeMessage}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 flex w-full flex-col items-center overflow-hidden rounded-[16px] border border-[#39E1D7] bg-[#39E1D71A]">
                            <div className="flex h-[25px] w-full items-center justify-center rounded-t-[16px] bg-[#39E1D7] px-4">
                                <p className="text-[12px] font-semibold text-[#12115C]">
                                    {t('lastUpdated')}
                                </p>
                            </div>

                            <div className="flex min-h-[42px] w-full items-center justify-center px-4 py-1">
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
