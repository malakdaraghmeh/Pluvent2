import FileDocuments from "./FileDocuments";
import Payments from "./Payments";

const ProjectFilesPayments = () => {
  return (
    <div className="grid grid-cols-[2fr_1fr] items-stretch gap-6">
    <FileDocuments />
    <Payments />
  </div>
  );
};

export default ProjectFilesPayments;