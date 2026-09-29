import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projectProgressData } from '../data/projectProgress';
import ProjectProgressCard from './ProjectProgressCard';

const ProjectProgress = () => {
    const { t } = useTranslation('projectsPage');
    const { locale = 'en' } = useParams();

    return (
        <section className="flex h-full w-full min-w-0 flex-col rounded-[24px] bg-white p-4 shadow-sm sm:p-5 lg:p-6 3xl:p-7 4xl:p-8">
            <div className="mb-4 flex w-full min-w-0 items-start justify-between gap-3 sm:mb-5 lg:mb-6 3xl:mb-7 4xl:mb-8">
                <h2 className="min-w-0 break-words text-[20px] font-semibold leading-[26px] text-[#12115C] 3xl:text-[22px] 3xl:leading-[28px] 4xl:text-[24px] 4xl:leading-[30px]">
                    {t('projectProgress')}
                </h2>

                <Link
                    to={`/${locale}/projects`}
                    className="shrink-0 text-[16px] leading-[24px] text-[#3634C7] transition-opacity hover:opacity-70 3xl:text-[17px] 4xl:text-[18px]"
                >
                    {t('viewAll')}
                </Link>
            </div>

            <div className="flex w-full min-w-0 flex-1 flex-col gap-4 sm:gap-5 lg:gap-6 3xl:gap-7 4xl:gap-8">
                {projectProgressData.map(project => (
                    <ProjectProgressCard key={project.id} {...project} />
                ))}
            </div>
        </section>
    );
};

export default ProjectProgress;
