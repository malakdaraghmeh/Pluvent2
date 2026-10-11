import { useTranslation } from 'react-i18next';
import type { ActionButtonProps } from '../../../utils/types/action-button.types';

export default function ActionButton({
    children,
    leadingIcon,
    trailingIcon,
    className = '',
    type = 'button',
    ...props
}: ActionButtonProps) {
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    return (
        <button
            type={type}
            className={`flex h-[54px] w-full items-center justify-center gap-2 rounded-[12px] bg-[#12115C] px-5 text-[16px] font-semibold leading-5 text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 3xl:h-[60px] 3xl:gap-3 3xl:px-6 3xl:text-[18px] 4xl:h-[64px] 4xl:rounded-[14px] 4xl:px-7 4xl:text-[20px] ${
                isArabic ? 'flex-row-reverse' : ''
            } ${className}`}
            {...props}
        >
            {leadingIcon && (
                <span className="flex shrink-0 items-center justify-center">{leadingIcon}</span>
            )}

            <span>{children}</span>
            {trailingIcon && (
                <span
                    className="flex shrink-0 items-center justify-center"
                    style={{
                        transform: isArabic ? 'scaleX(-1)' : undefined,
                    }}
                >
                    {trailingIcon}
                </span>
            )}
        </button>
    );
}
