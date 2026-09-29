export type ProjectStatus = 'In Progress' | 'Completed';
export type ProjectAction = 'Open Project' | 'Pay Now' | 'View Project';
export type ProjectDateLabel = 'Due' | 'Expired';
export type ProjectStatusLabel = 'Project Status' | 'Warranty';
export type ProjectWarranty = 'Active' | 'Valid' | 'On Hold' | 'Suspended';

export type Project = {
    id: number;
    title: string;
    status: ProjectStatus;
    action: ProjectAction;
    progress: number;
    dueDate: string;
    paidAmount: string;
    totalAmount: string;
    dateLabel: ProjectDateLabel;
    statusLabel: ProjectStatusLabel;
    warranty: ProjectWarranty;
};

export type ProjectFilter = 'all' | 'inProgress' | 'completed';

export type ProjectCardProps = {
    project: Project;
};

export type ProjectsToolbarProps = {
    searchValue: string;
    filter: ProjectFilter;
    onSearchChange: (value: string) => void;
    onFilterChange: (value: ProjectFilter) => void;
};
