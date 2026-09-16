import ProjectDetails from "../components/ProjectDetails";
import ProjectTimeline from "../components/ProjectTimeline";
import { projectDetailsData } from "../data/projectDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

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
    </main>
  );
}