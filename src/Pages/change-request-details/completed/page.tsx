import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
    ActivityTimeline,
    ChangeRequestHeader,
    RequestOverview,
    type TimelineItem,
} from '../components/ChangeRequestShared';
import ChangeRequestProgressCard from '../components/ChangeRequestProgressCard';

export default function CompletedChangeRequestPage() {
    const { requestId } = useParams();
    const { t } = useTranslation('changeRequestDetails');

    const timeline: TimelineItem[] = [
        {
            title: t('completed.timeline.submitted.title'),
            description: (
                <>
                    {t('completed.timeline.submitted.beforeName')}{' '}
                    <strong className="font-semibold text-[#1E293B]">{t('requesterName')}</strong>.{' '}
                    {t('completed.timeline.submitted.afterName')}
                </>
            ),
            meta: t('completed.timeline.submitted.meta'),
            status: 'completed',
        },
        {
            title: t('completed.timeline.review.title'),
            description: t('completed.timeline.review.description'),
            meta: t('completed.timeline.review.meta'),
            status: 'completed',
        },
        {
            title: t('completed.timeline.payment.title'),
            description: t('completed.timeline.payment.description'),
            meta: t('completed.timeline.payment.meta'),
            status: 'completed',
        },
        {
            title: t('completed.timeline.delivered.title'),
            description: t('completed.timeline.delivered.description'),
            meta: t('completed.timeline.delivered.meta'),
            status: 'completed',
        },
    ];

    return (
        <main className="mx-auto flex w-full min-w-0 max-w-[1086px] flex-col gap-6 bg-[#F8FAFC] font-['Sora'] 3xl:max-w-[1500px] 3xl:gap-8 4xl:max-w-[1900px] 4xl:gap-10">
            <ChangeRequestHeader
                requestId={requestId ?? 'CR-007'}
                projectLabel={t('projectLabel')}
                projectName={t('projectName')}
                typeLabel={t('typeLabel')}
                typeName={t('typeName')}
                title={t('title')}
                currentStatus={t('currentStatus')}
                status={t('completed.status')}
                statusColor="#34C759"
                statusBackground="#F3FCF6"
            />

            <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,662px)_minmax(0,408px)] 3xl:grid-cols-[minmax(0,1.62fr)_minmax(0,1fr)] 3xl:gap-6 4xl:gap-8">
                <ChangeRequestProgressCard
                    progress={100}
                    title={t('completed.work.title')}
                    description={t('completed.work.description')}
                    overallLabel={t('completed.work.overall')}
                    startColor="#34C759"
                    endColor="#34C759"
                    titleColor="#34C759"
                    className="min-h-[270px]"
                />

                <RequestOverview
                    title={t('overviewTitle')}
                    rows={[
                        {
                            label: t('requestIdLabel'),
                            value: requestId ?? 'CR-007',
                        },
                        {
                            label: t('completed.overview.status'),
                            value: t('completed.status'),
                            valueClassName: 'text-[#34C759]',
                        },
                        {
                            label: t('completed.overview.agreedCost'),
                            value: t('completed.overview.agreedCostValue'),
                        },
                        {
                            label: t('completed.overview.agreedTime'),
                            value: t('completed.overview.agreedTimeValue'),
                        },
                        {
                            label: t('completed.overview.startedOn'),
                            value: t('completed.overview.startedOnValue'),
                        },
                        {
                            label: t('completed.overview.completedOn'),
                            value: t('completed.overview.completedOnValue'),
                            valueClassName: 'text-[#12115C]',
                        },
                    ]}
                />
            </div>

            <ActivityTimeline title={t('timelineTitle')} items={timeline} />
        </main>
    );
}
