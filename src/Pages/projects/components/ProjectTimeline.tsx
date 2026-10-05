import { useTranslation } from 'react-i18next';
import {
    TimelineItem1,
    TimelineItem2,
    TimelineItem3,
    TimelineItem4,
    TimelineItem5,
    TimelineItem6,
    True,
} from '@/assets';
import type { TimelineItem } from '../../../../utils/types/project-details.types';
import { projectTimelineData } from '../data/projectTimeline';

const timelineIcons = {
    1: TimelineItem1,
    2: TimelineItem2,
    3: TimelineItem3,
    4: TimelineItem4,
    5: TimelineItem5,
    6: TimelineItem6,
};

const timelineTitles = {
    1: 'timeline.discoveryStrategy',
    2: 'timeline.designPrototyping',
    3: 'timeline.developmentIntegration',
    4: 'timeline.testingQuality',
    5: 'timeline.launchDeployment',
    6: 'timeline.supportWarranty',
} as const;

export default function ProjectTimeline() {
    const { t } = useTranslation('projectDetails');

    return (
        <div className="box-border flex w-full min-w-0 flex-col gap-8 rounded-[12px] bg-white p-6 shadow-[0px_1px_3px_3px_#0000001A] max-sm:gap-6 max-sm:p-4">
            {' '}
            <h2 className="text-[22px] font-semibold text-[#12115C] max-sm:text-[18px]">
                {t('projectTimeline')}
            </h2>
            <div className="w-full overflow-x-auto overflow-y-hidden pb-2 scrollbar-thin">
                <div className="pt-[9px]">
                    <div className="flex min-w-[900px] items-start justify-between gap-2 sm:min-w-0">
                        {projectTimelineData.map((item: TimelineItem) => {
                            const isActive = item.id === 1;
                            const isLastTwo = item.id === 5 || item.id === 6;
                            const Icon = timelineIcons[item.id as keyof typeof timelineIcons];

                            return (
                                <div
                                    key={item.id}
                                    className="relative flex min-w-0 flex-1 flex-col items-center"
                                >
                                    <div
                                        className="relative flex aspect-square w-[70px] shrink-0 items-center justify-center rounded-[8px] border border-[#F2F2F2] max-sm:w-[58px]"
                                        style={{
                                            background: isActive
                                                ? '#3634C7'
                                                : 'linear-gradient(135deg, #F1F1F1, #FFFFFF, #EEEBEB)',
                                            boxShadow:
                                                '0px 0px 0px 10px #FFFFFF, 0px 4px 10px 0px #EAF7FF',
                                        }}
                                    >
                                        {isActive && (
                                            <span className="absolute -right-[9px] -top-[9px] z-20 flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[40px] border border-[#3634C7] bg-[#39E1D7] p-[4px]">
                                                <True />
                                            </span>
                                        )}

                                        <span
                                            className="block shrink-0"
                                            style={
                                                isActive
                                                    ? {
                                                          filter: 'brightness(0) invert(1)',
                                                      }
                                                    : isLastTwo
                                                      ? {
                                                            filter: 'brightness(0) saturate(100%) invert(60%) sepia(69%) saturate(627%) hue-rotate(145deg) brightness(104%) contrast(54%)',
                                                        }
                                                      : {
                                                            filter: 'invert(42%) sepia(74%) saturate(1043%) hue-rotate(178deg) brightness(87%) contrast(91%)',
                                                        }
                                            }
                                        >
                                            <Icon />
                                        </span>
                                    </div>

                                    <div
                                        className={`relative z-10 mt-2 h-[4px] w-[70px] shrink-0 rounded-[4px] max-sm:w-[58px] ${
                                            isActive ? 'bg-[#3634C7]' : 'bg-transparent'
                                        }`}
                                    />

                                    <span
                                        className={`mt-3 flex min-h-[42px] w-full items-start justify-center text-center text-[14px] font-semibold leading-[150%] max-sm:text-[12px] ${
                                            isActive
                                                ? 'text-[#3634C7]'
                                                : isLastTwo
                                                  ? 'text-[#38B5D3]'
                                                  : 'text-[#377DCE]'
                                        }`}
                                    >
                                        {t(timelineTitles[item.id as keyof typeof timelineTitles])}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
