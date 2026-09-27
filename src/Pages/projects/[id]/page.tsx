import ProjectDetails from "../components/ProjectDetails";
import ProjectTimeline from "../components/ProjectTimeline";
import { projectDetailsData } from "../data/projectDetails";
import ChangeRequestsTable from "../components/ChangeRequestsTable";
import ProjectFilesPayments from "../components/ProjectFilesPayments";
import { useParams } from 'react-router-dom';

export default function Page() {
  const { id } = useParams<{ id: string }>();

  const project = projectDetailsData.find(
    (item) => item.id === Number(id),
  );

  if (!project) {
    return (
      <div>
        <h1>Project Not Found</h1>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen w-full flex-col gap-6">
      {/* Project Information + Days Left */}
      <ProjectDetails project={project} />

      {/* Project Timeline */}
      <ProjectTimeline />

      {/* Change Requests */}
      <ChangeRequestsTable projectId={project.id} />

      {/* Files + Payments */}
      <ProjectFilesPayments />
    </main>
  );
}