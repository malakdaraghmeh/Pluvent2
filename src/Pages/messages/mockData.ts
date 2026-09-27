import { Member, Chat, Message } from './chat';

export const INITIAL_MEMBERS: Member[] = [
    {
        id: '1',
        name: 'Pulvent',
        role: 'Pinned',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
        isPinned: true,
    },
    {
        id: '2',
        name: 'Ahmed Hosam',
        role: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    },
    {
        id: '3',
        name: 'Ahmed Hosam',
        role: 'Employee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
        id: '4',
        name: 'Sarah Jenkins',
        role: 'Employee',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
        id: '5',
        name: 'Michael Scott',
        role: 'Employee',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
];

export const INITIAL_CHATS: Chat[] = [
    {
        id: 'pinned-1',
        name: 'Pulvent (Private Chat)',
        subtitle: 'Pulvent Team With 2 member',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
        isPinned: true,
        unreadCount: 2,
    },
    {
        id: 'group-1',
        name: 'Project Website Redesign T...',
        subtitle: '6 members',
        avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
        isPinned: false,
        time: '10:30 AM',
        unreadCount: 2,
        membersCount: 6,
    },
    {
        id: 'group-2',
        name: 'Marketing Team',
        subtitle: '4 members',
        avatar: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=100&h=100&fit=crop',
        isPinned: false,
        time: 'Yesterday',
        membersCount: 4,
    },
    {
        id: 'group-3',
        name: 'Management Team',
        subtitle: '3 members',
        avatar: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&h=100&fit=crop',
        isPinned: false,
        time: 'Mon',
        membersCount: 3,
    },
    {
        id: 'group-4',
        name: 'Design Review Group',
        subtitle: '5 members',
        avatar: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&h=100&fit=crop',
        isPinned: false,
        time: 'May 18',
        membersCount: 5,
    },
    {
        id: 'group-5',
        name: 'Developers Group',
        subtitle: '4 members',
        avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
        isPinned: false,
        time: 'May 16',
        membersCount: 4,
    },
];

export const INITIAL_MESSAGES: Message[] = [
    {
        id: 'm1',
        senderName: 'Pulvent',
        senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
        text: "Hi! We've reviewed your latest request and shared the updates with our team.",
        time: '01:08 am',
        isMe: false,
    },
    {
        id: 'm2',
        senderName: 'Amr',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
        text: "Hi! We've reviewed your latest request and shared the updates with our team.",
        time: '02:08 am',
        isMe: true,
    },
    {
        id: 'm3',
        senderName: 'Pulvent',
        senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
        text: "Hi! We've reviewed your latest request and shared the updates with our team.",
        time: '01:08 am',
        isMe: false,
    },
    {
        id: 'm4',
        senderName: 'Amr',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        text: "Hi! We've reviewed your latest request and shared the updates with our team.",
        time: '02:08 am',
        isMe: true,
    },
];