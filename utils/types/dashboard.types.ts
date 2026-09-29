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
    title: string;
    status: ProjectStatus;
    progress: number;
    description: string;
    dueDate: string;
    paidAmount: string;
    totalAmount: string;
    warranty: WarrantyStatus;
};

export type UpcomingPayment = {
    id: number;
    projectName: string;
    amount: string;
    dueDays: number;
    dueType: 'danger' | 'warning';
};

export type SupportTicketStatus = 'In Progress' | 'In Review';

export type SupportTicket = {
    id: number;
    ticketNumber: string;
    title: string;
    status: SupportTicketStatus;
};
