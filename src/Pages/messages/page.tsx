import { useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { MessagesAmrAvatar } from '@/assets';
import type { Chat, Message } from '@/utils/types/chat.types';

import { ChatArea } from './components/ChatArea';
import { ChatSidebar } from './components/ChatSidebar';
import { CreateGroupModal } from './components/CreateGroupModal';
import { INITIAL_CHATS, INITIAL_MESSAGES } from './mockData';

type MobileView = 'sidebar' | 'chat';

export default function MessagesPage() {
    const { t } = useTranslation('chat');
    const { pathname } = useLocation();
    const currentLocale = pathname.split('/')[1] || 'en';

    const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
    const [selectedChatId, setSelectedChatId] = useState('pinned-1');
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileView, setMobileView] = useState<MobileView>('sidebar');

    const handleSelectChat = (id: string) => {
        setSelectedChatId(id);
        setMobileView('chat');
    };

    const handleSendMessage = (event: FormEvent) => {
        event.preventDefault();

        const text = inputText.trim();
        if (!text) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderName: t('currentUserName'),
            senderAvatar: MessagesAmrAvatar,
            text,
            time: new Intl.DateTimeFormat(currentLocale === 'ar' ? 'ar-EG' : 'en-US', {
                hour: '2-digit',
                minute: '2-digit',
            }).format(new Date()),
            isMe: true,
        };

        setMessages(currentMessages => [...currentMessages, newMessage]);
        setInputText('');
    };

    const handleCreateGroup = (name: string, memberIds: string[]) => {
        const newGroup: Chat = {
            id: `group-${Date.now()}`,
            name,
            avatar: '',
            isPinned: false,
            timeKey: 'justNow',
            membersCount: memberIds.length,
        };

        setChats(currentChats => {
            const pinnedChat = currentChats.find(chat => chat.isPinned);
            const groupChats = currentChats.filter(chat => !chat.isPinned);

            return pinnedChat ? [pinnedChat, newGroup, ...groupChats] : [newGroup, ...groupChats];
        });

        setSelectedChatId(newGroup.id);
        setIsModalOpen(false);
        setMobileView('chat');
    };

    const activeChat = chats.find(chat => chat.id === selectedChatId) ?? chats[0];

    return (
        <main className="flex min-h-full w-full bg-[#F7F8FA] px-4 py-4 md:px-5 3xl:px-6 4xl:px-8">
            <div className="flex w-full min-w-0 items-stretch gap-0 md:gap-5 3xl:gap-6 4xl:gap-8">
                <ChatSidebar
                    chats={chats}
                    selectedChatId={selectedChatId}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSelectChat={handleSelectChat}
                    onOpenCreateModal={() => setIsModalOpen(true)}
                    className={mobileView === 'sidebar' ? 'flex' : 'hidden md:flex'}
                />

                <ChatArea
                    activeChat={activeChat}
                    messages={messages}
                    inputText={inputText}
                    onInputChange={setInputText}
                    onSendMessage={handleSendMessage}
                    onBack={() => setMobileView('sidebar')}
                    className={mobileView === 'chat' ? 'flex' : 'hidden md:flex'}
                />
            </div>

            <CreateGroupModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateGroup={handleCreateGroup}
            />
        </main>
    );
}
