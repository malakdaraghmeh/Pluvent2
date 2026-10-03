import { useTranslation } from 'react-i18next';

import {
    MessagesCreateGroupPlusIcon,
    MessagesSearchIcon,
    MessagesUsersDarkIcon,
    MessagesUsersIcon,
} from '@/assets';

import type { Chat } from '../../../../utils/types/chat.types';
interface ChatSidebarProps {
    chats: Chat[];
    selectedChatId: string;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onSelectChat: (id: string) => void;
    onOpenCreateModal: () => void;
    className?: string;
}

const GROUP_AVATAR_STYLES: Record<string, string> = {
    'group-1': 'bg-[#3634C7] text-white',
    'group-2': 'bg-[#39E3D7] text-white',
    'group-3': 'bg-[#5145CD] text-white',
    'group-4': 'bg-[#12115C] text-white',
    'group-5': 'bg-[#EAF8F7] text-[#12115C]',
};

const GROUP_NAME_KEYS: Record<string, string> = {
    'group-1': 'groups.websiteRedesign',
    'group-2': 'groups.marketing',
    'group-3': 'groups.management',
    'group-4': 'groups.designReview',
    'group-5': 'groups.developers',
};

const GROUP_TIME_KEYS: Record<string, string> = {
    'group-2': 'times.yesterday',
    'group-3': 'times.monday',
    'group-4': 'times.may18',
    'group-5': 'times.may16',
};

export const ChatSidebar = ({
    chats,
    selectedChatId,
    searchQuery,
    onSearchChange,
    onSelectChat,
    onOpenCreateModal,
    className = '',
}: ChatSidebarProps) => {
    const { t } = useTranslation('chat');

    const pinnedChat = chats.find(chat => chat.isPinned);
    const groupChats = chats.filter(chat => !chat.isPinned);

    const getChatName = (chat: Chat) => {
        const key = GROUP_NAME_KEYS[chat.id];
        return key ? t(key, { defaultValue: chat.name }) : chat.name;
    };

    const getChatTime = (chat: Chat) => {
        const key = GROUP_TIME_KEYS[chat.id];
        return key ? t(key, { defaultValue: chat.time ?? '' }) : (chat.time ?? '');
    };

    const filteredGroupChats = groupChats.filter(chat =>
        getChatName(chat).toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    const renderUnreadBadge = (count?: number) => {
        if (!count) return null;

        return (
            <span className="inline-flex min-h-[19px] min-w-[19px] items-center justify-center rounded-[100px] bg-[#3634C7] px-[6px] py-[3px] text-[10px] font-medium leading-none text-white">
                {count}
            </span>
        );
    };

    return (
        <aside
            className={`min-w-0 flex-col overflow-hidden bg-white shadow-sm max-md:h-screen max-md:w-full max-md:p-4 md:h-[calc(100vh-32px)] md:w-[340px] md:flex-none md:rounded-[24px] md:border md:border-[#EEF0F5] md:p-4 3xl:w-[400px] 3xl:p-5 4xl:w-[460px] 4xl:p-6 ${className}`}
        >
            <h1 className="shrink-0 text-[22px] font-semibold text-[#101828] 3xl:text-[24px] 4xl:text-[26px]">
                {t('title')}
            </h1>

            <div className="relative mt-4 shrink-0 3xl:mt-5">
                <MessagesSearchIcon className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 3xl:h-[18px] 3xl:w-[18px]" />

                <input
                    type="text"
                    value={searchQuery}
                    onChange={event => onSearchChange(event.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="h-10 w-full rounded-[10px] border border-[#EAECF0] bg-white ps-[38px] pe-3 text-[12px] text-[#344054] outline-none placeholder:text-[#98A2B3] 3xl:h-11 3xl:ps-[42px] 3xl:text-[13px] 4xl:h-12 4xl:text-[14px]"
                />
            </div>

            {pinnedChat && (
                <div className="mt-5 shrink-0">
                    <p className="mb-2 text-[11px] font-medium text-[#667085] 3xl:text-[12px]">
                        {t('pinned')}
                    </p>

                    <button
                        type="button"
                        onClick={() => onSelectChat(pinnedChat.id)}
                        className={`flex w-full items-center justify-between gap-3 rounded-[10px] px-3 py-[10px] text-start transition 3xl:px-4 3xl:py-3 ${selectedChatId === pinnedChat.id ? 'bg-[#F0EFFF]' : 'hover:bg-[#F8F9FC]'}`}
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            {pinnedChat.avatar && (
                                <img
                                    src={pinnedChat.avatar}
                                    alt={pinnedChat.name}
                                    className="h-10 w-10 shrink-0 rounded-full object-cover 3xl:h-11 3xl:w-11 4xl:h-12 4xl:w-12"
                                />
                            )}

                            <div className="min-w-0">
                                <p className="truncate text-[12px] font-semibold text-[#101828] 3xl:text-[13px] 4xl:text-[14px]">
                                    {t('privateChat', { defaultValue: pinnedChat.name })}
                                </p>

                                <p className="truncate text-[10px] text-[#667085] 3xl:text-[11px] 4xl:text-[12px]">
                                    {t('pulventTeamMembers', { count: 2 })}
                                </p>

                                <div className="mt-[2px] flex items-center gap-1">
                                    <span className="h-[5px] w-[5px] rounded-full bg-[#12B76A]" />
                                    <span className="text-[9px] text-[#12B76A] 3xl:text-[10px]">
                                        {t('online')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {renderUnreadBadge(pinnedChat.unreadCount)}
                    </button>
                </div>
            )}

            <div className="mt-5 flex min-h-0 flex-1 flex-col 3xl:mt-6">
                <p className="mb-2 shrink-0 text-[11px] font-medium text-[#667085] 3xl:text-[12px]">
                    {t('groupConversations')}
                </p>

                <div className="min-h-0 flex-1 space-y-[5px] overflow-y-auto pe-1 [scrollbar-width:thin] [scrollbar-color:#D9DCEF_transparent] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D9DCEF] hover:[&::-webkit-scrollbar-thumb]:bg-[#BFC4DD] 3xl:space-y-[7px]">
                    {filteredGroupChats.map(chat => (
                        <button
                            key={chat.id}
                            type="button"
                            onClick={() => onSelectChat(chat.id)}
                            className="flex w-full items-center justify-between gap-3 rounded-[10px] px-3 py-[9px] text-start transition hover:bg-[#F8F9FC] 3xl:px-4 3xl:py-[11px]"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full 3xl:h-11 3xl:w-11 4xl:h-12 4xl:w-12 ${GROUP_AVATAR_STYLES[chat.id] ?? 'bg-[#3634C7] text-white'}`}
                                >
                                    {chat.id === 'group-5' ? (
                                        <MessagesUsersDarkIcon className="h-[18px] w-[18px] 3xl:h-5 3xl:w-5" />
                                    ) : (
                                        <MessagesUsersIcon className="h-[18px] w-[18px] 3xl:h-5 3xl:w-5" />
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-[12px] font-semibold text-[#101828] 3xl:text-[13px] 4xl:text-[14px]">
                                        {getChatName(chat)}
                                    </p>

                                    <p className="text-[10px] text-[#667085] 3xl:text-[11px] 4xl:text-[12px]">
                                        {t('membersCount', { count: chat.membersCount ?? 0 })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex shrink-0 flex-col items-end gap-1">
                                {getChatTime(chat) && (
                                    <span className="whitespace-nowrap text-[9px] text-[#98A2B3] 3xl:text-[10px] 4xl:text-[11px]">
                                        {getChatTime(chat)}
                                    </span>
                                )}

                                {renderUnreadBadge(chat.unreadCount)}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="shrink-0 pt-4">
                <button
                    type="button"
                    onClick={onOpenCreateModal}
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-[8px] border border-[#3634C7] text-[12px] font-medium text-[#3634C7] transition hover:bg-[#F7F7FF] 3xl:h-11 3xl:text-[13px] 4xl:h-12 4xl:text-[14px]"
                >
                    <MessagesCreateGroupPlusIcon className="h-4 w-4 3xl:h-[18px] 3xl:w-[18px]" />
                    <span>{t('createNewGroup')}</span>
                </button>
            </div>
        </aside>
    );
};
