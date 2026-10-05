export type SupportTicketData = {
    title: string;
    description: string;
    features: string[];
    status: {
        title: string;
        description: string;
        buttonText: string;
    };
};

export const supportTicketData: SupportTicketData = {
    title: 'Support Ticket',

    description:
        'Your project is covered by warranty. You can submit a support ticket for issues related to the delivered project.',

    features: ['Bug Fixes', 'Technical issues', 'Warranty-related requests'],

    status: {
        title: 'Warranty Active',
        description: 'You can submit your ticket for warranty support or project assistance.',
        buttonText: 'Submit Warranty Ticket',
    },
};
