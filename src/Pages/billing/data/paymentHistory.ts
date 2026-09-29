export interface PaymentHistoryItem {
    id: string;
    invoice: string;
    project: string;
    amount: string;
    methodType: 'visa' | 'paypal' | 'applepay' | 'instapay';
    methodText: string;
    date: string;
    downloadUrl?: string;
}

export const paymentHistoryList: PaymentHistoryItem[] = [
    {
        id: '1',
        invoice: 'INV-2026-00123',
        project: 'Company Website Redesign',
        amount: 'EGP 10,000.00',
        methodType: 'visa',
        methodText: '•••• 4242',
        date: 'Jul 20, 2026',
    },
    {
        id: '2',
        invoice: 'INV-2026-00123',
        project: 'Company Website Redesign',
        amount: 'EGP 10,000.00',
        methodType: 'paypal',
        methodText: 'PayPal',
        date: 'Jul 20, 2026',
    },
    {
        id: '3',
        invoice: 'INV-2026-00123',
        project: 'Company Website Redesign',
        amount: 'EGP 10,000.00',
        methodType: 'applepay',
        methodText: 'Apple Pay',
        date: 'Jul 20, 2026',
    },
    {
        id: '4',
        invoice: 'INV-2026-00123',
        project: 'Company Website Redesign',
        amount: 'EGP 10,000.00',
        methodType: 'instapay',
        methodText: '010 •••• 6992',
        date: 'Jul 20, 2026',
    },
    {
        id: '5',
        invoice: 'INV-2026-00123',
        project: 'Company Website Redesign',
        amount: 'EGP 10,000.00',
        methodType: 'visa',
        methodText: '•••• 4242',
        date: 'Jul 20, 2026',
    },
    {
        id: '6',
        invoice: 'INV-2026-00123',
        project: 'Company Website Redesign',
        amount: 'EGP 10,000.00',
        methodType: 'instapay',
        methodText: '010 •••• 6992',
        date: 'Jul 20, 2026',
    },
];
