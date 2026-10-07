import { useTranslation } from 'react-i18next';
import GeneralSelect from '@/components/ui/GeneralSelect';
import type { ProjectFilterDropdownProps } from '../../../../utils/types/billing.types';

const ProjectFilterDropdown = ({
    value,
    projects,
    allProjectsLabel,
    onChange,
}: ProjectFilterDropdownProps) => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    return (
        <GeneralSelect
            value={value}
            placeholder={allProjectsLabel}
            options={[
                {
                    label: allProjectsLabel,
                    value: 'all',
                },
                ...projects.map(project => ({
                    label: project,
                    value: project,
                })),
            ]}
            isArabic={isArabic}
            onChange={onChange}
            className="sm:w-[220px] sm:shrink-0"
        />
    );
};

export default ProjectFilterDropdown;
