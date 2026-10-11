import { useTranslation } from 'react-i18next';
import type { FinalAgreementCardProps } from '../../../../utils/types/change-request-details.types';

export default function FinalAgreementCard({ title, items, note }: FinalAgreementCardProps) {
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    return (
        <section
            className={`flex w-full flex-col gap-4 rounded-[20px] border border-[#E8EAEF] bg-white p-6 ${
                isArabic ? 'text-right' : 'text-left'
            }`}
        >
            <h2 className="font-['Sora'] text-[16px] font-semibold leading-none text-[#12115C]">
                {title}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {items.map(item => (
                    <div
                        key={item.label}
                        className={`flex min-h-[80px] flex-col justify-center gap-2 rounded-[12px] bg-[#12115C05] p-4 ${
                            isArabic ? 'items-end text-right' : 'items-start text-left'
                        }`}
                    >
                        <span className="font-['Sora'] text-[12px] font-normal leading-none text-[#64748B]">
                            {item.label}
                        </span>

                        <strong className="font-['Sora'] text-[20px] font-semibold leading-none text-[#12115C]">
                            {item.value}
                        </strong>
                    </div>
                ))}
            </div>

            {note && (
                <p
                    className={`font-['Sora'] text-[11px] font-normal leading-[140%] text-[#64748B] ${
                        isArabic ? 'text-right' : 'text-left'
                    }`}
                >
                    {note}
                </p>
            )}
        </section>
    );
}
