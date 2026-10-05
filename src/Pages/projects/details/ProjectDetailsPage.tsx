import { Navigate, useParams } from 'react-router-dom';
import ProjectDetails from '../components/ProjectDetails';
import ProjectTimeline from '../components/ProjectTimeline';
import ChangeRequestsTable from '../components/ChangeRequestsTable';
import ProjectFilesPayments from '../components/ProjectFilesPayments';
import { projectDetailsData } from '../data/projectDetails';

export default function Page() {
    const { id, locale = 'en' } = useParams<{
        id: string;
        locale: string;
    }>();

    const project = projectDetailsData.find(item => item.id === Number(id));

    if (!project) {
        return <Navigate to={`/${locale}/not-found`} replace />;
    }

    return (
        <main className="custom-container flex min-h-screen w-full min-w-0 flex-col gap-6 pb-8 3xl:gap-8 4xl:gap-10">
            <ProjectDetails project={project} />
            <ProjectTimeline />
            <ChangeRequestsTable />
            <ProjectFilesPayments />
        </main>
    );
}
