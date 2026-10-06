import { useTranslation } from 'react-i18next';
import { Check10 } from '@/assets';
import type { SupportPlanCardProps } from '../../../../utils/types/support-plans.types';

export default function SupportPlanCard({
    plan,
}: SupportPlanCardProps) {
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    return (
        <article
            className={
                plan.popular
                    ? 'relative flex min-h-[430px] w-full flex-col rounded-[24px] bg-[linear-gradient(90deg,#3634C7,#39E1D7)] p-[2px] pt-3 shadow-[0_8px_24px_rgba(18,17,92,0.08)] sm:min-h-[470px] xl:h-[536px]'
                    : 'flex min-h-[430px] w-full flex-col rounded-[24px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:min-h-[470px] sm:p-6 xl:h-[536px] xl:p-8'
            }
        >
            <div
                className={
                    plan.popular
                        ? 'flex h-full min-h-0 flex-1 flex-col rounded-[20px] bg-white px-[18px] pb-[18px] pt-5 sm:px-[22px] sm:pb-[22px] sm:pt-6 xl:rounded-[21px] xl:px-[30px] xl:pb-[30px] xl:pt-5'
                        : 'flex h-full min-h-0 flex-1 flex-col'
                }
            >
                <h2
                    className={`min-h-[18px] whitespace-nowrap text-[12px] font-bold leading-none text-[#12115C] min-[480px]:text-[13px] sm:text-[14px] lg:text-[16px] min-[1440px]:text-[18px] ${
                        isArabic ? 'text-right' : 'text-left'
                    }`}
                >
                    {plan.title}
                </h2>

                <button
                    type="button"
                    className={
                        plan.popular
                            ? 'mt-4 flex h-[35px] w-full items-center justify-center rounded-[100px] bg-[#4F46E5] px-4 text-[10px] font-semibold leading-none text-white transition-opacity hover:opacity-90 sm:h-[37px] sm:text-[11px] xl:h-[39px] xl:px-6 xl:text-[12px]'
                            : 'mt-4 flex h-[35px] w-full items-center justify-center rounded-[100px] border border-[#12115C] bg-white px-4 text-[10px] font-semibold leading-none text-[#12115C] transition-colors hover:bg-[#F8F8FC] sm:h-[37px] sm:text-[11px] xl:h-[39px] xl:px-6 xl:text-[12px]'
                    }
                >
                    {plan.buttonText}
                </button>

                <div className="mt-[14px] h-px w-full bg-[#E2E8F0] xl:mt-[15px]" />

                <ul className="mt-4 flex w-full flex-col gap-[10px] sm:gap-3 xl:gap-[14px]">
                    {plan.features.map(feature => (
                        <li
                            key={feature}
                            className={`flex w-full min-w-0 items-start gap-[6px] sm:gap-[7px] xl:gap-2 ${
                                isArabic
                                    ? 'flex-row-reverse text-right'
                                    : 'flex-row text-left'
                            }`}
                        >
                            <span className="flex h-3 w-4 shrink-0 items-center justify-center">
                                <Check10
                                    aria-hidden="true"
                                    className="h-3 w-3 shrink-0"
                                />
                            </span>

                            <span className="min-w-0 flex-1 text-[10px] font-normal leading-[15px] text-[#12115C] sm:text-[11px] sm:leading-4 xl:text-[12px] xl:leading-[18px]">
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}