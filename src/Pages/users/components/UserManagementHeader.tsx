import { useTranslation } from 'react-i18next';
import { Add, Arrow } from '@/assets';
import ActionButton from '@/components/ui/ActionButton';
import PageHeader from '@/components/ui/PageHeader';

type UserManagementHeaderProps = {
    onAddUser: () => void;
};

export default function UserManagementHeader({ onAddUser }: UserManagementHeaderProps) {
    const { t } = useTranslation('usersPage');

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <PageHeader title={t('title')} description={t('description')} />

            <ActionButton
                type="button"
                onClick={onAddUser}
                leadingIcon={<Add aria-hidden="true" className="h-5 w-5 shrink-0" />}
                trailingIcon={<Arrow aria-hidden="true" className="h-4 w-4 shrink-0" />}
                className="!h-[58px] !w-full !rounded-[18px] !px-6 !text-[18px] !font-normal sm:!w-auto"
            >
                {t('addUser')}
            </ActionButton>
        </div>
    );
}
