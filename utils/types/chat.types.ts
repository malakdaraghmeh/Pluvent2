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
    isPinned?: boolean;
}
