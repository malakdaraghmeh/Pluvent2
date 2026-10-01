import type { FinalAgreementCardProps } from '../../../../utils/types/change-request-details.types';

export default function FinalAgreementCard({ title, items, note }: FinalAgreementCardProps) {
    return (
        <section className="flex w-full flex-col gap-4 rounded-[20px] border border-[#E8EAEF] bg-white p-6 3xl:gap-5 3xl:p-8 4xl:gap-6 4xl:p-10">
            <h2 className="font-['Sora'] text-[16px] font-semibold leading-none text-[#12115C] 3xl:text-[18px] 4xl:text-[20px]">
                {title}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 3xl:gap-5 4xl:gap-6">
                {items.map(item => (
                    <div
                        key={item.label}
                        className="flex min-h-[80px] flex-col justify-center gap-2 rounded-[12px] bg-[#12115C05] p-4 3xl:min-h-[96px] 3xl:p-5 4xl:min-h-[110px] 4xl:gap-3 4xl:p-6"
                    >
                        <span className="font-['Sora'] text-[12px] font-normal leading-none text-[#64748B] 3xl:text-[13px] 4xl:text-[14px]">
                            {item.label}
                        </span>

                        <strong className="font-['Sora'] text-[20px] font-semibold leading-none text-[#12115C] 3xl:text-[24px] 4xl:text-[28px]">
                            {item.value}
                        </strong>
                    </div>
                ))}
            </div>

            {note && (
                <p className="font-['Sora'] text-[11px] font-normal leading-[140%] text-[#64748B] 3xl:text-[12px] 4xl:text-[13px]">
                    {note}
                </p>
            )}
        </section>
    );
}
