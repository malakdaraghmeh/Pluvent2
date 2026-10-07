import { useTranslation } from 'react-i18next';
import { Add, Arrow } from '@/assets';
import ActionButton from '@/components/ui/ActionButton';
import type { UserManagementHeaderProps } from '../../../../utils/types/users.types';

export default function UserManagementHeader({ onAddUser }: UserManagementHeaderProps) {
    const { t, i18n } = useTranslation('usersPage');
    const isArabic = i18n.language.startsWith('ar');

    return (
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className={`flex min-w-0 flex-col gap-1 ${isArabic ? 'text-right' : 'text-left'}`}>
                <h1 className="text-[24px] font-semibold leading-[30px] text-[#12115C] min-[1920px]:text-[28px] min-[1920px]:leading-[34px] min-[2500px]:text-[30px] min-[2500px]:leading-[36px]">
                    {t('titleUser')}
                </h1>

                <p className="text-[12px] font-normal leading-[18px] text-[#7E8492] min-[1920px]:text-[14px] min-[1920px]:leading-[20px] min-[2500px]:text-[16px] min-[2500px]:leading-[22px]">
                    {t('description')}
                </p>
            </div>

            <ActionButton
                type="button"
                onClick={onAddUser}
                leadingIcon={<Add aria-hidden="true" className="h-5 w-5 shrink-0" />}
                trailingIcon={
                    <Arrow
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 ${isArabic ? 'rotate-180' : ''}`}
                    />
                }
                className="!h-[44px] !w-full !gap-2 !rounded-[16px] !bg-[#12115C] !px-5 !text-[18px] !font-normal !leading-[28px] !text-white sm:!w-auto sm:!min-w-[154px] 3xl:!h-[44px] 3xl:!rounded-[16px] 3xl:!px-5 3xl:!text-[18px] 4xl:!h-[44px] 4xl:!rounded-[16px] 4xl:!px-5 4xl:!text-[18px]"
            >
                {t('addUser')}
            </ActionButton>
        </div>
    );
}
