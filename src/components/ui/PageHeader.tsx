import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type PageHeaderProps = {
    title: ReactNode;
    description: ReactNode;
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
};

export default function PageHeader({
    title,
    description,
    className = '',
    titleClassName = '',
    descriptionClassName = '',
}: PageHeaderProps) {
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    return (
        <div
            className={`flex min-w-0 flex-col gap-1 ${
                isArabic ? 'text-right' : 'text-left'
            } ${className}`}
        >
            <h1
                className={`text-[24px] font-semibold leading-[30px] text-[#12115C] ${titleClassName}`}
            >
                {title}
            </h1>

            <p
                className={`break-words text-[12px] font-normal leading-[18px] text-[#7E8492] ${descriptionClassName}`}
            >
                {description}
            </p>
        </div>
    );
}
