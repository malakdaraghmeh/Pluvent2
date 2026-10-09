import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FileDocuments from '../../components/FileDocuments';
import ProjectDetails from '../../components/ProjectDetails';
import { projectDetailsData } from '../../data/projectDetails';
import { projectsData } from '../../data/projects';
import ChangeRequestPayments from '../change-requests/components/ChangeRequestPayments';
import ExpiredWarrantySupport from './components/ExpiredWarrantySupport';
import SupportTicket from './components/SupportTicket';

export default function CompletedProjectPage() {
    const { id, locale = 'en' } = useParams<{
        id: string;
        locale: string;
    }>();

    const { t } = useTranslation('projectDetails');

    const project = projectDetailsData.find(item => item.id === Number(id));
    const projectSummary = projectsData.find(item => item.id === Number(id));

    if (!project || !projectSummary || projectSummary.status !== 'Completed') {
        return <Navigate to={`/${locale}/projects`} replace />;
    }

    const hasActiveWarranty = projectSummary.warranty === 'Valid';

    return (
        <main className="mx-auto flex min-h-screen w-full max-w-[1086px] flex-col gap-6 min-[1920px]:max-w-[1400px] min-[2500px]:max-w-[1780px]">
            <ProjectDetails
                project={project}
                daysLeft={hasActiveWarranty ? 315 : 0}
                daysSubtitle={t('inWarrantyPeriod')}
                progressPercent={hasActiveWarranty ? 7 : 100}
                progressColor={hasActiveWarranty ? '#12115C' : '#FF3B30'}
                noticeTitle={t('afterWarrantyEnds')}
                noticeMessage={t('noNewTicketsAfterWarranty')}
                statusLabel={t('status.completed')}
                statusBackgroundColor="#34C7590D"
                statusTextColor="#34C759"
            />

            {hasActiveWarranty ? (
                <>
                    <SupportTicket />

                    <div className="grid w-full grid-cols-1 items-stretch gap-4 xl:grid-cols-[minmax(0,69fr)_minmax(0,38fr)]">
                        <FileDocuments showViewAll={false} showUpload={false} />

                        <ChangeRequestPayments />
                    </div>
                </>
            ) : (
                <ExpiredWarrantySupport />
            )}
        </main>
    );
}
