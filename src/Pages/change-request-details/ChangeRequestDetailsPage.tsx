import { useTranslation } from 'react-i18next';
import {
    ActivityTimeline,
    ChangeRequestHeader,
    NextStepsCard,
    RequestOverview,
    type TimelineItem,
} from './components/ChangeRequestShared';
import InReviewDetails from './components/InReviewDetails';

export default function ChangeRequestReviewDetails() {
    const { t } = useTranslation('changeRequestDetails');

    const timeline: TimelineItem[] = [
        {
            title: t('step1Title'),
            description: (
                <span
                    dangerouslySetInnerHTML={{
                        __html: t('step1Desc'),
                    }}
                />
            ),
            meta: t('step1Time'),
            status: 'completed',
        },
        {
            title: t('step2Title'),
            description: t('step2Desc'),
            meta: t('step2Status'),
            status: 'progress',
        },
        {
            title: t('step3Title'),
            description: t('step3Desc'),
            meta: t('step3Status'),
            status: 'pending',
        },
    ];

    return (
        <main className="mx-auto flex w-full min-w-0 max-w-[1086px] flex-col gap-6 bg-[#F8FAFC] font-['Sora'] 3xl:max-w-[1500px] 3xl:gap-8 4xl:max-w-[1900px] 4xl:gap-10">
            <ChangeRequestHeader
                requestId={t('crId')}
                projectLabel={t('projectLabel')}
                projectName={t('projectName')}
                typeLabel={t('typeLabel')}
                typeName={t('typeName')}
                title={t('title')}
                currentStatus={t('currentStatus')}
                status={t('statusInReview')}
                statusColor="#12115C"
                statusBackground="#F8FAFC"
            />

            <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,670px)_minmax(0,400px)] 3xl:grid-cols-[minmax(0,1.675fr)_minmax(0,1fr)] 3xl:gap-6 4xl:gap-8">
                <InReviewDetails />

                <div className="flex min-w-0 flex-col gap-4 3xl:gap-6 4xl:gap-8">
                    <RequestOverview
                        title={t('overviewTitle')}
                        rows={[
                            {
                                label: t('requestIdLabel'),
                                value: t('crId'),
                            },
                            {
                                label: t('currentStatus'),
                                value: t('statusInReview'),
                                valueClassName: 'text-[#4F46E5]',
                            },
                            {
                                label: t('requestedOn'),
                                value: t('requestDate'),
                            },
                            {
                                label: t('lastUpdatedLabel'),
                                value: t('requestDate'),
                            },
                        ]}
                    />

                    <NextStepsCard title={t('nextTitle')} description={t('nextDescription')} />
                </div>
            </div>

            <ActivityTimeline title={t('timelineTitle')} items={timeline} />
        </main>
    );
}

