export type SupportTabKey = 'all' | 'open' | 'inProgress' | 'pendingReply' | 'closed';

export type SupportTicketStatus = 'open' | 'inProgress' | 'pendingReply' | 'closed';

export type SupportTicketType = 'project' | 'general';

export type SupportTicketFilter = 'all' | 'project' | 'general';

export type TicketReplyStatusType = 'repliedPreview' | 'waiting' | 'repliedSimple';

export type SupportTicketContentKey = 'card.description';

export type SupportTicketReplyTextKey = 'reply.previewDescription';

export type SupportTab = {
    key: SupportTabKey;
    count?: number;
};

export type TicketReplyStatus = {
    type: TicketReplyStatusType;
    textKey?: SupportTicketReplyTextKey;
    badge?: number;
};

export type SupportTicket = {
    id: string;
    status: SupportTicketStatus;
    type: SupportTicketType;
    uploadedBy: string;
    date: string;
    contentKey: SupportTicketContentKey;
    replyStatus: TicketReplyStatus;
};

export type HeaderProps = {
    onNewTicket: () => void;
};

export type TabNavigationProps = {
    tabs: SupportTab[];
    activeTab: SupportTabKey;
    onSelectTab: (tab: SupportTabKey) => void;
};

export type FilterDropdownProps = {
    value: SupportTicketFilter;
    onChange: (value: SupportTicketFilter) => void;
};

export type TicketCardProps = {
    ticket: SupportTicket;
};

export type TicketReplyStatusProps = {
    replyStatus: TicketReplyStatus;
};

export type CreateSupportInquiryProps = {
    isOpen: boolean;
    onClose: () => void;
};

export type PendingReplyTicketDetailsProps = {
    ticket: SupportTicket;
    onCloseTicket: () => void;
    onRemind: () => void;
};

export type TicketDetailsLocationState = {
    ticket?: SupportTicket;
};
export type ClosedTicketDetailsProps = {
    ticket: SupportTicket;
    onReopenTicket: () => void;
};


export type TicketType = 'project' | 'general';

export interface TicketTypeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onContinue?: (selectedType: TicketType) => void;
}
