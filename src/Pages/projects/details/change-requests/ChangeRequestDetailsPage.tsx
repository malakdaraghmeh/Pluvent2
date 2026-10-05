import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FileDocuments from '../../components/FileDocuments';
import ProjectDetails from '../../components/ProjectDetails';
import { changeRequestsData } from '../../data/changeRequests';
import { projectDetailsData } from '../../data/projectDetails';
import ChangeRequestPayments from './components/ChangeRequestPayments';
import SupportTicket from './components/SupportTicket';

export default function ChangeRequestDetailsPage() {
    const { projectId, requestId } = useParams();
    const { t } = useTranslation('projectDetails');

    const project = projectDetailsData.find(item => item.id === Number(projectId));
    const request = changeRequestsData.find(item => item.id === requestId);

    if (!project || !request) {
        return <div>Not Found</div>;
    }

    return (
        <main className="flex min-h-screen w-full flex-col gap-6">
            <ProjectDetails
                project={project}
                daysLeft={315}
                daysSubtitle={t('inWarrantyPeriod')}
                progressPercent={7}
                progressColor="#12115C"
                noticeTitle={t('afterWarrantyEnds')}
                noticeMessage={t('noNewTicketsAfterWarranty')}
                statusLabel={t('status.completed')}
                statusBackgroundColor="#34C7590D"
                statusTextColor="#34C759"
            />

            <SupportTicket />

            <div className="grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_380px] 3xl:grid-cols-[minmax(0,1fr)_420px] 4xl:grid-cols-[minmax(0,1fr)_460px]">
                <FileDocuments showViewAll={false} showUpload={false} />
                <ChangeRequestPayments />
            </div>
        </main>
    );
}