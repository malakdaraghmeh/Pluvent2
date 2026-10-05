import FileDocuments from './FileDocuments';
import Payments from './Payments';

const ProjectFilesPayments = () => {
    return (
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-4 md:gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)] xl:gap-6 min-[1920px]:gap-7 min-[2500px]:gap-8">
            <FileDocuments />
            <Payments />
        </div>
    );
};

export default ProjectFilesPayments;
