import {
    MessagesAmrAvatar,
    MessagesCurrentUserAvatar,
    MessagesPulventLogo,
    MessagesUserAvatarTwo,
} from '@/assets';

import type { Chat, Member, Message } from '../../../utils/types/chat.types';

export const INITIAL_MEMBERS: Member[] = [
    {
        id: '1',
        name: 'Pulvent',
        role: 'pinned',
        avatar: MessagesPulventLogo,
        isPinned: true,
    },
    {
        id: '2',
        name: 'Ahmed Hosam',
        role: 'admin',
        avatar: MessagesAmrAvatar,
    },
    {
        id: '3',
        name: 'Ahmed Hosam',
        role: 'employee',
        avatar: MessagesUserAvatarTwo,
    },
    {
        id: '4',
        name: 'Ahmed Hosam',
        role: 'employee',
        avatar: MessagesAmrAvatar,
    },
    {
        id: '5',
        name: 'Ahmed Hosam',
        role: 'employee',
        avatar: MessagesUserAvatarTwo,
    },
];

export const INITIAL_CHATS: Chat[] = [
    {
        id: 'pinned-1',
        name: 'Pulvent (Private Chat)',
        avatar: MessagesPulventLogo,
        isPinned: true,
        unreadCount: 2,
    },
    {
        id: 'group-1',
        name: 'Project Website Redesign T...',
        avatar: '',
        isPinned: false,
        time: '10:30 AM',
        unreadCount: 2,
        membersCount: 6,
    },
    {
        id: 'group-2',
        name: 'Marketing Team',
        avatar: '',
        isPinned: false,
        timeKey: 'yesterday',
        membersCount: 4,
    },
    {
        id: 'group-3',
        name: 'Management Team',
        avatar: '',
        isPinned: false,
        timeKey: 'monday',
        membersCount: 3,
    },
    {
        id: 'group-4',
        name: 'Design Review Group',
        avatar: '',
        isPinned: false,
        timeKey: 'may18',
        membersCount: 5,
    },
    {
        id: 'group-5',
        name: 'Developers Group',
        avatar: '',
        isPinned: false,
        timeKey: 'may16',
        membersCount: 4,
    },
];

export const INITIAL_MESSAGES: Message[] = [
    {
        id: 'm1',
        senderName: 'Pulvent',
        senderAvatar: MessagesPulventLogo,
        text: 'sampleMessage',
        time: '01:08 am',
        isMe: false,
    },
    {
        id: 'm2',
        senderName: 'Amr',
        senderAvatar: MessagesAmrAvatar,
        text: 'sampleMessage',
        time: '02:08 am',
        isMe: true,
    },
    {
        id: 'm3',
        senderName: 'Pulvent',
        senderAvatar: MessagesPulventLogo,
        text: 'sampleMessage',
        time: '01:08 am',
        isMe: false,
    },
    {
        id: 'm4',
        senderName: 'Amr',
        senderAvatar: MessagesCurrentUserAvatar,
        text: 'sampleMessage',
        time: '02:08 am',
        isMe: true,
    },
];
