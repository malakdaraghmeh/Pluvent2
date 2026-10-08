import PageHeader from '@/components/ui/PageHeader';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './components/ProjectCard';
import ProjectsToolbar from './components/ProjectsToolbar';
import { projectsData } from './data/projects';
import type { ProjectFilter } from '../../../utils/types/projects.types';

const ProjectPage = () => {
    const { t } = useTranslation('projectsPage');

    const [searchValue, setSearchValue] = useState('');
    const [filter, setFilter] = useState<ProjectFilter>('all');

    const filteredProjects = useMemo(() => {
        const search = searchValue.trim().toLowerCase();

        return projectsData.filter(project => {
            const matchesSearch =
                !search ||
                project.title.toLowerCase().includes(search) ||
                t('cardDescription').toLowerCase().includes(search);

            const matchesFilter =
                filter === 'all' ||
                (filter === 'inProgress' && project.status === 'In Progress') ||
                (filter === 'completed' && project.status === 'Completed');

            return matchesSearch && matchesFilter;
        });
    }, [filter, searchValue, t]);

    return (
        <main className="custom-container flex min-h-screen w-full min-w-0 flex-col gap-5 pb-8">
            <PageHeader
                title={t('title')}
                description={t('description')}
                titleClassName="!text-black"
            />

            <section className="flex w-full min-w-0 flex-col gap-5 rounded-[24px] bg-white p-4 sm:p-5 lg:gap-8 lg:p-8">
                <ProjectsToolbar
                    searchValue={searchValue}
                    filter={filter}
                    onSearchChange={setSearchValue}
                    onFilterChange={setFilter}
                />

                {filteredProjects.length ? (
                    <div className="flex w-full min-w-0 flex-col gap-5 sm:gap-6">
                        {filteredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[180px] items-center justify-center text-[14px] text-[#7E8492]">
                        {t('noResults')}
                    </div>
                )}
            </section>
        </main>
    );
};

export default ProjectPage;
