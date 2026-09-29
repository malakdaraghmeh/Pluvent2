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
            <div className="flex flex-col gap-1">
                <h1 className="text-start text-[24px] font-semibold leading-[30px] text-black">
                    {t('title')}
                </h1>

                <p className="break-words text-start text-[12px] leading-[18px] text-[#7E8492]">
                    {t('description')}
                </p>
            </div>

            <ProjectsToolbar
                searchValue={searchValue}
                filter={filter}
                onSearchChange={setSearchValue}
                onFilterChange={setFilter}
            />

            <section className="w-full min-w-0 rounded-[24px] border border-[#39E1D7] bg-white p-4 sm:p-5 lg:p-6">
                {filteredProjects.length ? (
                    <div className="flex w-full min-w-0 flex-col gap-5 sm:gap-6 lg:gap-8">
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
