import type { Payment } from '../../../../utils/types/project-details.types';

export const paymentsData: Payment[] = [
    {
        id: 1,
        amount: '$2,000',
        status: 'due',
        days: 1,
    },
    {
        id: 2,
        amount: '$2,000',
        status: 'upcoming',
        days: 20,
    },
    {
        id: 3,
        amount: '$2,000',
        status: 'upcoming',
        days: 20,
    },
];
