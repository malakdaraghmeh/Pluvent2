import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
    ActivityTimeline,
    ChangeRequestHeader,
    RequestOverview,
    type TimelineItem,
} from '../components/ChangeRequestShared';
import FinalAgreementCard from '../components/FinalAgreementCard';
import { PaymentNextStepCard, WaitingPaymentCard } from '../components/PaymentCards';

export default function PendingPaymentPage() {
    const { requestId } = useParams();
    const { t, i18n } = useTranslation('changeRequestDetails');
    const locale = i18n.resolvedLanguage === 'ar' ? 'ar' : 'en';

    const timeline: TimelineItem[] = [
        {
            title: t('payment.timeline.step1Title'),
            description: t('payment.timeline.step1Description'),
            meta: t('payment.timeline.step1Meta'),
            status: 'completed',
        },
        {
            title: t('payment.timeline.step2Title'),
            description: t('payment.timeline.step2Description'),
            meta: t('payment.timeline.step2Meta'),
            status: 'completed',
        },
        {
            title: t('payment.timeline.step3Title'),
            description: t('payment.timeline.step3Description'),
            meta: t('payment.timeline.step3Meta'),
            status: 'completed',
        },
        {
            title: t('payment.timeline.step4Title'),
            description: t('payment.timeline.step4Description'),
            meta: t('payment.timeline.step4Meta'),
            status: 'progress',
        },
    ];

    return (
        <main className="mx-auto flex w-full min-w-0 max-w-[1086px] flex-col gap-6 bg-[#F8FAFC] font-['Sora'] 3xl:max-w-[1500px] 3xl:gap-8 4xl:max-w-[1900px] 4xl:gap-10">
            <ChangeRequestHeader
                requestId={requestId ?? 'CR-009'}
                projectLabel={t('projectLabel')}
                projectName={t('projectName')}
                typeLabel={t('typeLabel')}
                typeName={t('typeName')}
                title={t('title')}
                currentStatus={t('currentStatus')}
                status={t('payment.status')}
                statusColor="#EF4444"
                statusBackground="#FEF6F6"
            />

            <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,702px)_minmax(0,360px)] xl:gap-6 3xl:grid-cols-[minmax(0,1.95fr)_minmax(0,1fr)] 3xl:gap-8 4xl:gap-10">
                <div className="flex min-w-0 flex-col gap-4 3xl:gap-6 4xl:gap-8">
                    <FinalAgreementCard
                        title={t('payment.finalAgreement')}
                        items={[
                            {
                                label: t('payment.agreedCost'),
                                value: t('payment.cost'),
                            },
                            {
                                label: t('payment.agreedTime'),
                                value: t('payment.time'),
                            },
                        ]}
                        note={t('payment.agreementNote')}
                    />

                    <PaymentNextStepCard
                        title={t('payment.whatsNext')}
                        description={t('payment.nextDescription')}
                        buttonText={t('payment.payNow')}
                        to={`/${locale}/billing`}
                    />
                </div>

                <div className="flex min-w-0 flex-col gap-4 3xl:gap-6 4xl:gap-8">
                    <RequestOverview
                        title={t('overviewTitle')}
                        rows={[
                            {
                                label: t('requestIdLabel'),
                                value: requestId ?? 'CR-009',
                            },
                            {
                                label: t('payment.overview.status'),
                                value: t('payment.status'),
                                valueClassName: 'text-[#EF4444]',
                            },
                            {
                                label: t('payment.agreedCost'),
                                value: t('payment.cost'),
                            },
                            {
                                label: t('payment.agreedTime'),
                                value: t('payment.time'),
                            },
                            {
                                label: t('payment.overview.agreedOn'),
                                value: t('payment.overview.agreedOnValue'),
                            },
                        ]}
                    />

                    <WaitingPaymentCard
                        title={t('payment.waitingTitle')}
                        description={t('payment.waitingSince')}
                    />
                </div>
            </div>

            <ActivityTimeline title={t('timelineTitle')} items={timeline} />
        </main>
    );
}

