import { useTranslation } from 'react-i18next';

import { ProfileEditIcon } from '@/assets';

import type { ProfileInfoSectionProps } from '../../../../../utils/types/profile.types';

export default function ProfileInfoSection({
    title,
    icon: SectionIcon,
    onEdit,
    children,
}: ProfileInfoSectionProps) {
    const { t } = useTranslation('profile');

    return (
        <section className="w-full rounded-2xl border border-[#DFF4F1] bg-white p-4">
            <div className="mb-3 flex h-7 w-full items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-1">
                    <SectionIcon className="h-4 w-4 shrink-0" />

                    <h3 className="truncate text-[12px] font-semibold leading-[16px] text-[#3634C7]">
                        {title}
                    </h3>
                </div>

                <button
                    type="button"
                    onClick={onEdit}
                    className="
                        flex
                        h-7
                        min-w-[71px]
                        shrink-0
                        items-center
                        justify-center
                        gap-1.5
                        rounded-lg
                        bg-[#EEF2FF]
                        px-3
                        text-[11px]
                        font-semibold
                        text-[#3634C7]
                        transition-colors
                        hover:bg-[#E4E9FF]
                    "
                >
                    <ProfileEditIcon className="h-4 w-4 shrink-0" />
                    <span>{t('edit')}</span>
                </button>
            </div>

            {children}
        </section>
    );
}
