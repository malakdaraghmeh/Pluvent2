import type { ProjectSupportSectionProps } from '../../../../../../utils/types/project-support-section.types';

const ProjectSupportSection = ({
    title,
    children,
    className = '',
}: ProjectSupportSectionProps) => {
    return (
        <section
            className={`w-full rounded-[24px] bg-white shadow-[0px_4px_20px_0px_#00000008] ${className}`}
        >
            <h2 className="text-[20px] font-semibold text-[#12115C]">
                {title}
            </h2>

            {children}
        </section>
    );
};

export default ProjectSupportSection;