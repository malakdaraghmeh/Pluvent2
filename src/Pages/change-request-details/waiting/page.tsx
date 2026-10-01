import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
    ActivityTimeline,
    ChangeRequestHeader,
    NextStepsCard,
    RequestOverview,
    type TimelineItem,
} from '../components/ChangeRequestShared';
import FinalAgreementCard from '../components/FinalAgreementCard';
import WaitingDiscussion from '../components/WaitingDiscussion';

export default function WaitingUserInputPage() {
    const { requestId } = useParams();
    const { t } = useTranslation('changeRequestDetails');

    const timeline: TimelineItem[] = [
        {
            title: t('waiting.timeline.submitted.title'),
            description: (
                <>
                    {t('waiting.timeline.submitted.beforeName')}{' '}
                    <strong className="font-semibold text-[#1E293B]">{t('requesterName')}</strong>.{' '}
                    {t('waiting.timeline.submitted.afterName')}
                </>
            ),
            meta: t('waiting.timeline.submitted.meta'),
            status: 'completed',
        },
        {
            title: t('waiting.timeline.review.title'),
            description: t('waiting.timeline.review.description'),
            meta: t('waiting.timeline.review.meta'),
            status: 'completed',
        },
        {
            title: t('waiting.timeline.proposal.title'),
            description: t('waiting.timeline.proposal.description'),
            meta: t('waiting.timeline.proposal.meta'),
            status: 'progress',
        },
        {
            title: t('waiting.timeline.response.title'),
            description: t('waiting.timeline.response.description'),
            meta: t('waiting.timeline.response.meta'),
            status: 'pending',
        },
    ];

    return (
        <main className="mx-auto flex w-full min-w-0 max-w-[1086px] flex-col gap-6 bg-[#F8FAFC] font-['Sora'] 3xl:max-w-[1500px] 3xl:gap-8 4xl:max-w-[1900px] 4xl:gap-10">
            <ChangeRequestHeader
                requestId={requestId ?? 'CR-002'}
                projectLabel={t('projectLabel')}
                projectName={t('projectName')}
                typeLabel={t('typeLabel')}
                typeName={t('typeName')}
                title={t('title')}
                currentStatus={t('currentStatus')}
                status={t('waiting.status')}
                statusColor="#F38020"
                statusBackground="#FFF5EC"
            />

            <FinalAgreementCard
                title={t('waiting.finalAgreement')}
                items={[
                    {
                        label: t('waiting.agreedCost'),
                        value: t('waiting.cost'),
                    },
                    {
                        label: t('waiting.agreedTime'),
                        value: t('waiting.time'),
                    },
                ]}
            />

            <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,670px)_minmax(0,400px)] 3xl:grid-cols-[minmax(0,1.675fr)_minmax(0,1fr)] 3xl:gap-6 4xl:gap-8">
                <WaitingDiscussion
                    discussTitle={t('waiting.discuss.title')}
                    discussDescription={t('waiting.discuss.description')}
                    pulventName={t('waiting.chat.pulventName')}
                    pulventTime={t('waiting.chat.pulventTime')}
                    pulventMessage={t('waiting.chat.pulventMessage')}
                    userName={t('waiting.chat.userName')}
                    userTime={t('waiting.chat.userTime')}
                    userMessage={t('waiting.chat.userMessage')}
                    placeholder={t('waiting.chat.placeholder')}
                />

                <div className="flex min-w-0 flex-col gap-4 3xl:gap-6 4xl:gap-8">
                    <RequestOverview
                        title={t('overviewTitle')}
                        rows={[
                            {
                                label: t('requestIdLabel'),
                                value: requestId ?? 'CR-002',
                            },
                            {
                                label: t('waiting.overview.status'),
                                value: t('waiting.overview.active'),
                                valueClassName: 'text-[#34C759]',
                            },
                            {
                                label: t('waiting.overview.subStatus'),
                                value: t('waiting.status'),
                                valueClassName: 'text-[#F38020]',
                            },
                            {
                                label: t('requestedOn'),
                                value: t('waiting.overview.requestedOnValue'),
                            },
                            {
                                label: t('lastUpdatedLabel'),
                                value: t('waiting.overview.lastUpdatedValue'),
                            },
                        ]}
                    />

                    <NextStepsCard
                        title={t('nextTitle')}
                        description={t('waiting.nextDescription')}
                    />
                </div>
            </div>

            <ActivityTimeline title={t('timelineTitle')} items={timeline} />
        </main>
    );
}

