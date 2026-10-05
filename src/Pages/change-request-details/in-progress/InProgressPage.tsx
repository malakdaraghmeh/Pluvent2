import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
    ActivityTimeline,
    ChangeRequestHeader,
    RequestOverview,
    type TimelineItem,
} from '../components/ChangeRequestShared';
import {
    InProgressInfoCard,
    InProgressWorkCard,
    WorkingSinceCard,
} from '../components/InProgressCards';

export default function InProgressPage() {
    const { requestId } = useParams();
    const { t } = useTranslation('changeRequestDetails');

    const timeline: TimelineItem[] = [
        {
            title: t('inProgress.timeline.submitted.title'),
            description: (
                <>
                    {t('inProgress.timeline.submitted.beforeName')}{' '}
                    <strong className="font-semibold text-[#1E293B]">{t('requesterName')}</strong>.{' '}
                    {t('inProgress.timeline.submitted.afterName')}
                </>
            ),
            meta: t('inProgress.timeline.submitted.meta'),
            status: 'completed',
        },
        {
            title: t('inProgress.timeline.review.title'),
            description: t('inProgress.timeline.review.description'),
            meta: t('inProgress.timeline.review.meta'),
            status: 'completed',
        },
        {
            title: t('inProgress.timeline.payment.title'),
            description: t('inProgress.timeline.payment.description'),
            meta: t('inProgress.timeline.payment.meta'),
            status: 'completed',
        },
        {
            title: t('inProgress.timeline.started.title'),
            description: t('inProgress.timeline.started.description'),
            meta: t('inProgress.timeline.started.meta'),
            status: 'progress',
        },
    ];

    return (
        <main className="mx-auto flex w-full min-w-0 max-w-[1086px] flex-col gap-6 bg-[#F8FAFC] font-['Sora'] 3xl:max-w-[1500px] 3xl:gap-8 4xl:max-w-[1900px] 4xl:gap-10">
            <ChangeRequestHeader
                requestId={requestId ?? 'CR-010'}
                projectLabel={t('projectLabel')}
                projectName={t('projectName')}
                typeLabel={t('typeLabel')}
                typeName={t('typeName')}
                title={t('title')}
                currentStatus={t('currentStatus')}
                status={t('inProgress.status')}
                statusColor="#0066FF"
                statusBackground="#EEFCFC"
            />

            <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,662px)_minmax(0,408px)] 3xl:grid-cols-[minmax(0,1.62fr)_minmax(0,1fr)] 3xl:gap-6 4xl:gap-8">
                <div className="flex min-w-0 flex-col gap-4">
                    <InProgressWorkCard
                        progress={63}
                        title={t('inProgress.work.title')}
                        description={t('inProgress.work.description')}
                        overallLabel={t('inProgress.work.overall')}
                    />

                    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:gap-6">
                        <InProgressInfoCard
                            label={t('inProgress.estimatedDelivery')}
                            value={t('inProgress.estimatedDeliveryValue')}
                        />

                        <InProgressInfoCard
                            label={t('inProgress.assignedTo')}
                            value={t('inProgress.assignedToValue')}
                            valueClassName="text-[#0066FF]"
                        />
                    </div>
                </div>

                <div className="flex min-w-0 flex-col gap-4">
                    <RequestOverview
                        title={t('overviewTitle')}
                        rows={[
                            {
                                label: t('requestIdLabel'),
                                value: requestId ?? 'CR-010',
                            },
                            {
                                label: t('inProgress.overview.status'),
                                value: t('inProgress.status'),
                                valueClassName: 'text-[#0066FF]',
                            },
                            {
                                label: t('inProgress.overview.agreedCost'),
                                value: t('inProgress.overview.agreedCostValue'),
                            },
                            {
                                label: t('inProgress.overview.agreedTime'),
                                value: t('inProgress.overview.agreedTimeValue'),
                            },
                            {
                                label: t('inProgress.overview.startedOn'),
                                value: t('inProgress.overview.startedOnValue'),
                            },
                        ]}
                    />

                    <WorkingSinceCard
                        title={t('inProgress.workingSince')}
                        value={t('inProgress.workingSinceValue')}
                    />
                </div>
            </div>

            <ActivityTimeline title={t('timelineTitle')} items={timeline} />
        </main>
    );
}
