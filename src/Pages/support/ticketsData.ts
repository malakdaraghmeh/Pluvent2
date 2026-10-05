import type { SupportTab, SupportTicket } from '../../utils/types/support-tickets.types';

export const TABS: SupportTab[] = [
    {
        key: 'all',
        count: 3,
    },
    {
        key: 'open',
    },
    {
        key: 'inProgress',
    },
    {
        key: 'pendingReply',
    },
    {
        key: 'closed',
    },
];

export const TICKETS_DATA: SupportTicket[] = [
    {
        id: '2023-CS123',
        status: 'open',
        type: 'project',
        uploadedBy: 'Maryam Hosam',
        date: '2025 - 12:45 AM',
        contentKey: 'card.description',
        replyStatus: {
            type: 'repliedPreview',
            textKey: 'reply.previewDescription',
            badge: 4,
        },
    },
    {
        id: '2023-CS123',
        status: 'pendingReply',
        type: 'general',
        uploadedBy: 'Maryam Hosam',
        date: '2025 - 12:45 AM',
        contentKey: 'card.description',
        replyStatus: {
            type: 'waiting',
        },
    },
    {
        id: '2023-CS123',
        status: 'closed',
        type: 'project',
        uploadedBy: 'Maryam Hosam',
        date: '2025 - 12:45 AM',
        contentKey: 'card.description',
        replyStatus: {
            type: 'repliedSimple',
        },
    },
];
