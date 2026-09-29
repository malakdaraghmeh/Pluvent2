export type ProjectStatus = 'In Progress' | 'Completed';

export type ProjectDetails = {
    id: number;
    projectName: string;
    description: string;
    status: ProjectStatus;
    startDate: string;
    deliveryDate: string;
    daysLeft: number;
    daysLabel: string;
    deliveryText: string;
    lastUpdatedLabel: string;
    lastUpdated: string;
};

export type ProjectDetailsProps = {
    project: ProjectDetails;
    daysLeft?: number;
    lastUpdated?: string;
    progressPercent?: number;
    daysSubtitle?: string;
    progressColor?: string;
    statusLabel?: string;
    statusBackgroundColor?: string;
    statusTextColor?: string;
    noticeTitle?: string;
    noticeMessage?: string;
};

export type TimelineItem = {
    id: number;
    title: string;
};

export type ChangeRequestStatus =
    | 'InReview'
    | 'Waiting User Input'
    | 'Pending Payment'
    | 'Inprogress'
    | 'Completed';

export type ChangeRequest = {
    id: string;
    title: string;
    addBy: string;
    status: ChangeRequestStatus;
    startDate: string;
    dueDate: string;
};

export type FileDocumentType = 'pulvent' | 'document';

export type FileDocument = {
    id: number;
    fileName: string;
    uploadedBy: string;
    size: string;
    date: string;
    type: FileDocumentType;
};

export type FileDocumentsProps = {
    showViewAll?: boolean;
    showUpload?: boolean;
};

export type PaymentStatus = 'due' | 'upcoming';

export type Payment = {
    id: number;
    amount: string;
    status: PaymentStatus;
    days: number;
};
