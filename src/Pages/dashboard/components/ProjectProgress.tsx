import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projectProgressData } from '../data/projectProgress';
import ProjectProgressCard from './ProjectProgressCard';

const ProjectProgress = () => {
    const { t } = useTranslation('projectsPage');
    const { locale = 'en' } = useParams();

    const isArabic = locale.startsWith('ar');

    return (
        <section className="flex h-auto w-full min-w-0 flex-col rounded-[24px] bg-white p-4 shadow-sm sm:p-5 xl:h-[577px] xl:p-6">
            <div
                className={`flex w-full min-w-0 items-center justify-between gap-4 ${
                    isArabic ? 'flex-row-reverse' : 'flex-row'
                }`}
            >
                <h2
                    className={`min-w-0 text-[18px] font-semibold leading-[24px] text-[#12115C] sm:text-[20px] sm:leading-[25px] ${
                        isArabic ? 'text-right' : 'text-left'
                    }`}
                >
                    {t('projectProgress')}
                </h2>

                <Link
                    to={`/${locale}/projects`}
                    className="shrink-0 whitespace-nowrap text-[14px] font-normal leading-[14px] text-[#3634C7] transition-opacity hover:opacity-70"
                >
                    {t('viewAll')}
                </Link>
            </div>

            <div className="mt-4 flex w-full min-w-0 flex-col gap-4 sm:mt-5 sm:gap-5 xl:mt-6 xl:h-[480px] xl:gap-[18px]">
                {projectProgressData.map(project => (
                    <ProjectProgressCard key={project.id} {...project} />
                ))}
            </div>
        </section>
    );
};

export default ProjectProgress;
