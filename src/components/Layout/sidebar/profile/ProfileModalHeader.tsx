import { useTranslation } from 'react-i18next';
import { ProfileCloseIcon } from '@/assets';
import type { ProfileModalHeaderProps } from '../../../../../utils/types/profile.types';

export default function ProfileModalHeader({ onClose }: ProfileModalHeaderProps) {
    const { t, i18n } = useTranslation('profile');
    const isArabic = i18n.language.startsWith('ar');

    return (
        <div
            className={`flex h-auto w-full shrink-0 items-start justify-between gap-4 px-5 pb-4 pt-5 sm:px-6 md:h-[102px] md:px-8 md:pb-5 md:pt-7 ${
                isArabic ? 'flex-row-reverse' : 'flex-row'
            }`}
        >
            <div className={`min-w-0 flex-1 ${isArabic ? 'text-right' : 'text-left'}`}>
                <h2
                    id="profile-information-title"
                    className="text-[18px] font-semibold leading-[1.25] text-[#12115C] sm:text-[20px] md:text-[22px]"
                >
                    {t('title')}
                </h2>

                <p className="mt-2 text-[13px] font-normal leading-5 text-[#615E8B] sm:text-[14px]">
                    {t('description')}
                </p>
            </div>

            <button
                type="button"
                onClick={onClose}
                aria-label={t('close')}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#12115C] text-white transition-all duration-200 hover:bg-[#1B1975] active:scale-95"
            >
                <ProfileCloseIcon className="h-[18px] w-[18px]" />
            </button>
        </div>
    );
}