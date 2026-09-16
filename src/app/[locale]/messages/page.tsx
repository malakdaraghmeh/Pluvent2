'use client';

import React, { useState } from 'react';
import { Chat, Message } from './chat';
import { INITIAL_CHATS, INITIAL_MESSAGES } from './mockData';
import { CreateGroupModal } from './components/CreateGroupModal';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatArea } from './components/ChatArea';

export default function MessagesPage() {
    const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
    const [selectedChatId, setSelectedChatId] = useState<string>('pinned-1');
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderName: 'Amr',
            senderAvatar:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
            time: 'Just now',
            membersCount: memberIds.length,
        };

        setChats([chats[0], newGroup, ...chats.slice(1)]);
        setSelectedChatId(newGroup.id);
    };

    return (
        <div className="flex h-screen gap-6 font-sans antialiased">
            <ChatSidebar
                chats={chats}
                selectedChatId={selectedChatId}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSelectChat={setSelectedChatId}
                onOpenCreateModal={() => setIsModalOpen(true)}
            />

            <ChatArea
                messages={messages}
                inputText={inputText}
                onInputChange={setInputText}
                onSendMessage={handleSendMessage}
            />

            <CreateGroupModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateGroup={handleCreateGroup}
            />
        </div>
    );
}