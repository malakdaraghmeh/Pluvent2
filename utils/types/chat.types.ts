export type MemberRole = 'pinned' | 'admin' | 'employee';

export type ChatTimeKey = 'justNow' | 'yesterday' | 'monday' | 'may18' | 'may16';

export interface Member {
    id: string;
    name: string;
    role: MemberRole;
    avatar: string;
    isPinned?: boolean;
}

export interface Message {
    id: string;
    senderName: string;
    senderAvatar: string;
    text: string;
    time: string;
    isMe: boolean;
}

export interface Chat {
    id: string;
    name: string;
    avatar?: string;
    time?: string;
    timeKey?: ChatTimeKey;
    unreadCount?: number;
    membersCount?: number;
    projectId?: number;
    isPinned?: boolean;
}

export interface CreateGroupPayload {
    name: string;
    memberIds: string[];
    projectId: number;
}

export interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateGroup: (payload: CreateGroupPayload) => void;
}
import type { FormEvent } from 'react';

export interface ChatAreaProps {
    activeChat?: Chat;
    messages: Message[];
    inputText: string;
    onInputChange: (text: string) => void;
    onSendMessage: (event: FormEvent) => void;
    onBack: () => void;
    className?: string;
}
