import { useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

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

export default function ChangeRequestDetailsPage({
  params,
}: Props) {
  const { id, requestId } = useParams();

  // Get translations (Server Component)
  const { t } = useTranslation("projectDetails");

  // Get the parent project
  const project = projectDetailsData.find(
    (item) => item.id === Number(id)
  );

  // Get the selected change request
  const request = changeRequestsData.find(
    (item) => item.id === requestId
  );

  if (!project || !request) {
    return <div>Not Found</div>;
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