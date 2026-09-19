'use client';

import React from 'react';
import { Search, Plus, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Chat } from '../chat';

interface ChatSidebarProps {
    chats: Chat[];
    selectedChatId: string;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onSelectChat: (id: string) => void;
    onOpenCreateModal: () => void;
    className?: string;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
    chats,
    selectedChatId,
    searchQuery,
    onSearchChange,
    onSelectChat,
    onOpenCreateModal,
    className = '',
}) => {
    const t = useTranslations('chat');

    const pinnedChat = chats.find(chat => chat.isPinned);
    const groupChats = chats.filter(chat => !chat.isPinned);

    const filteredGroupChats = groupChats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`w-full md:max-w-sm flex-col rounded-none md:rounded-3xl bg-white p-4 md:p-5 shadow-sm border-0 md:border border-slate-100 ${className}`}>
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">{t('title')}</h1>

            {/* Search Bar */}
            <div className="relative mt-4">
                <Search className="absolute left-3.5 rtl:right-3.5 rtl:left-auto top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchQuery}
                    onChange={e => onSearchChange(e.target.value)}
                    className="w-full rounded-xl border-[1px] border-[#ECEFF4] py-2.5 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:outline-none transition"
                />
            </div>

            {/* Navigation List */}
            <div className="mt-6 flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
                {/* Pinned Section */}
                {pinnedChat && (
                    <div>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {t('pinned')}
                        </span>
                        <div
                            onClick={() => onSelectChat(pinnedChat.id)}
                            className={`mt-2.5 flex items-center justify-between p-3 rounded-2xl cursor-pointer transition ${
                                selectedChatId === pinnedChat.id
                                    ? 'bg-[#EEF2FF]'
                                    : 'bg-white hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img
                                        src={pinnedChat.avatar}
                                        alt={pinnedChat.name}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-[#0F172A]">
                                        {pinnedChat.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                        <span className="text-xs text-emerald-600 font-medium">
                                            {t('online')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {pinnedChat.unreadCount && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1E1B4B] text-[11px] font-bold text-white">
                                    {pinnedChat.unreadCount}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Group Conversations Section */}
                <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {t('groupConversations')}
                    </span>
                    <div className="mt-2.5 space-y-1">
                        {filteredGroupChats.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => onSelectChat(chat.id)}
                                className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition ${
                                    selectedChatId === chat.id
                                        ? 'bg-[#EEF2FF]'
                                        : 'hover:bg-slate-50'
                                }`}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-sm shrink-0">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-semibold text-[#0F172A] truncate">
                                            {chat.name}
                                        </h3>
                                        <p className="text-xs text-gray-400">{chat.subtitle}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2 rtl:mr-2 rtl:ml-0">
                                    <span className="text-[11px] text-gray-400">
                                        {chat.time}
                                    </span>
                                    {chat.unreadCount && (
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1E1B4B] text-[11px] font-bold text-white">
                                            {chat.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Create Group Button Footer */}
            <div className="pt-4 border-t border-slate-100">
                <button
                    onClick={onOpenCreateModal}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-indigo-600 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                >
                    <Plus className="h-4 w-4" />
                    <span>{t('createNewGroup')}</span>
                </button>
            </div>
        </div>
    );
};