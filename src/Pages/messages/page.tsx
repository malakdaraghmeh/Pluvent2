import React, { useState } from 'react';
import { Chat, Message } from './chat';
import { INITIAL_CHATS, INITIAL_MESSAGES } from './mockData';
import { CreateGroupModal } from './components/CreateGroupModal';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatArea } from './components/ChatArea';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function MessagesPage() {
    const { t } = useTranslation('chat');
    const { pathname } = useLocation();
    const currentLocale = pathname.split('/')[1] || 'en';

    const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
    const [selectedChatId, setSelectedChatId] = useState<string>('pinned-1');
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Track mobile view: 'sidebar' or 'chat'
    const [mobileView, setMobileView] = useState<'sidebar' | 'chat'>('sidebar');

    const handleSelectChat = (id: string) => {
        setSelectedChatId(id);
        setMobileView('chat'); // Switch view to chat on mobile upon selection
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderName: 'Amr',
            senderAvatar:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
            text: inputText,
            time: new Date().toLocaleTimeString(currentLocale === 'ar' ? 'ar-EG' : 'en-US', {
                hour: '2-digit',
                minute: '2-digit',
            }),
            isMe: true,
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };

    const handleCreateGroup = (name: string, memberIds: string[]) => {
        const newGroup: Chat = {
            id: `group-${Date.now()}`,
            name,
            subtitle: `${memberIds.length} members`,
            avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
            isPinned: false,
            time: t('justNow'),
            membersCount: memberIds.length,
        };

        setChats([chats[0], newGroup, ...chats.slice(1)]);
        setSelectedChatId(newGroup.id);
        setMobileView('chat');
    };

    const activeChat = chats.find(c => c.id === selectedChatId) || chats[0];

    return (
        <div className="flex h-screen gap-0 md:gap-6 font-sans antialiased p-0 md:p-4">
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

            <CreateGroupModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateGroup={handleCreateGroup}
            />
        </div>
    );
}
