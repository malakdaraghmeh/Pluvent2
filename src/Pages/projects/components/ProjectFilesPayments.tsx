import FileDocuments from './FileDocuments';
import Payments from './Payments';

const ProjectFilesPayments = () => {
    return (
        <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-4 xl:grid-cols-[minmax(0,69fr)_minmax(0,38fr)]">
            <FileDocuments />
            <Payments />
        </div>
    );
};

export default ProjectFilesPayments;