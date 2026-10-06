import { useTranslation } from 'react-i18next';
import SupportPlanCard from './components/SupportPlanCard';
import { getSupportPlansData } from './data/supportPlansData';

export default function SupportPlans() {
    const { t, i18n } = useTranslation('supportPlans');

    const currentLang = i18n.language || 'en';
    const plansData = getSupportPlansData(t, currentLang);

    return (
        <main className="w-full min-w-0 bg-[#F4F6FA]">
            <section className="mx-auto w-full max-w-[1376px] px-4 pb-6 pt-4 sm:px-5 sm:pb-8 lg:px-6 xl:px-0">
                <h1 className="mb-3 text-[18px] font-bold leading-6 text-[#12115C] sm:text-[19px] xl:text-[20px]">
                    {plansData.pageTitle}
                </h1>

                <div className="grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4 xl:gap-6 xl:py-4">
                    {plansData.plans.map(plan => (
                        <SupportPlanCard
                            key={plan.key}
                            plan={plan}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}