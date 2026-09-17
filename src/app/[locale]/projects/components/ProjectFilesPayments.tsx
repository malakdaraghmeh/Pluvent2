import FileDocuments from "./FileDocuments";
import Payments from "./Payments";

const ProjectFilesPayments = () => {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        md:gap-5
        lg:grid-cols-[2fr_1fr]
        lg:gap-6
      "
    >
      <FileDocuments />
      <Payments />
    </div>
  );
};

export default ProjectFilesPayments;