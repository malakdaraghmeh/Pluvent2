import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DropDown, MoreVertical, Search } from '@/assets';
import type { UserRole, UsersTableProps } from '../../../../utils/types/users.types';

export default function UsersTable({ users }: UsersTableProps) {
    const { t, i18n } = useTranslation('usersPage');
    const isArabic = i18n.language.startsWith('ar');

    const [searchValue, setSearchValue] = useState('');
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

    const roles = useMemo(() => Array.from(new Set(users.map(user => user.role))), [users]);

    const filteredUsers = useMemo(() => {
        const normalizedSearch = searchValue.trim().toLowerCase();

        return users.filter(user => {
            const matchesRole = !selectedRole || user.role === selectedRole;

            const matchesSearch =
                !normalizedSearch ||
                user.name.toLowerCase().includes(normalizedSearch) ||
                user.email.toLowerCase().includes(normalizedSearch);

            return matchesRole && matchesSearch;
        });
    }, [users, selectedRole, searchValue]);

    return (
        <section className="flex w-full flex-col gap-6 rounded-[8px] bg-white p-4 sm:p-5 md:p-6 min-[1920px]:gap-7 min-[1920px]:p-7 min-[2500px]:gap-8 min-[2500px]:p-8">
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2
                    className={`text-[22px] font-semibold leading-[28px] text-[#12115C] min-[1920px]:text-[24px] min-[1920px]:leading-[30px] min-[2500px]:text-[26px] min-[2500px]:leading-8 ${
                        isArabic ? 'text-right' : 'text-left'
                    }`}
                >
                    {t('title')}
                </h2>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:shrink-0">
                    <div className="relative flex h-[38px] w-full min-w-0 items-center sm:w-[280px] sm:min-w-[280px] sm:max-w-[280px] sm:flex-none sm:shrink-0">
                        <Search
                            className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 ${
                                isArabic ? 'right-4' : 'left-4'
                            }`}
                        />

                        <input
                            type="search"
                            value={searchValue}
                            onChange={event => setSearchValue(event.target.value)}
                            placeholder={t('searchPlaceholder')}
                            className={`h-[38px] w-full rounded-[12px] border border-[#ECEFF4] bg-white py-[10px] text-[14px] font-normal leading-[18px] text-[#12115C] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#12115C] min-[1920px]:h-[42px] min-[1920px]:text-[15px] min-[2500px]:h-[46px] min-[2500px]:text-[16px] ${
                                isArabic ? 'pl-4 pr-10 text-right' : 'pl-10 pr-4 text-left'
                            }`}
                        />
                    </div>

                    <div className="relative w-full sm:w-[89px] sm:min-w-[89px] sm:max-w-[89px] sm:flex-none sm:shrink-0">
                        <button
                            type="button"
                            aria-expanded={isRoleOpen}
                            onClick={() => setIsRoleOpen(current => !current)}
                            className="flex h-[38px] w-full items-center justify-between gap-2 rounded-[12px] border border-[#ECEFF4] bg-white px-4 text-[14px] font-semibold leading-[18px] text-[#12115C] transition-colors hover:border-[#12115C] min-[1920px]:h-[42px] min-[1920px]:text-[15px] min-[2500px]:h-[46px] min-[2500px]:text-[16px]"
                        >
                            <span className="whitespace-nowrap">
                                {selectedRole ? t(`roles.${selectedRole}`) : t('role')}
                            </span>

                            <DropDown
                                className={`h-4 w-4 shrink-0 transition-transform ${
                                    isRoleOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        {isRoleOpen && (
                            <>
                                <button
                                    type="button"
                                    aria-label={t('role')}
                                    className="fixed inset-0 z-10 cursor-default"
                                    onClick={() => setIsRoleOpen(false)}
                                />

                                <div className="absolute right-0 top-[calc(100%+6px)] z-30 max-h-[220px] w-full min-w-0 overflow-y-auto rounded-[12px] border border-[#ECEFF4] bg-white py-1 shadow-lg sm:w-[180px]">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedRole(null);
                                            setIsRoleOpen(false);
                                        }}
                                        className={`w-full whitespace-nowrap px-4 py-2.5 text-[14px] transition-colors hover:bg-[#F8F9FB] ${
                                            isArabic ? 'text-right' : 'text-left'
                                        } ${
                                            !selectedRole
                                                ? 'bg-[#F8F9FB] font-semibold text-[#12115C]'
                                                : 'text-[#64748B]'
                                        }`}
                                    >
                                        {t('allRoles')}
                                    </button>

                                    {roles.map(role => (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => {
                                                setSelectedRole(role);
                                                setIsRoleOpen(false);
                                            }}
                                            className={`w-full whitespace-nowrap px-4 py-2.5 text-[14px] transition-colors hover:bg-[#F8F9FB] ${
                                                isArabic ? 'text-right' : 'text-left'
                                            } ${
                                                selectedRole === role
                                                    ? 'bg-[#F8F9FB] font-semibold text-[#12115C]'
                                                    : 'text-[#64748B]'
                                            }`}
                                        >
                                            {t(`roles.${role}`)}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="hidden w-full overflow-hidden rounded-[8px] border border-[#ECEFF4] md:block">
                <div className="grid h-16 w-full grid-cols-[1.2fr_1.8fr_1fr_1.3fr_80px] items-center gap-4 bg-white px-4 min-[1920px]:h-[72px] min-[1920px]:px-5 min-[2500px]:h-[80px] min-[2500px]:px-6">
                    <p
                        className={`text-[14px] font-semibold leading-5 text-[#12115C] min-[1920px]:text-[16px] min-[2500px]:text-[17px] ${
                            isArabic ? 'text-right' : 'text-left'
                        }`}
                    >
                        {t('table.user')}
                    </p>

                    <p
                        className={`text-[14px] font-semibold leading-5 text-[#12115C] min-[1920px]:text-[16px] min-[2500px]:text-[17px] ${
                            isArabic ? 'text-right' : 'text-left'
                        }`}
                    >
                        {t('table.mail')}
                    </p>

                    <p
                        className={`text-[14px] font-semibold leading-5 text-[#12115C] min-[1920px]:text-[16px] min-[2500px]:text-[17px] ${
                            isArabic ? 'text-right' : 'text-left'
                        }`}
                    >
                        {t('table.role')}
                    </p>

                    <p
                        className={`text-[14px] font-semibold leading-5 text-[#12115C] min-[1920px]:text-[16px] min-[2500px]:text-[17px] ${
                            isArabic ? 'text-right' : 'text-left'
                        }`}
                    >
                        {t('table.accountStatus')}
                    </p>

                    <p className="text-center text-[14px] font-semibold leading-5 text-[#12115C] min-[1920px]:text-[16px] min-[2500px]:text-[17px]">
                        {t('table.action')}
                    </p>
                </div>

                {filteredUsers.map((user, index) => (
                    <div
                        key={user.id}
                        className={`grid h-16 w-full grid-cols-[1.2fr_1.8fr_1fr_1.3fr_80px] items-center gap-4 border-t border-[#00E5C810] px-4 transition-colors min-[1920px]:h-[72px] min-[1920px]:px-5 min-[2500px]:h-[80px] min-[2500px]:px-6 ${
                            index % 2 === 0 ? 'bg-[#00E5C805]' : 'bg-white'
                        }`}
                    >
                        <p
                            title={user.name}
                            className={`min-w-0 truncate text-[14px] font-semibold leading-5 text-[#1F2937] min-[1920px]:text-[16px] min-[2500px]:text-[17px] ${
                                isArabic ? 'text-right' : 'text-left'
                            }`}
                        >
                            {user.name}
                        </p>

                        <p
                            title={user.email}
                            className={`min-w-0 truncate text-[14px] font-semibold leading-[14px] text-[#1F2937] min-[1920px]:text-[16px] min-[2500px]:text-[17px] ${
                                isArabic ? 'text-right' : 'text-left'
                            }`}
                        >
                            {user.email}
                        </p>

                        <p
                            className={`min-w-0 truncate text-[14px] font-normal leading-5 text-[#2F1ABD] min-[1920px]:text-[16px] min-[2500px]:text-[17px] ${
                                isArabic ? 'text-right' : 'text-left'
                            }`}
                        >
                            {t(`roles.${user.role}`)}
                        </p>

                        <div className={isArabic ? 'justify-self-end' : 'justify-self-start'}>
                            <span
                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-semibold leading-4 min-[1920px]:px-4 min-[1920px]:py-1.5 min-[1920px]:text-[13px] min-[2500px]:text-[14px] ${
                                    user.status === 'Active'
                                        ? 'bg-[#34C7591A] text-[#34C759]'
                                        : 'bg-[#FF3B301A] text-[#FF3B30]'
                                }`}
                            >
                                {t(`statuses.${user.status}`)}
                            </span>
                        </div>

                        <button
                            type="button"
                            aria-label={`${t('table.action')} ${user.name}`}
                            className="flex h-8 w-8 items-center justify-center justify-self-center rounded-[8px] text-[#64748B] transition-colors hover:bg-[#ECEFF4] hover:text-[#12115C] min-[1920px]:h-9 min-[1920px]:w-9 min-[2500px]:h-10 min-[2500px]:w-10"
                        >
                            <MoreVertical className="h-5 w-5 min-[2500px]:h-6 min-[2500px]:w-6" />
                        </button>
                    </div>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="flex min-h-[128px] items-center justify-center border-t border-[#00E5C810] px-4 text-center text-[14px] font-medium text-[#64748B]">
                        {t('noUsersFound')}
                    </div>
                )}
            </div>

            <div className="flex w-full flex-col gap-3 md:hidden">
                {filteredUsers.map(user => (
                    <article
                        key={user.id}
                        className="flex w-full flex-col gap-4 rounded-[12px] border border-[#ECEFF4] bg-white p-4"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className={`min-w-0 ${isArabic ? 'text-right' : 'text-left'}`}>
                                <p className="truncate text-[14px] font-semibold leading-5 text-[#1F2937]">
                                    {user.name}
                                </p>

                                <p className="mt-1 break-all text-[13px] font-normal leading-5 text-[#64748B]">
                                    {user.email}
                                </p>
                            </div>

                            <button
                                type="button"
                                aria-label={`${t('table.action')} ${user.name}`}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] transition-colors hover:bg-[#ECEFF4]"
                            >
                                <MoreVertical className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="text-[13px] font-normal text-[#2F1ABD]">
                                {t(`roles.${user.role}`)}
                            </span>

                            <span
                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-semibold ${
                                    user.status === 'Active'
                                        ? 'bg-[#34C7591A] text-[#34C759]'
                                        : 'bg-[#FF3B301A] text-[#FF3B30]'
                                }`}
                            >
                                {t(`statuses.${user.status}`)}
                            </span>
                        </div>
                    </article>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="flex min-h-[120px] items-center justify-center rounded-[12px] border border-[#ECEFF4] px-4 text-center text-[14px] font-medium text-[#64748B]">
                        {t('noUsersFound')}
                    </div>
                )}
            </div>
        </section>
    );
}
