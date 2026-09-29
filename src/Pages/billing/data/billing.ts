export type BillingSummaryItem = {
    id: number;
    translationKey: string;
    title: string;
    value: string;
    description: string;
};

export const billingSummaryData: BillingSummaryItem[] = [
    {
        id: 1,
        translationKey: 'totalOutstanding',
        title: 'Total Outstanding',
        value: 'EGP 60,000',
        description: 'Across 3 projects',
    },
    {
        id: 2,
        translationKey: 'paidThisYear',
        title: 'Paid This Year',
        value: 'EGP 100,000',
        description: '6 payments completed',
    },
    {
        id: 3,
        translationKey: 'upcomingPayments',
        title: 'Upcoming Payments',
        value: '2',
        description: 'Next in 5 days',
    },
    {
        id: 4,
        translationKey: 'overduePayments',
        title: 'Overdue Payments',
        value: '1',
        description: 'Total overdue',
    },
];
