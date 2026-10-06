import { useTranslation } from 'react-i18next';
import { ProfileSaveArrowIcon } from '@/assets';
import type { ProfileModalFooterProps } from '../../../../../utils/types/profile.types';

export default function ProfileModalFooter({
    lastUpdated,
    onCancel,
    onSave,
}: ProfileModalFooterProps) {
    const { t, i18n } = useTranslation('profile');
    const isArabic = i18n.language.startsWith('ar');

    return (
        <div className="flex w-full shrink-0 flex-col gap-3 border-t border-[#EAEBEF] px-4 py-4 sm:px-6 md:h-[88px] md:flex-row md:items-center md:justify-between md:gap-4 md:px-8 md:py-5">
            <p
                className={`text-[11px] font-normal text-[#989A9F] ${
                    isArabic ? 'text-right' : 'text-left'
                }`}
            >
                {t('lastUpdated', {
                    value: lastUpdated,
                })}
            </p>

            <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end md:w-auto">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex h-10 w-full items-center justify-center rounded-xl border border-[#12115C] px-5 text-[14px] font-normal text-[#12115C] transition-colors hover:bg-[#F7F7FC] sm:w-[104px]"
                >
                    {t('cancel')}
                </button>

                <button
                    type="button"
                    onClick={onSave}
                    className={`flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#12115C] px-5 text-[14px] font-normal text-white transition-colors hover:bg-[#1C1A79] sm:w-[181px] ${
                        isArabic ? 'flex-row-reverse' : 'flex-row'
                    }`}
                >
                    <span>{t('saveChange')}</span>

                    <ProfileSaveArrowIcon
                        className={`h-4 w-4 shrink-0 ${
                            isArabic ? 'rotate-180' : ''
                        }`}
                    />
                </button>
            </div>
        </div>
    );
}