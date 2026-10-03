import type { UpcomingPayment } from '../../../../utils/types/billing.types';

export const upcomingPaymentsList: UpcomingPayment[] = [
    {
        id: '1',
        project: 'Company Website Redesign',
        installment: 'Installment 2 of 4',
        amount: 'EGP 10,000.00',
        dueDate: 'May 30, 2026',
        daysLeft: 2,
    },
    {
        id: '2',
        project: 'Company Website Redesign',
        installment: 'Installment 2 of 4',
        amount: 'EGP 10,000.00',
        dueDate: 'May 30, 2026',
        daysLeft: 10,
    },
    {
        id: '3',
        project: 'Company Website Redesign',
        installment: 'Installment 2 of 4',
        amount: 'EGP 10,000.00',
        dueDate: 'May 30, 2026',
        daysLeft: 20,
    },
];
