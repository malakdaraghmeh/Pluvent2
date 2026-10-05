export type DashboardStatIcon = 'projects' | 'paid' | 'upcoming' | 'absent';

export type DashboardStat = {
    id: number;
    value: string;
    icon: DashboardStatIcon;
};

export type ProjectStatus = 'In Progress' | 'Completed';

export type WarrantyStatus = 'Active' | 'Valid' | 'On Hold' | 'Suspended';

export type ProjectProgress = {
    id: number;
    status: ProjectStatus;
    progress: number;
    paidAmount: string;
    totalAmount: string;
    warranty: WarrantyStatus;
};

export type ProgressDonutChartProps = {
    progress: number;
    overallLabel: string;
    projectLabel: string;
};

export type UpcomingPayment = {
    id: number;
    amount: string;
    dueDays: number;
    dueType: 'danger' | 'warning';
};

export type SupportTicketStatus = 'In Progress' | 'In Review';

export type SupportTicket = {
    id: number;
    ticketNumber: string;
    titleKey: 'first' | 'second';
    status: SupportTicketStatus;
};
