import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import ProjectDetails from "../../../components/ProjectDetails";
import FileDocuments from "../../../components/FileDocuments";

import { projectDetailsData } from "../../../data/projectDetails";
import { changeRequestsData } from "../../../data/changeRequests";

import ChangeRequestPayments from "../components/ChangeRequestPayments";
import SupportTicket from "../components/SupportTicket";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
    requestId: string;
  }>;
};

export default async function ChangeRequestDetailsPage({
  params,
}: Props) {
  const { locale, id, requestId } = await params;

  // Get translations (Server Component)
  const t = await getTranslations({
    locale,
    namespace: "projectDetails",
  });

  // Get the parent project
  const project = projectDetailsData.find(
    (item) => item.id === Number(id)
  );

  // Get the selected change request
  const request = changeRequestsData.find(
    (item) => item.id === requestId
  );

  if (!project || !request) {
    notFound();
  }

  return (
    <main className="flex min-h-screen w-full flex-col gap-6">
      {/* Project Details */}
      <ProjectDetails
        project={project}
        daysLeft={30}
        daysSubtitle={t("inWarrantyPeriod")}
        progressPercent={7}
        progressColor="#12115C"
        noticeTitle={t("afterWarrantyEnds")}
        noticeMessage={t("noNewTicketsAfterWarranty")}
        statusLabel={t("status.completed")}
        statusBackgroundColor="#34C7590D"
        statusTextColor="#34C759"
      />

      {/* Change Request Details / Support Ticket */}
      <SupportTicket />

      {/* Files & Payments Section */}
      <div
        className="
          grid
          w-full
          grid-cols-1
          items-start
          gap-6
          lg:grid-cols-[minmax(0,1fr)_380px]
        "
      >
        <FileDocuments
          showViewAll={false}
          showUpload={false}
        />

        <ChangeRequestPayments />
      </div>
    </main>
  );
}