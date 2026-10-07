import { Link } from 'react-router-dom';
import { ChangeRequestClockIcon as ClockIcon } from '@/assets';
import { ChangeRequestPaymentArrowIcon as PaymentArrow } from '@/assets';
import type {
    PaymentNextStepCardProps,
    WaitingPaymentCardProps,
} from '../../../../utils/types/change-request-details.types';

export function PaymentNextStepCard({
    title,
    description,
    buttonText,
    to,
}: PaymentNextStepCardProps) {
    return (
        <section className="flex w-full flex-col gap-5 rounded-[20px] border border-[#E8EAEF] bg-white p-6 sm:flex-row sm:items-center sm:justify-between xl:min-h-[94px] 3xl:min-h-[110px] 3xl:gap-6 3xl:p-8 4xl:min-h-[126px] 4xl:p-10">
            <div className="min-w-0 flex-1">
                <h2 className="font-['Sora'] text-[16px] font-semibold leading-none text-[#12115C] 3xl:text-[18px] 4xl:text-[20px]">
                    {title}
                </h2>

                <p className="mt-2 break-words font-['Sora'] text-[14px] font-normal leading-[140%] text-[#64748B] 3xl:mt-3 3xl:text-[15px] 4xl:text-[16px]">
                    {description}
                </p>
            </div>

            <Link
                to={to}
                className="flex h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-[16px] bg-[#12115C] px-5 font-['Sora'] text-[18px] font-normal leading-7 text-white sm:w-[250px] 3xl:h-[50px] 3xl:w-[290px] 3xl:text-[19px] 4xl:h-[56px] 4xl:w-[330px] 4xl:text-[20px]"
            >
                <span>{buttonText}</span>
                <PaymentArrow className="h-[14px] w-[14px] shrink-0 rtl:rotate-180 3xl:h-4 3xl:w-4 4xl:h-[18px] 4xl:w-[18px]" />
            </Link>
        </section>
    );
}

export function WaitingPaymentCard({ title, description }: WaitingPaymentCardProps) {
    return (
        <section className="flex min-h-[78px] w-full items-center gap-3 rounded-[16px] border border-[#12115C10] bg-white p-4 3xl:min-h-[90px] 3xl:gap-4 3xl:p-5 4xl:min-h-[104px] 4xl:p-6">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#12115C]/[0.0627] 3xl:h-[42px] 3xl:w-[42px] 4xl:h-12 4xl:w-12">
                <ClockIcon className="h-[18px] w-[18px] 3xl:h-5 3xl:w-5 4xl:h-[22px] 4xl:w-[22px]" />
            </div>

            <div className="min-w-0">
                <h3 className="break-words font-['Sora'] text-[13px] font-semibold leading-[120%] text-[#12115C] 3xl:text-[14px] 4xl:text-[16px]">
                    {title}
                </h3>

                <p className="mt-1 break-words font-['Sora'] text-[11px] font-normal leading-[140%] text-[#64748B] 3xl:text-[12px] 4xl:text-[13px]">
                    {description}
                </p>
            </div>
        </section>
    );
}

