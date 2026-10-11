import { useTranslation } from 'react-i18next';
import type { ProjectSupportSectionProps } from '../../../../../../utils/types/project-support-section.types';

const ProjectSupportSection = ({ title, children, className = '' }: ProjectSupportSectionProps) => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    return (
        <section
            className={`w-full rounded-[24px] bg-white shadow-[0px_4px_20px_0px_#00000008] ${className}`}
        >
            <h2
                className={`w-full text-[20px] font-semibold text-[#12115C] ${
                    isArabic ? 'text-right' : 'text-left'
                }`}
            >
                {title}
            </h2>

            {children}
        </section>
    );
};

export default ProjectSupportSection;
