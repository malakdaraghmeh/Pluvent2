import FileDocuments from './FileDocuments';
import Payments from './Payments';

const ProjectFilesPayments = () => {
    return (
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)] lg:gap-6 3xl:gap-7 4xl:gap-8">
            <FileDocuments />
            <Payments />
        </div>
    );
};

export default ProjectFilesPayments;
