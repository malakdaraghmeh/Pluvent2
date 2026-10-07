export type SupportRequestType = 'project' | 'general';

export interface CreateSupportInquiryFormProps {
    projectId?: string;
    requestType: SupportRequestType;
    showWarrantyNotice?: boolean;
    onSubmitted?: () => void;
}

export interface CreateSupportInquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId?: string;
    requestType?: SupportRequestType;
    showWarrantyNotice?: boolean;
}
