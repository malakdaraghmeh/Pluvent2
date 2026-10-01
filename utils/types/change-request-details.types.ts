import type { ReactNode } from 'react';

export type ChangeRequestHeaderProps = {
    requestId: string;
    projectLabel: string;
    projectName: string;
    typeLabel: string;
    typeName: string;
    title: string;
    currentStatus: string;
    status: string;
    statusColor: string;
    statusBackground: string;
};

export type ChangeRequestOverviewRow = {
    label: string;
    value: string;
    valueClassName?: string;
};

export type ChangeRequestTimelineStatus = 'completed' | 'progress' | 'pending';

export type TimelineItem = {
    title: string;
    description: ReactNode;
    meta: string;
    status: ChangeRequestTimelineStatus;
};

export type RequestOverviewProps = {
    title: string;
    rows: ChangeRequestOverviewRow[];
};

export type NextStepsCardProps = {
    title: string;
    description: string;
};

export type ActivityTimelineProps = {
    title: string;
    items: TimelineItem[];
};

export type WaitingDiscussionProps = {
    discussTitle: string;
    discussDescription: string;
    pulventName: string;
    pulventTime: string;
    pulventMessage: string;
    userName: string;
    userTime: string;
    userMessage: string;
    placeholder: string;
};

export type ChangeRequestAttachmentType = 'pdf' | 'image';

export type ChangeRequestAttachment = {
    id: number;
    name: string;
    size: string;
    type: ChangeRequestAttachmentType;
};
export type FinalAgreementItem = {
    label: string;
    value: string;
};

export type FinalAgreementCardProps = {
    title: string;
    items: FinalAgreementItem[];
    note?: string;
};

export type PaymentNextStepCardProps = {
    title: string;
    description: string;
    buttonText: string;
    to: string;
};

export type WaitingPaymentCardProps = {
    title: string;
    description: string;
};
export type InProgressWorkCardProps = {
    progress: number;
    title: string;
    description: string;
    overallLabel: string;
};

export type InProgressInfoCardProps = {
    label: string;
    value: string;
    valueClassName?: string;
};

export type WorkingSinceCardProps = {
    title: string;
    value: string;
};
export type ChangeRequestProgressCardProps = {
    progress: number;
    title: string;
    description: string;
    overallLabel: string;
    startColor: string;
    endColor: string;
    titleColor: string;
    className?: string;
};
