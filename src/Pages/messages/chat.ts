export interface Member {
    id: string;
    name: string;
    role: string;
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
    subtitle: string;
    avatar: string;
    isPinned: boolean;
    time?: string;
    unreadCount?: number;
    membersCount?: number;
}
