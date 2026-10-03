export interface BillingSummaryItem {
    id: number;
    translationKey: string;
}

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

export interface PaymentMethodBadgeProps {
    item: PaymentHistoryItem;
}

export interface UpcomingPayment {
    id: string;
    project: string;
    installment: string;
    amount: string;
    dueDate: string;
    daysLeft: number;
}

export interface CreditDebitCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBack?: () => void;
}
export interface PaymentSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBack: () => void;
    onViewReceipt: () => void;
}

export interface ProjectFilterDropdownProps {
    value: string;
    projects: string[];
    allProjectsLabel: string;
    onChange: (value: string) => void;
}
