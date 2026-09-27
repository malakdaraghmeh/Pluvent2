export const TABS = [
    { name: 'All Tickets', count: 3 },
    { name: 'Open' },
    { name: 'In Progress' },
    { name: 'Pending Reply' },
    { name: 'Closed' },
];

export const TICKETS_DATA = [
    {
        id: '2023-CS123',
        status: 'Open',
        statusColor: 'bg-[#EEF0FD] text-[#4F46E5]',
        type: 'Project Ticket',
        uploadedBy: 'Maryam Hosam',
        date: 'Posted at 2025 - 12:45 AM',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        replyStatus: {
            type: 'replied_preview',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscinging...',
            badge: 4,
        },
    },
    {
        id: '2023-CS123',
        status: 'Pending Reply',
        statusColor: 'bg-[#EFFDFC] text-[#2DB2AB]',
        type: 'General Ticket',
        uploadedBy: 'Maryam Hosam',
        date: 'Posted at 2025 - 12:45 AM',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        replyStatus: {
            type: 'waiting',
            text: 'Waiting',
        },
    },
    {
        id: '2023-CS123',
        status: 'Closed',
        statusColor: 'bg-[#FDE8E8] text-[#FF3B30]',
        type: 'Project Ticket',
        uploadedBy: 'Maryam Hosam',
        date: 'Posted at 2025 - 12:45 AM',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        replyStatus: {
            type: 'replied_simple',
            text: 'Support Team Replied',
        },
    },
];
